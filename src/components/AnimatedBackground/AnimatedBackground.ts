import styled from 'styled-components';

export const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(-45deg, #f5e4df, #f1dce4, #d5e6ec, #c4eae1);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;

  z-index: -1;

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
