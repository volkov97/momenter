import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { addMinutes, startOfMinute } from 'date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';

import { Wrap, Line, Option } from './CounterOptions.styled';

interface CounterOptionsProps {
  onSubmit: (ts: number) => void;
}

export const CounterOptions: React.FC<CounterOptionsProps> = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    startOfMinute(addMinutes(new Date(), 10)),
  );

  function handleDateChange(date: MaterialUiPickersDate) {
    setSelectedDate(startOfMinute(date as Date));
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Wrap>
        <Line>
          <Option>
            <DatePicker
              label="Choose date"
              format="MM/dd/yyyy"
              disablePast={true}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Option>
          <Line>
            <TimePicker
              ampm={false}
              label="Choose time"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Line>
        </Line>
        <Line>
          <Option>
            <Button
              size="large"
              variant="contained"
              onClick={() => onSubmit((selectedDate || new Date()).getTime())}
            >
              Start countdown
            </Button>
          </Option>
        </Line>
      </Wrap>
    </MuiPickersUtilsProvider>
  );
};
