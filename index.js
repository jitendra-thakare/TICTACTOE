const playerNext = document.querySelector('.nextPlayer');
const resetboard = document.querySelector('.reset');
const boxes = document.querySelectorAll('.tickbox');

const xSymbol = '×';
const oSymbol = '○';

let gameisrunning = true;
let nextplayerx = true;
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
  gameisrunning = false;
  resetboard.innerHTML=`RESETNOW`;
  if (letter === 'x') {
    playerNext.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    playerNext.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  }
};

const checkGamenextPlayer = () => {
  const TL = boxes[0].classList[1];
  const TM = boxes[1].classList[1];
  const TR = boxes[2].classList[1];
  const ML = boxes[3].classList[1];
  const MM = boxes[4].classList[1];
  const MR = boxes[5].classList[1];
  const BL = boxes[6].classList[1];
  const BM = boxes[7].classList[1];
  const BR = boxes[8].classList[1];

  if (TL && TL === TM && TL === TR) {
    handleWin(TL);
    boxes[0].classList.add('won');
    boxes[1].classList.add('won');
    boxes[2].classList.add('won');
  } else if (ML && ML === MM && ML === MR) {
    handleWin(ML);
    boxes[3].classList.add('won');
    boxes[4].classList.add('won');
    boxes[5].classList.add('won');
  } else if (BL && BL === BM && BL === BR) {
    handleWin(BL);
    boxes[6].classList.add('won');
    boxes[7].classList.add('won');
    boxes[8].classList.add('won');
  } else if (TL && TL === ML && TL === BL) {
    handleWin(TL);
    boxes[0].classList.add('won');
    boxes[3].classList.add('won');
    boxes[6].classList.add('won');
  } else if (TM && TM === MM && TM === BM) {
    handleWin(TM);
    boxes[1].classList.add('won');
    boxes[4].classList.add('won');
    boxes[7].classList.add('won');
  } else if (TR && TR === MR && TR === BR) {
    handleWin(TR);
    boxes[2].classList.add('won');
    boxes[5].classList.add('won');
    boxes[8].classList.add('won');
  } else if (TL && TL === MM && TL === BR) {
    handleWin(TL);
    boxes[0].classList.add('won');
    boxes[4].classList.add('won');
    boxes[8].classList.add('won');
  } else if (TR && TR === MM && TR === BL) {
    handleWin(TR);
    boxes[2].classList.add('won');
    boxes[4].classList.add('won');
    boxes[6].classList.add('won');
  } else if (TL && TM && TR && ML && MM && MR && BL && BM && BR) {
    gameisrunning = false;
    playerNext.innerHTML = 'Game is tied!';
  } else {
    nextplayerx = !nextplayerx;
    if (nextplayerx) {
      playerNext.innerHTML = `${xSymbol} is next`;
    } else {
      playerNext.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
  };

  const handleReset = () => {
    nextplayerx = true;
    playerNext.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of boxes) {
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
      cellDiv.classList.remove('won');
    }
    gameisrunning = true;
  };

  const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (!gameisrunning || classList[1] === 'x' || classList[1] === 'o') {
      return;
    }

    if (nextplayerx) {
      classList.add('x');
      checkGamenextPlayer();
    } else {
      classList.add('o');
      checkGamenextPlayer();
    }
  };

  resetboard.addEventListener('click', handleReset);

  for (const cellDiv of boxes) {
    cellDiv.addEventListener('click', handleCellClick)
  }
