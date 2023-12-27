const countdown = document.getElementById('countdown');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const snowContainer = document.getElementById('snow-container');



function updateCountdown(){
    const currentDate = new Date();
    const newYearDate = new Date(currentDate.getFullYear()+1,0,1)
    const timeRemaining = newYearDate - currentDate;
    const days = Math.floor(timeRemaining / (1000*60*60*24));
    const hours =Math.floor((timeRemaining % (1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((timeRemaining % (1000*60*60))/(1000*60));
    const seconds = Math.floor((timeRemaining % (1000*60))/1000);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;

    if(timeRemaining <= 0){
      celebrate();
    }

}

function createSnowflake(){
    const snowflake = document.createElement('div'); // 創建一個 div 元素
    snowflake.classList.add('snowflake'); // 給它添加 snowflake 類名
    snowflake.style.left = Math.random() * (window.innerWidth - 1) + 'px'; // 給它隨機的水平位置
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 給它隨機的動畫時間
    snowflake.style.opacity = Math.random(); // 給它隨機的透明度
    snowContainer.appendChild(snowflake); // 把它添加到 snow-container 中
    setTimeout(() => {
        snowflake.remove(); // 在一定時間後刪除它，以節省資源
    }, 5000);
}

updateCountdown();
  // 您可以將 setInterval 的返回值賦給一個變量，以便之後清除它們
  var updateInterval = setInterval (updateCountdown, 1000);
  var snowflakeInterval = setInterval (createSnowflake, 250);


function getPages () {
    var pages = [];
    $.ajax ({
      url: "cards/", // 您需要將 url 改為 "pages/cards/"，這樣才能訪問到正確的文件夾
      success: function (data) {
        $ (data).find ("a:contains(.html)").each (function () {
          var filename = $ (this).attr ("href");
          pages.push (filename);
        });
      },
      async: false
    });
    return pages;
  }
  
  // 您可以用這個函數從數組中隨機選擇一個元素，並返回它
  function getRandomElement (array) {
    var index = Math.floor (Math.random () * array.length);
    return array [index];
  }
  
  // 您可以用這個函數將當前的 html 更換為隨機的 html，並停止倒計時和雪花效果
  function changeHtml () {
    var pages = getPages (); // 獲取所有的 html 文件名
    var randomPage = getRandomElement (pages); // 隨機選擇一個 html 文件名
    window.location.href = randomPage; // 跳轉到該 html 文件
    clearInterval (updateInterval); // 停止更新倒計時
    clearInterval (snowflakeInterval); // 停止創建雪花
  }



  // 定義一個函數，用來創造煙火效果
function createFirework() {
  // 創建一個 div 元素，用來存放所有的煙火粒子
  const fireworkContainer = document.createElement('div');
  fireworkContainer.id = 'firework-container';
  fireworkContainer.style.position = 'absolute';
  fireworkContainer.style.top = '0';
  fireworkContainer.style.left = '0';
  fireworkContainer.style.width = '100%';
  fireworkContainer.style.height = '100%';
  fireworkContainer.style.overflow = 'hidden';
  fireworkContainer.style.pointerEvents = 'none';
  document.body.appendChild(fireworkContainer);

  // 定義一些常數，用來控制煙火的參數
  const FIREWORK_COUNT = 10; // 每次發射的煙火數量
  const FIREWORK_DELAY = 2000; // 每次發射的間隔時間，單位是毫秒
  const PARTICLE_COUNT = 50; // 每個煙火的粒子數量
  const PARTICLE_SIZE = 5; // 每個粒子的大小，單位是像素
  const PARTICLE_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white']; // 粒子的顏色列表
  const PARTICLE_SPEED = 5; // 粒子的初始速度，單位是像素/毫秒
  const PARTICLE_DECAY = 0.01; // 粒子的衰減率，每毫秒減少的速度
  const PARTICLE_GRAVITY = 0.01; // 粒子的重力加速度，每毫秒增加的速度
  const PARTICLE_DURATION = 3000; // 粒子的持續時間，單位是毫秒

  // 用一個迴圈，創造指定數量的煙火
  for (let i = 0; i < FIREWORK_COUNT; i++) {
    // 在指定的間隔時間後，創造一個煙火
    setTimeout(() => {
      createOneFirework();
    }, i * FIREWORK_DELAY);
  }

  // 定義一個函數，用來創造一個煙火
  function createOneFirework() {
    // 隨機選擇一個發射點，位於視窗的下方
    const launchX = Math.random() * window.innerWidth;
    const launchY = window.innerHeight;

    // 隨機選擇一個爆炸點，位於視窗的上方
    const explodeX = Math.random() * window.innerWidth;
    const explodeY = Math.random() * window.innerHeight / 2;

    // 計算發射角度和發射時間
    const angle = Math.atan2(explodeY - launchY, explodeX - launchX);
    const distance = Math.sqrt((explodeX - launchX) ** 2 + (explodeY - launchY) ** 2);
    const duration = distance / PARTICLE_SPEED;

    // 創建一個 div 元素，用來表示發射的煙火
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.position = 'absolute';
    firework.style.width = PARTICLE_SIZE + 'px';
    firework.style.height = PARTICLE_SIZE + 'px';
    firework.style.borderRadius = '50%';
    firework.style.backgroundColor = 'white';
    firework.style.left = launchX + 'px';
    firework.style.top = launchY + 'px';
    fireworkContainer.appendChild(firework);

    // 給煙火添加動畫，讓它沿著發射角度移動到爆炸點
    firework.animate(
      [
        {
          transform: `translate(0, 0)`,
        },
        {
          transform: `translate(${explodeX - launchX}px, ${explodeY - launchY}px)`,
        },
      ],
      {
        duration: duration,
        easing: 'linear',
      }
    );

    // 在發射時間後，刪除煙火，並創造一個爆炸效果
    setTimeout(() => {
      firework.remove();
      createExplosion(explodeX, explodeY);
    }, duration);
  }

  // 定義一個函數，用來創造一個爆炸效果
  function createExplosion(x, y) {
    // 創造一個粒子的陣列，用來存放所有的粒子
    const particles = [];

    // 用一個迴圈，創造指定數量的粒子
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 隨機選擇一個粒子的顏色
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

      // 創建一個 div 元素，用來表示一個粒子
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.position = 'absolute';
      particle.style.width = PARTICLE_SIZE + 'px';
      particle.style.height = PARTICLE_SIZE + 'px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      fireworkContainer.appendChild(particle);

      // 隨機選擇一個粒子的發射角度
      const angle = Math.random() * Math.PI * 2;

      // 設定粒子的初始速度和位置
      let speed = PARTICLE_SPEED;
      let posX = x;
      let posY = y;

      // 把粒子添加到粒子陣列中
      particles.push({
        element: particle,
        angle: angle,
        speed: speed,
        posX: posX,
        posY: posY,
      });
    }

    // 定義一個函數，用來更新粒子的位置和速度
    function updateParticles() {
      // 用一個迴圈，更新每個粒子的位置和速度
      for (let particle of particles) {
        // 根據粒子的角度和速度，計算粒子的水平和垂直移動距離
        const deltaX = Math.cos(particle.angle) * particle.speed;
        const deltaY = Math.sin(particle.angle) * particle.speed;

        // 更新粒子的位置
        particle.posX += deltaX;
        particle.posY += deltaY;

        // 更新粒子的速度，根據衰減率和重力加速度
        particle.speed -= PARTICLE_DECAY;
        particle.speed += PARTICLE_GRAVITY;

        // 更新粒子的元素的位置
        particle.element.style.left = particle.posX + 'px';
        particle.element.style.top = particle.posY + 'px';
      }
    }

// 定義一個函數，用來刪除粒子
function removeParticles() {
  // 用一個迴圈，刪除每個粒子的元素
  for (let i = 0; i < particles.length; i++) {
    particles[i].element.remove();
  }
}

// 定義一個函數，用來更新粒子的位置和速度
function updateParticles() {
  // 用一個迴圈，更新每個粒子的位置和速度
  for (let i = 0; i < particles.length; i++) {
    // 根據粒子的角度和速度，計算粒子的水平和垂直移動距離
    const deltaX = Math.cos(particles[i].angle) * particles[i].speed;
    const deltaY = Math.sin(particles[i].angle) * particles[i].speed;

    // 更新粒子的位置
    particles[i].posX += deltaX;
    particles[i].posY += deltaY;

    // 更新粒子的速度，根據衰減率和重力加速度
    particles[i].speed -= PARTICLE_DECAY;
    particles[i].speed += PARTICLE_GRAVITY;

    // 更新粒子的元素的位置
    particles[i].element.style.left = particles[i].posX + 'px';
    particles[i].element.style.top = particles[i].posY + 'px';
  }
}

// 使用 requestAnimationFrame 來不斷更新粒子的位置和速度
let animationId = requestAnimationFrame(animate);

// 定義一個函數，用來執行動畫
function animate() {
  updateParticles();
  animationId = requestAnimationFrame(animate);
}}}


function celebrate() {
  // 創造一個 Promise 物件，用來包裝 createFirework 的操作
  let promise = new Promise(function (resolve, reject) {
    // 執行 createFirework 函數
    createFirework();
    // 在指定的時間後，調用 resolve 函數，表示操作完成
    setTimeout(resolve, 10000); // 這裡的 10000 是 10 秒，您可以根據您的需求修改
  });

  // 在 Promise 物件完成後，執行 then 方法，並傳入 changeHtml 函數作為參數
  promise.then(changeHtml);
}