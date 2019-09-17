import React, { useState, useCallback } from 'react';
import { DatePicker, Button } from 'antd';
import moment, { Moment } from 'moment';

import { Wrap, Column } from './DateSelector.styled';

interface CountdownOptionsProps {
  defaultDate?: Moment;
  buttonText: string;
  showTime?: boolean;
  onSubmit: (ts: number) => void;
}

export const DateSelector: React.FC<CountdownOptionsProps> = ({
  defaultDate = moment(),
  showTime = true,
  onSubmit,
  buttonText,
}) => {
  const [selectedDate, setSelectedDate] = useState<Moment>(defaultDate);

  const onDateChange = useCallback((date: Moment | null) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  return (
    <Wrap>
      <Column>
        <DatePicker showTime={showTime} onChange={onDateChange} value={selectedDate} />
      </Column>

      <Column>
        <Button type="primary" onClick={() => onSubmit((selectedDate || moment()).valueOf())}>
          {buttonText}
        </Button>
      </Column>
    </Wrap>
  );
};
