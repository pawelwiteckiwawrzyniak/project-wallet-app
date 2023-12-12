// components

import Media from "react-media";
import { useDispatch } from "react-redux";
import { toggleCurrencyView } from "../../redux/slices/global-slice";
import Icon from "../Icon/Icon";

// styled-components
import {
  NavButton,
  NavContainer,
  Text,
  IconWrapper,
} from "./Navigation.styled";

// eslint-disable-next-line react/prop-types
const Navigation = ({ viewCurrency }) => {
  const dispatch = useDispatch();
  return (
    <Media
      queries={{
        small: "(max-width: 767px)",
        large: "(min-width: 768px)",
      }}
    >
      {(matches) => (
        <NavContainer viewCurrency={viewCurrency}>
          {matches.small && (
            <>
              <NavButton
                to="/home"
                onClick={() => {
                  dispatch(toggleCurrencyView(false));
                }}
              >
                <IconWrapper>
                  <Icon id={"#icon-home-mobile"} width={38} height={38} />
                </IconWrapper>
                <Text>Home</Text>
              </NavButton>
              <NavButton
                to="/diagram"
                onClick={() => {
                  dispatch(toggleCurrencyView(false));
                }}
              >
                <IconWrapper>
                  <Icon id={"#icon-statistics"} width={38} height={38} />
                </IconWrapper>
                <Text>Statistic</Text>
              </NavButton>

              <NavButton
                to="/home"
                onClick={() => {
                  dispatch(toggleCurrencyView(true));
                }}
              >
                <IconWrapper>
                  <Icon id={"#icon-currency-mobile"} width={38} height={38} />
                </IconWrapper>
              </NavButton>
            </>
          )}
          {matches.large && (
            <>
              <NavButton
                to="/home"
                onClick={() => {
                  dispatch(toggleCurrencyView(false));
                }}
              >
                <IconWrapper>
                  <Icon id={"#icon-home-mobile"} width={18} height={18} />
                </IconWrapper>
                <Text>Home</Text>
              </NavButton>
              <NavButton
                to="/diagram"
                onClick={() => {
                  dispatch(toggleCurrencyView(false));
                }}
              >
                <IconWrapper>
                  <Icon id={"#icon-statistics"} width={18} height={18} />
                </IconWrapper>
                <Text>Statistic</Text>
              </NavButton>
            </>
          )}
        </NavContainer>
      )}
    </Media>
  );
};

export default Navigation;
