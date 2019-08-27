import './index.less';

import getTimeParts from './lib/getTimeParts';

const momentInput = document.querySelector('.moment-input') as HTMLInputElement;
const startButton = document.querySelector('.controls__button_start') as HTMLButtonElement;
const countdownElement = document.querySelector('.countdown-value') as HTMLDivElement;

momentInput.value = '27.08.2019 16:27';

startButton.addEventListener('click', () => {
  const { value } = momentInput;

  const [dayString, timeString] = value.split(' ');
  const [day, month, year] = dayString.split('.').map(num => parseInt(num));
  const [hours, minutes] = timeString.split(':').map(num => parseInt(num));

  const date = new Date(year, month - 1, day, hours, minutes);

  const interval = setInterval(() => {
    const currentTime = Date.now();

    if (currentTime > date.getTime()) {
      clearInterval(interval);

      return;
    }

    countdownElement.innerText = JSON.stringify(getTimeParts(date.getTime() - currentTime, 'd'));
  }, 1000);
});
