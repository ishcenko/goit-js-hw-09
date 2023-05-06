
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
let intervalIdColor = null;


startButton.addEventListener('clic', function () {
    startButton.disabled = true;
    intervalIdColor = setInterval(function () {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

startButton.addEventListener('click', function () {
    startButton.disabled = false;
    clearInterval(intervalIdColor);
});