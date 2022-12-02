import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEL = document.querySelector('input[type="text"]');
const buttonStartEl = document.querySelector('button[type="button"]');
const valueDataDays = document.querySelector('[data-days]');
const valueDataHours = document.querySelector('[data-hours]');
const valueDataMinutes = document.querySelector('[data-minutes]');
const valueDataSeconds = document.querySelector('[data-seconds]');

let deltaTime = 0;

buttonStartEl.addEventListener('click', onButtonClick);
buttonStartEl.setAttribute('disabled', true);

const options = {
  // Вмикає засіб вибору часу
  enableTime: true,
  // Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено
  time_24hr: true,
  // Встановлює початкові вибрані дати. Якщо ви використовуєте режим: "кілька" або діапазонний календар, надайте масив об’єктів Date або масив рядків дат, які слідують за вашим dateFormat. В іншому випадку ви можете надати один об’єкт Date або рядок дати
  defaultDate: new Date(),
  //   Регулює крок для введення хвилин (включно з прокручуванням)
  minuteIncrement: 1,
  // Функції, які запускаються щоразу, коли календар закривається. Перегляньте Events API
  onClose(selectedDates) {
    const validDate = selectedDates[0].getTime() > new Date().getTime();
    const deltaTime = selectedDates[0].getTime() - new Date().getTime();

    if (!validDate) {
      buttonStartEl.setAttribute('disabled', true);
      window.alert('Please choose a date in the future');
    } else {
      buttonStartEl.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function onButtonClick(event) {
  const startTime = new Date().getTime();

  const intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    deltaTime = currentTime - startTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`${days}:${hours}:${minutes}:${seconds}`);

    valueDataDays.textContent = days;
    valueDataHours.textContent = hours;
    valueDataMinutes.textContent = minutes;
    valueDataSeconds.textContent = seconds;

    // if (deltaTime <= 0) {
    //   clearInterval(intervalId);
    // }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Чому не спрацьовує активація кнопки, якщо не через if.. else???
