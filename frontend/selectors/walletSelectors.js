
export const selectWalletState = (state) => state.wallet;
export const selectAllWallets = (state) => state.wallet.wallets;
export const selectWalletById = (state, id) => state.wallet.wallets.find(wallet => wallet._id === id);
export const selectWalletLoading = (state) => state.wallet.loading;
export const selectWalletError = (state) => state.wallet.error;
