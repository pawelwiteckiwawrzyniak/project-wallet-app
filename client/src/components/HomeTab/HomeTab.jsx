// react/redux
import { useState } from "react";

// components
import Spinner from "components/Loader/Loader";

// styled components
import { useDispatch, useSelector } from "react-redux";
import financeSelectors from "redux/transactions/selectors";
import financeOperations from "redux/finance/finance-operations";

import {
  LineSide,
  Transaction,
  Transactions,
  TransactionField,
  Data,
  Text,
  TransactionHead,
  HeadRow,
  HeadItem,
  DataWrapper,
  InfoContainer,
  LoadButton,
  LoaderWrapper,
} from "./HomeTab.styled";

const HomeTab = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(financeSelectors.getCurrentTransactions); // redux state => state.finance.data
  const loading = useSelector(financeSelectors.getLoadingStaus);

  const [previousLoading, setPreviousLoading] = useState(false);

  const nextPage = useSelector(financeSelectors.getPage);
  const limit = useSelector(financeSelectors.getLimit);
  const totalPages = useSelector(financeSelectors.getTotalPages);

  const handleClick = async (e) => {
    e.preventDefault();
    setPreviousLoading(true);
    await dispatch(
      financeOperations.getCurrentTransactions({
        page: nextPage,
        limit: limit,
      })
    );
    setPreviousLoading(false);
  };

  const LOADING = loading === true;
  const NO_TRANSACTIONS = transactions.length === 0;
  const VIEW_BUTTON = totalPages >= nextPage;

  return (
    <Transactions>
      {LOADING && NO_TRANSACTIONS && (
        <InfoContainer>
          <Spinner />
        </InfoContainer>
      )}
      {!LOADING && NO_TRANSACTIONS && (
        <InfoContainer>
          <h4>
            Your transactions will be displayed here. They dont exist yet...
          </h4>
        </InfoContainer>
      )}
      {!NO_TRANSACTIONS && (
        <table>
          <TransactionHead>
            <HeadRow>
              <HeadItem>Date</HeadItem>
              <HeadItem>Type</HeadItem>
              <HeadItem>Category</HeadItem>
              <HeadItem>Comment</HeadItem>
              <HeadItem>Sum</HeadItem>
              <HeadItem>Balance</HeadItem>
            </HeadRow>
          </TransactionHead>
          {transactions.map(
            ({ _id, date, type, category, comment, amount, balance }) => {
              const color = type === false ? "#ff6596" : "#24cca7";
              const parseDate = date.split("T");
              const typeValid = type === true ? "+" : "-";
              const amountString = amount?.toString();
              const balanceString = balance?.toString();
              return (
                <Transaction key={_id}>
                  <TransactionField>
                    <LineSide color={color} />
                    <Text>Date</Text>
                    <DataWrapper>
                      <Data text={parseDate[0]} length={20} />
                    </DataWrapper>
                  </TransactionField>
                  <TransactionField>
                    <LineSide color={color} />
                    <Text>Type</Text>
                    <DataWrapper>
                      <Data text={typeValid} length={1} />
                    </DataWrapper>
                  </TransactionField>
                  <TransactionField>
                    <LineSide color={color} />
                    <Text>Category</Text>
                    <DataWrapper>
                      <Data text={category} length={15} />
                    </DataWrapper>
                  </TransactionField>
                  <TransactionField>
                    <LineSide color={color} />
                    <Text>Comment</Text>
                    <DataWrapper>
                      <Data text={comment} length={20} />
                    </DataWrapper>
                  </TransactionField>
                  <TransactionField>
                    <LineSide color={color} />
                    <Text>Sum</Text>
                    <DataWrapper>
                      <Data color={color} text={amountString} length={10} />
                    </DataWrapper>
                  </TransactionField>
                  <TransactionField>
                    <LineSide color={color} />
                    <Text>Balance</Text>
                    <DataWrapper>
                      <Data text={balanceString} length={12} />
                    </DataWrapper>
                  </TransactionField>
                </Transaction>
              );
            }
          )}
        </table>
      )}
      {VIEW_BUTTON && LOADING && !NO_TRANSACTIONS && previousLoading && (
        <LoaderWrapper>
          <Spinner />
        </LoaderWrapper>
      )}
      {VIEW_BUTTON && !LOADING && !previousLoading && (
        <LoadButton type="button" onClick={handleClick}>
          Load previous
        </LoadButton>
      )}
    </Transactions>
  );
};

export default HomeTab;
