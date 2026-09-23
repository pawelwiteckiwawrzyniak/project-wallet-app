const getIsModalAddTransaction = (state) =>
  state.global.isModalAddTransactionOpen;
const getIsModalLogout = (state) => state.global.isModalLogoutOpen;
const getIsLoading = (state) => state.global.isLoading;
const getIsCurrencyView = (state) => state.global.isCurrencyView;

const globalSelectors = {
  getIsModalAddTransaction,
  getIsModalLogout,
  getIsLoading,
  getIsCurrencyView,
};

export default globalSelectors;
