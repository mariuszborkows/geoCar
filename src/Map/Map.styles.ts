import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100px;
  background-color: blue;
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const ExtendedInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  background-color: #ddd;
  min-height: 200px;
  padding: 30px 50px;
  border: 1px solid #222;
  z-index: 999;
`;

export const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const Exit = styled.svg`
  width: 30px;
  height: 30px;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
`;

export const FiltersWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  min-height: 100px;
  width: 100%;
  background-color: #474747;
  padding: 30px 50px;
  border: 1px solid #222;
  border-left: none;
`;

export const FiltersItemWrapper = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border: 1px solid white;
  border-radius: 50%;
  &.active {
    background-color: green;
    border-color: green;
  }
  &.activelist {
    border-radius: 50% 50% 0 0;
    border: 1px solid #4f4f4f;
    background-color: #4f4f4f;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  @media (max-width: 550px) {
    flex-basis: 100%;
    margin-bottom: 15px;
    p {
      max-width: 100% !important;
    }
  }
  p {
    padding-left: 10px;
    max-width: 100px;
    margin: 0;
    color: white;
  }
`;

export const CarItem = styled.img`
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RangeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 38px;
  padding: 20px;
  border-radius: 0 40px 40px 40px;
  min-width: 160px;
  background-color: #4f4f4f;
  flex-direction: column;
`;

export const RangeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 25px;
  margin-bottom: 20px;
  background: #d3d3d3;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  &:hover {
    opacity: 1;
    border: 1px solid #222;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #4caf50;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4caf50;
    cursor: pointer;
  }
`;
