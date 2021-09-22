const $ = document.querySelector.bind(document);
const get = localStorage.getItem.bind(localStorage);

let char = $('#char');
let block = $('#block');
let song = $('#song');
let gameOver = $('#gameOver');
let counter = 0;

const score = $('#score');
const best = $('#best');

function checkBest() {
  best.innerText = 0;

  if(get('best')) {
    if(parseInt(best.innerText) < parseInt(get('best'))) {
      best.innerText = get('best');
    }

  } else {
    localStorage.setItem('best', '0');
  }
}

checkBest();

function jump() {
  if (char.classList == 'animate') {
    return;
  }
  
  char.classList.add('animate');
  
  setTimeout(() => {
    char.classList.remove('animate');
  }, 600);
}

function randomMusic() {
  let tracks = ['song/plant_zone.mp3', 'song/cassino_zone.mp3', 'song/cave_zone.mp3', 'song/aqua_zone.mp3'];
  let sort = Math.floor(Math.random() * 4);

  return tracks[sort];
}

song.src = randomMusic();

function start() {
  location.reload();
}

var checkDead = setInterval(() => {
  let charTop = parseInt(window.getComputedStyle(char).getPropertyValue('top'));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));

  if (blockLeft < -20 && charTop >= 308) {
    block.style.animation = 'none';
    block.style.left = blockLeft.toString()+'px';

    char.style.top = charTop.toString()+'px';
    char.src = 'img/sonic-static-bg.png';

    if (parseInt(score.innerText) >  parseInt(get('best'))) {
      localStorage.setItem('best', score.innerText);
    }
    
    song.src = 'song/game_over.mp3';
    gameOver.innerText = 'GAME OVER!';

    clearInterval(checkDead);

  } else {
    counter++;
    score.innerHTML = Math.floor(counter/100);
  }

}, 20);
