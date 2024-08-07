
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWalletById = createAsyncThunk('wallet/getById', async (id) => {
  const response = await axios.get('/wallet/:id');
  return response.data;
});

export const createWallet = createAsyncThunk('wallet/create', async (walletData) => {
  const response = await axios.post('/wallet', walletData);
  return response.data;
});

export const updateWallet = createAsyncThunk('wallet/update', async ({ id, walletData }) => {
  const response = await axios.put('/wallet/:id', walletData);
  return response.data;
});

export const deleteWallet = createAsyncThunk('wallet/delete', async (id) => {
  await axios.delete('/wallet/:id');
  return id;
});

export const listWallets = createAsyncThunk('wallet/list', async () => {
  const response = await axios.get('/wallet');
  return response.data;
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallets: [],
    wallet: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWalletById.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(getWalletById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets.push(action.payload);
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.wallets.findIndex(wallet => wallet._id === action.payload._id);
        if (index !== -1) {
          state.wallets[index] = action.payload;
        }
      })
      .addCase(updateWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = state.wallets.filter(wallet => wallet._id !== action.payload);
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listWallets.pending, (state) => {
        state.loading = true;
      })
      .addCase(listWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = action.payload;
      })
      .addCase(listWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default walletSlice.reducer;
