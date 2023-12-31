import HomeTab from "../../components/HomeTab/HomeTab";
import Navigation from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import { LoadSpinner } from "../../components/LoadSpinner/LoadSpinner";
import { ButtonAddTransaction } from "../../components/ButtonAddTransactions/ButtonAddTransaction";
import ModalAddTransaction from "../../components/ModalAddTransactions/ModalAddTransaction";
// import Eli1 from 'images/Ellipse1.png'

// redux/react
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";

import globalSelectors from "../../redux/global/global-selectors";

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

import { useAuth } from "../../hooks/userAuth";
import { fetchAllTransactions } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/transactions/categories";

export default function Dashboard() {
  const { balance, isRefresh } = useAuth();
  const dispatch = useDispatch();

  const viewCurrency = useSelector(globalSelectors.getIsCurrencyView);

  const isModalAddTransactionOpen = useSelector(
    globalSelectors.getIsModalAddTransaction
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const responce = await fetchCategories();
      if (responce) {
        setCategories(responce);
      }
    };
    loadCategories();
    // fetchCategories().then((responce) => {
    //   const data = responce.json();
    //   console.log("categories", data);
    // });
  }, []);

  useEffect(() => {
    dispatch(fetchAllTransactions());
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
  const LOADING = isRefresh === true;

  return (
    <DashboardContainer>
      {LOADING && (
        <InfoContainer>
          <LoadSpinner />
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
          <ButtonAddTransaction />
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
