import React, { useEffect, memo } from 'react';
import flatpickr from 'flatpickr';
import { Input } from 'antd';
import { startOfMinute, startOfDay } from 'date-fns/esm';

interface DateTimePickerProps {
  showTime?: boolean;
  disabled?: boolean;
  minDate: Date;
  defaultDate: Date;
  onChange?: (date: Date) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = memo(
  ({ disabled = false, showTime, minDate, defaultDate, onChange }) => {
    const inputRef = React.useRef<Input>(null);

    useEffect(() => {
      const defaultDateResult =
        defaultDate || (showTime ? startOfMinute(Date.now()) : startOfDay(Date.now()));

      const dateTimeInput = flatpickr((inputRef.current as Input).input, {
        defaultDate: defaultDateResult,
        minDate,
        enableTime: showTime,
        onChange: dates =>
          onChange && onChange(showTime ? startOfMinute(dates[0]) : startOfDay(dates[0])),
        dateFormat: showTime ? 'd.m.Y H:i' : 'd.m.Y',
      });

      onChange &&
        onChange(showTime ? startOfMinute(defaultDateResult) : startOfDay(defaultDateResult));

      return () => {
        dateTimeInput.destroy();
      };
    });

    return <Input ref={inputRef} disabled={disabled} />;
  },
  (prevProps, nextProps) => {
    if (prevProps.disabled !== nextProps.disabled) {
      return false;
    }

    return true;
  },
);
