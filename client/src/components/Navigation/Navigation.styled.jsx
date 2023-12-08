import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavContainer = styled.div`
  display: flex;

  width: 190px;
  height: 38px;

  margin-bottom: 15px;

  border-radius: 6px;

  @media (min-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 767px) {
    & > * {
      opacity: 0.8;

      &.active {
        &:not(:last-child) {
          backdrop-filter: ${(props) => !props.viewCurrency && "blur(50px)"};
          filter: ${(props) =>
            props.viewCurrency === false
              ? "drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5))"
              : "0"};
          opacity: ${(props) => (props.viewCurrency === false ? "1" : "0.8")};
        }

        &:last-child {
          backdrop-filter: ${(props) => props.viewCurrency && "blur(50px)"};
          filter: ${(props) =>
            props.viewCurrency &&
            "drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5))"};

          opacity: ${(props) => props.viewCurrency && "1"};
        }
      }

      &:not(:last-child) {
        margin-right: 36px;
      }
    }
  }
`;

export const NavButton = styled(NavLink)`
  display: block;
  width: max-content;
  border-radius: 6px;
  > * {
    border-radius: 6px;
    background-color: var(--white-color);
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    border-radius: 2px;
    opacity: 0.8;
    &.active {
      opacity: 1;
      & > * {
        &:first-child {
          backdrop-filter: blur(50px);
          filter: drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5));
        }
        &:last-child {
          font-weight: 700;
        }
      }
    }
  }

  &:hover {
    & > * {
      &:first-child {
        backdrop-filter: blur(50px);
        filter: drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5));
        opacity: 1;
      }

      &:last-child {
        font-weight: 700;
      }
    }
  }

  &:visited {
    color: inherit;
  }
`;

export const IconWrapper = styled.div`
  width: 38px;
  height: 38px;

  &:hover {
    &:first-child {
      backdrop-filter: blur(50px);
      filter: drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5));
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

export const Text = styled.p`
  display: none;

  @media (min-width: 768px) {
    display: inline-block;
    margin-left: 23px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;

    background-color: transparent;
  }
`;
