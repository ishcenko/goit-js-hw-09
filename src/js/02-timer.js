import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const formInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');


startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    if (pickedDate && pickedDate > new Date()) {
      startBtn.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};
formInput.disabled = true;

flatpickr(formInput, options);

const timer = {
  intervalId: null,
  futureDate: null,
  isRunning: false,

  start() {
    this.futureDate = new Date(formInput.value).getTime();
    if (!this.futureDate) {
      return;
    }
    this.isRunning = true; 
    formInput.disabled = true; 
    startBtn.disabled = true;
    this.intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = this.futureDate - currentTime;

      if (difference <= 0) {
        clearInterval(this.intervalId);
        this.isRunning = false; 
        formInput.disabled = false; 
        startBtn.disabled = false;
        return;
      }

      const time = convertMs(difference);
      updateClocktime(time);
    }, 1000);
  },
};

startBtn.addEventListener('click', () => {
  if (!timer.isRunning) { 
    timer.start();
  }
});

function convertMs(diference) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  const days = addLeadingZero(Math.floor(diference / day));
  const hours = addLeadingZero(Math.floor((diference % day) / hour));
  const minutes = addLeadingZero(Math.floor(((diference % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((diference % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClocktime({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
startBtn.addEventListener('click', () => {
  timer.start();
  // formInput.disabled = true;
  startBtn.disabled = true
})
