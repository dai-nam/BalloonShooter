

let context;
let drumDevice;
let synthDevice;

let gainNode;
let audioStarted = false;
let synthFrequency;
let synthGain;


async function loadRnbo( ){

  context = new AudioContext();
  gainNode = context.createGain();

  //Drums
  let drumsPatcher = await fetch("export/drums/drums.export.json");
  let patcher = await drumsPatcher.json();
  drumDevice = await RNBO.createDevice({ context, patcher });

  gainNode.connect(drumDevice.node);
  drumDevice.node.connect(context.destination);


  //Synth
  let synthPatcher = await fetch("export/synth/synth.export.json");
  patcher = await synthPatcher.json();
  synthDevice = await RNBO.createDevice({ context, patcher });

  gainNode.connect(synthDevice.node);
  synthDevice.node.connect(context.destination);
  synthFrequency = synthDevice.parametersById.get("synthfrequency");
  synthFrequency.value = 120;
  synthGain = synthDevice.parametersById.get("synthgain");
  synthGain.value = 0.25;

  /*
  synthDevice.parameters.forEach(parameter => {
    console.log(parameter.id);
   console.log(parameter.name);
});
*/

};

loadRnbo();

async function startAudio()
{
  audioStarted = true;
  context.resume();
  console.log("Audio started. Samplerate: "+context.sampleRate);
}


function triggerKick()
{
  const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in1", RNBO.bang);
  drumDevice.scheduleEvent(event1);
}

function triggerSnare()
{
  const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in2", RNBO.bang);
  drumDevice.scheduleEvent(event1);
}

function triggerHihat()
{
  const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in3", RNBO.bang);
  drumDevice.scheduleEvent(event1);
  const event2 = new RNBO.MessageEvent(RNBO.TimeNow, "in1", RNBO.bang);
  synthDevice.scheduleEvent(event2);
}

function updateSynth()
{
  synthFrequency.value *= Math.pow(1.0594633, 1.0/2.0);; //1/2 Semitone higher
}
  







