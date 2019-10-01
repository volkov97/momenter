import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';

import { CurrentUserProvider } from './lib/providers/CurrentUserProvider';
import { FullscreenProvider } from './lib/providers/FullscreenProvider';

import { App } from './App';

ReactDOM.render(
  <BrowserRouter>
    <FullscreenProvider>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </FullscreenProvider>

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
