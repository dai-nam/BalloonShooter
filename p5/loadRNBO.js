

let context;
let device;
let gainNode;
let audioStarted = false;

async function loadRnbo( ){

  context = new AudioContext();

  let rawPatcher = await fetch("export/drums.export.json");
  let patcher = await rawPatcher.json();
  device = await RNBO.createDevice({ context, patcher });
  
  gainNode = context.createGain();
  gainNode.connect(device.node);
  device.node.connect(context.destination);
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
  device.scheduleEvent(event1);
}

function triggerSnare()
{
  const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in2", RNBO.bang);
  device.scheduleEvent(event1);
}

function triggerHihat()
{
  const event1 = new RNBO.MessageEvent(RNBO.TimeNow, "in3", RNBO.bang);
  device.scheduleEvent(event1);
}
  







