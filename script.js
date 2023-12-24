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
        changeHtml()
    }

}

function createSnowflake(){
    const snowflake = document.createElement('div'); // 創建一個 div 元素
    snowflake.classList.add('snowflake'); // 給它添加 snowflake 類名
    snowflake.style.left = Math.random() * window.innerWidth + 'px'; // 給它隨機的水平位置
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
  var snowflakeInterval = setInterval (createSnowflake, 300);


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
  
  // 您可以在 updateCountdown 函數中添加一個條件，當倒計時達到零時，調用 changeHtml 函數
  function updateCountdown () {
    const currentDate = new Date ();
    const newYearDate = new Date (currentDate.getFullYear () + 1, 0, 1);
    const timeRemaining = newYearDate - currentDate;
    const days = Math.floor (timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor ((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor ((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor ((timeRemaining % (1000 * 60)) / 1000);
  
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;
  
    // 如果倒計時達到零，則更換 html
    if (timeRemaining <= 0) {
      changeHtml ();
    }
  }