import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  let position = 0;
  let amountValue = Number.parseInt(amount.value);
  let delayValue = Number.parseInt(delay.value);
  let stepValue = Number.parseInt(step.value);

  intervalId = setInterval(() => {
    position += 1;
    delayValue += stepValue;
    amountValue -= 1;

    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    if (amountValue === 0) {
      clearInterval(intervalId);
    }
  }, delayValue);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
