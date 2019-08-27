import './index.less';

import getTimeParts from './lib/getTimeParts';

const momentInput = document.querySelector('.moment-input') as HTMLInputElement;
const startButton = document.querySelector('.controls__button_start') as HTMLButtonElement;
const countdownElement = document.querySelector('.countdown-value') as HTMLDivElement;

momentInput.value = '27.08.2019 21:00';

startButton.addEventListener('click', () => {
  const { value } = momentInput;

  const [dayString, timeString] = value.split(' ');
  const [day, month, year] = dayString.split('.').map(num => parseInt(num));
  const [hours, minutes] = timeString.split(':').map(num => parseInt(num));

  const date = new Date(year, month - 1, day, hours, minutes);

  (document.querySelector('.screen.visible') as HTMLDivElement).classList.remove('visible');
  (document.querySelector('.screen.screen_countdown') as HTMLDivElement).classList.add('visible');

  function renderTime() {
    const currentTime = Date.now();
    const { h, m, s } = getTimeParts(date.getTime() - currentTime, 'h');
    const prefixTimePart = (t: number) => (t < 10 ? `0${t}` : t);

    const timeString = `${h}:${prefixTimePart(m)}:${prefixTimePart(s)}`;

    document.title = timeString;
    countdownElement.innerText = timeString;
  }

  renderTime();

  const interval = setInterval(() => {
    if (Date.now() > date.getTime()) {
      clearInterval(interval);

      return;
    }

    renderTime();
  }, 1000);
});
