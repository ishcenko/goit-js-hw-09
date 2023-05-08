import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// ведучий нуль до числа
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// підрахунок значення таймера
function updateTimer(endDate) {
  const currentDate = new Date();
  const timeDifference = endDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    alert("Please choose a date in the future.");
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Функція підрахунку значень часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// елементи 
const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
let timerInterval;

// Ініціалізація flatpickr
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      alert("Please choose a date in the future.");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// натискання на кнопку старт
startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value);
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    updateTimer(selectedDate);
  }, 1000);
});