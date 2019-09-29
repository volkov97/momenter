import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid #767676;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 0.6s linear infinite;
`;
