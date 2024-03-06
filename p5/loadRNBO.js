

let context;
let drumDevice;
let synthDevice;

let gainNode;
let audioStarted = false;

async function loadRnbo( ){

  context = new AudioContext();

  let drumsPatcher = await fetch("export/drums/drums.export.json");
  let patcher = await drumsPatcher.json();
  drumDevice = await RNBO.createDevice({ context, patcher });

  let synthPatcher = await fetch("export/synth/synth.export.json");
  patcher = await synthPatcher.json();
  synthDevice = await RNBO.createDevice({ context, patcher });
  
  gainNode = context.createGain();
  gainNode.connect(drumDevice.node);
  drumDevice.node.connect(context.destination);
  
  gainNode.connect(synthDevice.node);
  synthDevice.node.connect(context.destination);

  /*
  device.parameters.forEach(parameter => {
  console.log(parameter.id+": "+parameter.value);
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
  







