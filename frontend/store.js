
import { configureStore } from '@reduxjs/toolkit';
// Import reducers
import blockchainReducer from './slices/blockchainSlice';
import walletReducer from './slices/walletSlice';
import transactionReducer from './slices/transactionSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    blockchain: blockchainReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;
