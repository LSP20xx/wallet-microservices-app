
export const selectBlockchainState = (state) => state.blockchain;
export const selectAllBlockchains = (state) => state.blockchain.blockchains;
export const selectBlockchainById = (state, id) => state.blockchain.blockchains.find(blockchain => blockchain._id === id);
export const selectBlockchainLoading = (state) => state.blockchain.loading;
export const selectBlockchainError = (state) => state.blockchain.error;
