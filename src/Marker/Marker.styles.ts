import styled from 'styled-components';
import mapmarker from '../Icons/map-marker-alt-solid2.svg';

export const MarkerImg = styled.img`
  width: 100%;
  margin-bottom: 36px;
  position: relative;
  z-index: -1;
`;

export const CarImg = styled.img`
  z-index: -1;
  width: 80%;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const MarkerImgUnavailable = styled.img`
  width: 100%;
  margin-bottom: 36px;
  position: relative;
  z-index: -1;
  -webkit-filter: invert(40%) brightness(100%) sepia(100%) hue-rotate(-50deg)
    saturate(400%) contrast(1);
  filter: brightness(100%) sepia(100%) hue-rotate(-50deg) saturate(600%)
    contrast(1);
`;

export const MarkerInGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-left: -7px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #ddd;
  background-image: url(${mapmarker});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 36px;
  height: 36px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;
