import React, { useState, useCallback } from 'react';
import { Button as BasicButton } from '../../components-basic/Button';

import { Wrap, Column } from './DateSelector.styled';
import { DateTimePicker } from 'src/components-basic/DateTimePicker';

interface CountdownOptionsProps {
  defaultDate?: Date;
  buttonText: string;
  showTime?: boolean;
  linkCreator: (ts: Date) => string;
  onSubmit: (ts: Date) => void;
}

export const DateSelector: React.FC<CountdownOptionsProps> = ({
  defaultDate = new Date(),
  showTime = true,
  linkCreator,
  onSubmit,
  buttonText,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

  const onDateChange = useCallback((date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const ts = selectedDate || Date.now();

  return (
    <Wrap>
      <Column>
        <DateTimePicker showTime={showTime} onChange={onDateChange} />
      </Column>

      <Column>
        <BasicButton linkTo={linkCreator(ts)} onClick={() => onSubmit(ts)}>
          {buttonText}
        </BasicButton>
      </Column>
    </Wrap>
  );
};
