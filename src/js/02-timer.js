import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

function updateTimer(endDate) {
    const currentDate = new Date();
    const timeDifference = endDate - currentDate;

    if (timeDifference <= 0) {
        clearInterval(timeInterval);
        alert('Please choose a date in the future');
        return;
    };

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    const daysElement = document.querySelector('[data-days]');
    const hoursElement = document.querySelector('[data-hours]');
    const minutesElement = document.querySelector('[data-minutes]');
    const secondsElement = document.querySelector('[data-seconds]');

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
};
// підрахунок значень часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');

flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate new Date();

        if (selectedDate <= currentDate) {
            alert("Please choose a date in the future.");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        };
    };
});
// натискання на кнопку старт
startButton.addEventListener('click', () => {
    const selectedDate = flatpickr.parseDate(dateTimePicker.value);
    clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        updateTimer(selectedDate);
    }, 1000);
});