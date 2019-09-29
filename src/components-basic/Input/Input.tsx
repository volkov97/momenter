import styled from 'styled-components';

export const Input = styled.input`
  padding: 4px 11px;

  height: 32px;

  font-size: 14px;
  line-height: 1.5;

  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  transition: all 0.3s;

  &:focus,
  &:hover {
    outline: 0;

    border-color: #ff787e;
    border-right-width: 1px !important;

    box-shadow: 0 0 0 2px rgba(255, 24, 24, 0.2);
  }
`;
