const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
};

let changeColorsOnClick = null;


refs.startButton.addEventListener('clic', () => {
    changeColorsOnClick();
    changeColorsOnClick = setInterval(changeColorsOnClick, 1000);
    refs.startButton.setAttribute('disabled', true);
});
refs.stopButton.addEventListener('clic', () => {
    clearInterval(changeColorsOnClick);
    refs.startButton.removeAttribute('disabled');
});

function changeColorsOnClick() {
    document.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};