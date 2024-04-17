
let context;
let drumDevice;
let synthDevice;

let gainNode;
let audioStarted = false;
let synthFrequency;
let synthGain;
let synthRelease;
let detuneVoice1;
let detuneVoice2;


async function loadRnbo( ){



   //Make sure the newest rnbo jsons are loaded by the browser
  const cacheBuster = new Date().getTime();

  //Create Audio Context
  let WAContext = window.AudioContext || window.webkitAudioContext;
  context = new WAContext();
  gainNode = context.createGain();
  gainNode.gain.value = 0.7;
  gainNode.connect(context.destination);

  //Drums
  response = await fetch(`export/drums/drums.export.json?${cacheBuster}`);
  const drumPatcher = await response.json();
  drumDevice = await RNBO.createDevice({ context, patcher: drumPatcher });
  drumDevice.node.connect(gainNode);

  //Synth
  response = await fetch(`export/synth/synth.export.json?${cacheBuster}`);
  const synthPatcher = await response.json();
  synthDevice = await RNBO.createDevice({ context, patcher: synthPatcher });
  synthDevice.node.connect(gainNode);

  synthDevice.parameters.forEach(parameter => {
    console.log(parameter.name);
  });
  
  synthFrequency = synthDevice.parametersById.get("synthfrequency");
  synthFrequency.value = 120;

  synthRelease = synthDevice.parametersById.get("synthRelease");
  synthRelease.value = 70;

  synthGain = synthDevice.parametersById.get("synthgain");
  synthGain.value = 0.1;

  let padgain = synthDevice.parametersById.get("padgain");
  padgain.value = 0.07;
  console.log(padgain.value);

  
  detuneVoice1 = synthDevice.parametersById.get("randomRatio/detuneVoice1");
  detuneVoice1.value = 0.0;
  print(detuneVoice1.min);
  detuneVoice2 = synthDevice.parametersById.get("randomRatio/detuneVoice2");
  detuneVoice2.value = 0.0;



document.addEventListener('tickEvent', triggerKick);
document.addEventListener('tickEvent', triggerSnare);
document.addEventListener('tickEvent', triggerHihat);
document.addEventListener('tickEvent', triggerSynth);
};

loadRnbo();

async function startAudio()
{
  audioStarted = true;
  context.resume();
  console.log("Audio started. Samplerate: "+context.sampleRate);
}


let kickMap =  [1, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0];
let snareMap=  [0, 0, 0, 0, 1, 0, 0, 0, 
                0, 0, 0, 0, 1, 0, 0, 0];
let hihatMap = [1, 0, 1, 0, 1, 0, 1, 0, 
                1, 0, 1, 0, 1, 0, 1, 0];

let synthMap = [1, 0, 1, 0, 1, 0, 1, 0, 
                1, 0, 1, 0, 1, 0, 1, 0];

function triggerKick(ev)
{
  let index = ev.detail;
  if(kickMap[index] == 1)
  {
    const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in1", RNBO.bang);
    drumDevice.scheduleEvent(event1);
  }
}

function triggerSnare(ev)
{
  let index = ev.detail;
  if(snareMap[index] == 1)
  {
    const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in2", RNBO.bang);
    drumDevice.scheduleEvent(event1);
  }
}

function triggerHihat(ev)
{
  let index = ev.detail;
  if(hihatMap[index] == 1)
  {
    const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in3", RNBO.bang);
    drumDevice.scheduleEvent(event1);
  }
}

function triggerSynth(ev)
{
  let index = ev.detail;
  if(synthMap[index] == 1)
  {
    calculateDetune();
    const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in1", RNBO.bang);
    synthDevice.scheduleEvent(event1);
  }
}

function updateSynth()
{
  synthFrequency.value = constrain(synthFrequency.value, 50, 370);
  synthFrequency.value *= Math.pow(1.0594633, 1.0/2.0);; //1/2 Semitone higher
}

function calculateDetune()
{
  let maxDetune = 1.3;
  detuneVoice1.value = map(balls.length, 0, maxBalls, detuneVoice1.min, maxDetune);
 // detuneVoice2.value = map(balls.length, 0, maxBalls, detuneVoice2.min, maxDetune);
}

  







