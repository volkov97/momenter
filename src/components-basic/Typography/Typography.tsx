import React from 'react';

import { ParagraphWrap, Title1Wrap, Title2Wrap, Title3Wrap, TextWrap } from './Typography.styled';

const Paragraph: React.FC = ({ children }) => <ParagraphWrap>{children}</ParagraphWrap>;

interface TitleProps {
  level: number;
}

const Title: React.FC<TitleProps> = ({ level, children }) => {
  if (level === 1) {
    return <Title1Wrap>{children}</Title1Wrap>;
  }

  if (level === 2) {
    return <Title2Wrap>{children}</Title2Wrap>;
  }

  if (level === 3) {
    return <Title3Wrap>{children}</Title3Wrap>;
  }

  return null;
};

interface TextProps {
  mark: boolean;
}

export const Text: React.FC<TextProps> = ({ children }) => <TextWrap>{children}</TextWrap>;

export const Typography = {
  Title,
  Paragraph,
  Text,
};
