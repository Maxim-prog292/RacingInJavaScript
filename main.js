const MAX_ENEMY = 15;

const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'),
      gameName = document.querySelector('.gameName'),
      bestScore = document.querySelector('.bestScore');

const forward = document.querySelector('.forward'),
      back = document.querySelector('.back'),
      left = document.querySelector('.left'),
      right = document.querySelector('.right');

forward.addEventListener('touchstart', forwardGo, false);

function forwardGo() {
    settings.y -= settings.speed;
};



const music = document.createElement('embed');

music.src = 'audio.mp3';

music.classList.add('visually-hidden');



car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
document.addEventListener('keydown', rotateLeftDown);
document.addEventListener('keyup', rotateLeftUp);

function rotateLeftDown() {
    car.style.transform = 'rotate(0deg)';
}
function rotateLeftUp() {
    car.style.transform = 'rotate(0deg)';
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
    w: false,
    s: false,
    d: false,
    a: false
};


const settings = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}


const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1);
console.log(getRandomEnemy(MAX_ENEMY));
console.log(getRandomEnemy(MAX_ENEMY));
console.log(getRandomEnemy(MAX_ENEMY));
console.log(getRandomEnemy(MAX_ENEMY));



function startGame() {
    start.classList.add('hide');
    gameName.classList.add('hide');
    gameArea.innerHTML = '';
    document.body.append(music);
    
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 50) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `
            url(/image/enemy${getRandomEnemy(MAX_ENEMY)}.png)
            center / contain 
            no-repeat`;
        gameArea.appendChild(enemy);
    }

    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.style.left = '137px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
};
function playGame() {
    
    if (settings.start) {
        settings.score += settings.speed;
        score.textContent = `Счет: ${settings.score}`;
        
        moveRoad();
        moveEnemy();
        if ( (keys.ArrowLeft || keys.a) && settings.x > 0) {
            settings.x -= settings.speed;
            car.style.transform = 'rotate(-5deg)';
        }

        if ( (keys.ArrowRight || keys.d) && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
            car.style.transform = 'rotate(5deg)';
        }

        if ( (keys.ArrowUp || keys.w) && settings.y > 0) {
            settings.y -= settings.speed;
        }

        if ( (keys.ArrowDown || keys.s) && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed;
        }

        car.style.top = settings.y + 'px';
        car.style.left = settings.x + 'px';

        requestAnimationFrame(playGame);
    }
    
};
function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line){
        line.y += settings.speed;
        line.style.top = line.y + 'px';

        if ( line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
};

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right && 
            carRect.bottom >= enemyRect.top) {

            settings.start = false;
            start.classList.remove('hide');
            gameName.classList.remove('hide');
            music.remove();

            let scoreFinal = score.textContent;
            bestScore.textContent = `Лучший ${scoreFinal}`;
            

            // fixedScore = settings.score;
            // console.log(fixedScore);
            
        }

        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';

        if ( item.y > document.documentElement.clientHeight) {
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

};

function startRun(event){
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = true;
    }
};
function stopRun(event){
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = false;
    } 
};

