import styled from 'styled-components';

export const InfoTip = styled.div`
  position: absolute;
  top: -100px;
  background-color: #000;
  border-radius: 10px;
  z-index: 999;
  padding: 10px 15px;
  min-width: 150px;
  height: auto;
  color: white;
  &::after {
    content: ' ';
    position: absolute;
    top: 99%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -7px;
    border-width: 7px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 2px;
  }
  p {
    margin: 0;
    font-size: 12px;
    text-transform: none;
  }
`;
