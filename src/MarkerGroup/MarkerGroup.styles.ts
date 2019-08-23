import styled from 'styled-components';

interface IOwnProps {
  length: number;
}
export const Wrapper = styled.div<IOwnProps>`
  display: flex;
  width: ${props => (props.length === 2 ? '55px' : '96px')};
  border-radius: 100px;
  background-color: #ddd;
`;

export const MarkerCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 8px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: gray;
`;
