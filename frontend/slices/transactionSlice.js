
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTransactionById = createAsyncThunk('transaction/getById', async (id) => {
  const response = await axios.get('/transaction/:id');
  return response.data;
});

export const createTransaction = createAsyncThunk('transaction/create', async (transactionData) => {
  const response = await axios.post('/transaction', transactionData);
  return response.data;
});

export const updateTransaction = createAsyncThunk('transaction/update', async ({ id, transactionData }) => {
  const response = await axios.put('/transaction/:id', transactionData);
  return response.data;
});

export const deleteTransaction = createAsyncThunk('transaction/delete', async (id) => {
  await axios.delete('/transaction/:id');
  return id;
});

export const listTransactions = createAsyncThunk('transaction/list', async () => {
  const response = await axios.get('/transaction');
  return response.data;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(listTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(listTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
