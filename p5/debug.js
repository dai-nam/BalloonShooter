
async function logEverySecond() {
    while (true) {
      await waitForSeconds(1.0);
    }
  }


  let slider1;
  let button1;
  
  function createButtons()
  {
    button1 = createButton('Level up');
    button1.position(0, height + 10);

    button1.mousePressed(() => {
    gameState.setNewLevel(gameState.level +1);
    });

    slider1 = createSlider(0, 100);
    slider1.position(100, height + 10);
    slider1.size(100);
    slider1.input(changeGameSpeed);
  }


  function changeGameSpeed()
  {
    let scaledValue = map(slider1.value(), 0, 100, 400, 60);
    //console.log(scaledValue);
    gameState.speedInMs = scaledValue;
  }

