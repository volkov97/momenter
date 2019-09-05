import { useEffect } from 'react';

declare global {
  interface Window {
    webkit: {
      messageHandlers: {
        onMount: {
          postMessage: (name: string) => void;
        };
      };
    };
    evoNative: {
      onHideKeyboard?: () => void;
    };
  }
}

function createKeyboardHideHandler() {
  window.evoNative = {};
  window.evoNative.onHideKeyboard = () => {
    setTimeout(() => {
      (window as any).scrollTo(0, 0);
      document.body.scrollTop = 0;
    }, 100);
  };
}

function sendMountedEvent() {
  try {
    window.webkit.messageHandlers.onMount.postMessage('mounted');
  } catch (err) {
    console.warn('Native Log: native context does not exist');
  }
}

function isNativeContextExists() {
  return !!(
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.onMount
  );
}

export function useNativeLogic() {
  useEffect(() => {
    if (isNativeContextExists()) {
      createKeyboardHideHandler();
      sendMountedEvent();
    }
  }, []);
}
