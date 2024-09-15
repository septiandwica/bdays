const checkbox = document.getElementById("click");
const wishesDiv = document.querySelector(".wishes");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    setTimeout(() => {
      wishesDiv.style.zIndex = "20";
    }, 500);
  } else {
    wishesDiv.style.zIndex = "-1000";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const letters = document.querySelectorAll(".letter");

  function getRandomNeonColor() {
    const randomChannel = () => Math.floor(Math.random() * 155 + 100);
    const randomRed = randomChannel();
    const randomGreen = randomChannel();
    const randomBlue = randomChannel();
    return `rgb(${randomRed},${randomGreen},${randomBlue})`;
  }

  function applyRandomProperties(letter) {
    const randomDelay = Math.random() * 0.6;
    const randomColor = getRandomNeonColor();

    letter.style.animation = `randomMove 0.5s infinite alternate ${randomDelay}s`;
    letter.style.color = randomColor;

    setInterval(function () {
      letter.style.color = getRandomNeonColor();
    }, 1000); // Update color every 1000 milliseconds (1 second)
  }

  letters.forEach(applyRandomProperties);
});

document.addEventListener("DOMContentLoaded", function () {
  const balloons = document.querySelectorAll(".balloon");

  function getRandomColor() {
    const randomRed = Math.floor(Math.random() * 80 + 20);
    const randomGreen = Math.floor(Math.random() * 50 + 20);
    const randomBlue = Math.floor(Math.random() * 80 + 20);
    return `rgb(${randomRed},${randomGreen},${randomBlue})`;
  }

  function applyRandomColor(balloon) {
    const randomColor = getRandomColor();
    balloon.querySelector("svg").style.fill = randomColor;
  }

  function onAnimationIteration(event) {
    const balloon = event.target;
    applyRandomColor(balloon);
  }

  balloons.forEach((balloon) => {
    balloon.addEventListener("animationiteration", onAnimationIteration);
    applyRandomColor(balloon);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let audio = new Audio('./assets/music/hbd.mp3');


  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCountDisplay.textContent = activeCandles;
  }

  function addCandle(left, top) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
    updateCandleCount();
  }

  cake.addEventListener("click", function (event) {
    const rect = cake.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return average > 50; //ETO CHANGEEEEEE
  }

  function blowOutCandles() {
    let blownOut = 0;

    // Only check for blowing if there are candles and at least one is not blown out
    if (candles.length > 0 && candles.some((candle) => !candle.classList.contains("out"))) {
      if (isBlowing()) {
        candles.forEach((candle) => {
          if (!candle.classList.contains("out") && Math.random() > 0.5) {
            candle.classList.add("out");
            blownOut++;
          }
        });
      }

      if (blownOut > 0) {
        updateCandleCount();
        addGift(); // Panggil fungsi untuk menampilkan hadiah
      }

      // If all candles are blown out, trigger confetti after a small delay
      if (candles.every((candle) => candle.classList.contains("out"))) {
        setTimeout(function() {
          triggerConfetti();
          endlessConfetti(); // Start the endless confetti
        }, 200);
        audio.play();
      }
    }
  }

  function addGift() {
    const gift = document.querySelector(".birthday-gift");
    gift.style.position = "absolute";
    gift.style.top = "-100px"; // Mulai dari atas
    gift.style.transition = "top 1s ease-in-out"; // Animasi transisi

    // Setelah beberapa waktu, gerakkan ke bawah
    setTimeout(() => {
      gift.style.top = "50px"; // Posisi akhir
    }, 200); // Delay sebelum muncul
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
});

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function endlessConfetti() {
  setInterval(function() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0 }
    });
  }, 1000);
}
