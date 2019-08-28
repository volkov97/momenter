import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import WebFont from 'webfontloader';

import { App } from './App';

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700:latin', 'sans-serif'],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />

    <YMInitializer
      version="2"
      accounts={[55077073]}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
    />
  </BrowserRouter>,
  document.getElementById('root'),
);
