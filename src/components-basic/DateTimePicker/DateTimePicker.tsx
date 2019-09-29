import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';

import { Input } from '../Input';

interface DateTimePickerProps {
  showTime?: boolean;
  onChange?: (date: Date) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ showTime, onChange }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    flatpickr(inputRef.current as Node, {
      defaultDate: new Date(),
      enableTime: showTime,
      onChange: dates => onChange && onChange(dates[0]),
    });
  }, []);

  return <Input ref={inputRef} />;
};
