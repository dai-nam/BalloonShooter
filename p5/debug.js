
async function logEverySecond() {
    while (true) {
      await waitForSeconds(1.0);
    }
  }

  function createButtons()
  {
    //Buttons and Sliders
    let button1 = createButton('Level up');
    button1.position(0, height + 10);

    button1.mousePressed(() => {
    gameState.setNewLevel(gameState.level +1);
  });
  }

