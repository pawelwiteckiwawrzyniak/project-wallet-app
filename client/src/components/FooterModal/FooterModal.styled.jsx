import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const ModalTitle = styled.h2`
  padding: 20px 0px;
`;
export const Modal = styled.div`
  position: relative;
  @media screen and (min-width: 320px) {
    width: 280px;
    height: 550px;
    background-color: white;
  }
  @media screen and (min-width: 768px) {
    width: 768px;
    height: 560px;
    background: #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const CloseBtn = styled.button`
  position: absolute;
  background-color: transparent;
  top: 10px;
  right: 10px;
`;
export const CloseIcon = styled(AiOutlineCloseCircle)`
  width: 16px;
  &:hover {
    width: 17px;
  }
`;
