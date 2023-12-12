import HomeTab from "../../components/HomeTab/HomeTab";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import Loader from "../../components/LoadSpinner/LoadSpinner";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransaction";
import ModalAddTransaction from "../../components/ModalAddTransactions/ModalAddTransaction";
// import Eli1 from 'images/Ellipse1.png'

// redux/react
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";

import globalSelectors from "redux/global/global-selectors";

import financeOperations from "../../redux/finance/finance-operations";
import { toggleCurrencyView } from "../../redux/slices/global-slice";

// import styled components
import {
  CurrencyWrapper,
  DashboardContainer,
  DashboardWrapper,
  HomeInfo,
  NavBalWrapper,
  InfoContainer,
  // Elips1,
} from "./Dashboard.styled";

import financeSelectors from "redux/finance/finance-selectors";

export default function Dashboard() {
  const dispatch = useDispatch();
  const viewCurrency = useSelector(globalSelectors.getIsCurrencyView);

  const isLoading = useSelector(globalSelectors.getIsLoading);
  const isModalAddTransactionOpen = useSelector(
    globalSelectors.getIsModalAddTransaction
  );

  const balance = useSelector(financeSelectors.getTotalBalance);

  useEffect(() => {
    dispatch(financeOperations.refreshTransactions());
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, balance]);

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      dispatch(toggleCurrencyView(false));
    }
  });

  const VIEW_CURRENCY = viewCurrency === true;
  const VIEW_HOME = viewCurrency === false;
  const LOADING = isLoading === true;

  return (
    <DashboardContainer>
      {LOADING && (
        <InfoContainer>
          <Loader />
        </InfoContainer>
      )}

      {!LOADING && VIEW_HOME && (
        <DashboardWrapper>
          <HomeInfo>
            <NavBalWrapper>
              <Navigation
                // setViewCurrency={setViewCurrency}
                viewCurrency={viewCurrency}
              />
              <Balance />
            </NavBalWrapper>
            <CurrencyWrapper>
              <Currency />
            </CurrencyWrapper>
          </HomeInfo>
          <HomeTab />
          <ButtonAddTransactions />
          {/* <Elips1 src={Eli1} /> */}
        </DashboardWrapper>
      )}

      {!LOADING && VIEW_CURRENCY && (
        <DashboardWrapper>
          <Navigation
            // setViewCurrency={setViewCurrency}
            viewCurrency={viewCurrency}
          />
          <Currency />
        </DashboardWrapper>
      )}

      {!LOADING && isModalAddTransactionOpen && <ModalAddTransaction />}
    </DashboardContainer>
  );
}
