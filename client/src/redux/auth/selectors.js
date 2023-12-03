export const selectUser = (state) => {
  return state.auth.user;
};
export const selectToken = (state) => {
  return state.auth.token;
};
export const selectBalance = (state) => {
  return state.auth.balance;
};

export const selectIsAuth = (state) => {
  return state.auth.isAuth;
};
export const selectIsRefresh = (state) => {
  return state.auth.isRefresh;
};
