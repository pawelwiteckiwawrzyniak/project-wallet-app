import styled from "styled-components";
import { BsSuitHeart } from "react-icons/bs";

export const Container = styled.footer`
  display: flex;
  justify-content: center;

  @media screen and (min-width: 320px) {
    padding: 20px 0;
    text-align: center;
    background: var(--white-color);
    flex-direction: column;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
  @media screen and (min-width: 1280px) {
  }
`;

export const FooterText = styled.p`
  font-size: 16px;
  line-height: 1.19;
`;
export const HeartIcon = styled(BsSuitHeart)`
  height: 13px;
  fill: red;
`;
export const ModalBtn = styled.button`
  &:hover,
  &:focus {
    color: #1a8f75;
    outline: none;
  }
  background-color: white;
  color: var(--light-green-color);
`;
