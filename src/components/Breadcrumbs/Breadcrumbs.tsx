import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrap, ItemLink } from './Breadcrumbs.styled';

interface BreadcrumbsProps {
  data: {
    title: string;
    link: string | null;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ data }) => {
  return (
    <Wrap>
      {data.map(item => (
        <Typography variant="body1" component="span" key={item.title}>
          {item.link ? (
            <React.Fragment>
              <ItemLink to={item.link}>{item.title}</ItemLink>&nbsp;/&nbsp;
            </React.Fragment>
          ) : (
            item.title
          )}
        </Typography>
      ))}
    </Wrap>
  );
};
