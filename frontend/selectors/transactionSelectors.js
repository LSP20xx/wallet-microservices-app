
export const selectTransactionState = (state) => state.transaction;
export const selectAllTransactions = (state) => state.transaction.transactions;
export const selectTransactionById = (state, id) => state.transaction.transactions.find(transaction => transaction._id === id);
export const selectTransactionLoading = (state) => state.transaction.loading;
export const selectTransactionError = (state) => state.transaction.error;
