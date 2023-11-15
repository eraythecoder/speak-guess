const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Ses algılamayı başlatma
recognition.start();

// Konuşulanı yakalama
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Konuşulanı DOM'a ekleme
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>Sayınız: </div>
    <span class="box">${msg}</span>
  `;
}

// Mesajı karşılaştırma ve hataları kontrol etme
function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>Geçerli bir sayı giriniz</div>';
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Sayınız 1 ile yüz arasında olmalı</div>';
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Tebrikler sayıyı buldunuz <br><br>
      Tutulan sayı ${num}</h2>
      <button class="play-again" id="play-again">Tekrar oyna</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>Daha düşük tahmin yapınız</div>';
  } else {
    msgEl.innerHTML += '<div>Daha yüksek tahmin yapınız</div>';
  }
}

// Rastgele sayı üretme
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Konuşulanı aktarma
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});