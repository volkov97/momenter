import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';
import { Input } from 'antd';

interface DateTimePickerProps {
  showTime?: boolean;
  defaultDate: Date;
  onChange?: (date: Date) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  showTime,
  defaultDate,
  onChange,
}) => {
  const inputRef = React.useRef<Input>(null);

  useEffect(() => {
    const dateTimeInput = flatpickr((inputRef.current as Input).input, {
      defaultDate: defaultDate || new Date(),
      enableTime: showTime,
      onChange: dates => onChange && onChange(dates[0]),
      dateFormat: showTime ? 'd.m.Y H:i' : 'd.m.Y',
    });

    return () => {
      dateTimeInput.destroy();
    };
  });

  return <Input ref={inputRef} />;
};
