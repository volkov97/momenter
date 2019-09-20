import React, { useState, useCallback } from 'react';
import { DatePicker, Button } from 'antd';
import { DatePicker as MobileDatePicker, List as MobileList } from 'antd-mobile';
import moment, { Moment } from 'moment';
import { useMediaQuery } from 'react-responsive';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

import { Wrap, Column } from './DateSelector.styled';
import { mediaQuerySizes } from 'src/lib/styles/mixins/media';

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
  const isMobile = useMediaQuery({ maxWidth: mediaQuerySizes.mobile });

  const onDateChange = useCallback((date: Moment | null) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  return (
    <Wrap>
      <Column>
        {isMobile ? (
          <MobileDatePicker
            mode={showTime ? 'datetime' : 'date'}
            locale={enUs}
            onChange={ts => onDateChange(moment(ts))}
            value={selectedDate.toDate()}
          >
            <MobileList.Item arrow="horizontal">Choose date</MobileList.Item>
          </MobileDatePicker>
        ) : (
          <DatePicker showTime={showTime} onChange={onDateChange} value={selectedDate} />
        )}
      </Column>

      <Column>
        <Button type="primary" onClick={() => onSubmit((selectedDate || moment()).valueOf())}>
          {buttonText}
        </Button>
      </Column>
    </Wrap>
  );
};
