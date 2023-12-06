export const selectTransactions = (state) => state.transactions.transactions;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;
export const selectTransactionsCategories = (state) =>
  state.transactions.categories;
export const selectTransactionId = (state) => state.transactions.selectedId;