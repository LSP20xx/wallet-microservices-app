
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBlockchainById = createAsyncThunk('blockchain/getById', async (id) => {
  const response = await axios.get('/blockchain/:id');
  return response.data;
});

export const createBlockchain = createAsyncThunk('blockchain/create', async (blockchainData) => {
  const response = await axios.post('/blockchain', blockchainData);
  return response.data;
});

export const updateBlockchain = createAsyncThunk('blockchain/update', async ({ id, blockchainData }) => {
  const response = await axios.put('/blockchain/:id', blockchainData);
  return response.data;
});

export const deleteBlockchain = createAsyncThunk('blockchain/delete', async (id) => {
  await axios.delete('/blockchain/:id');
  return id;
});

export const listBlockchains = createAsyncThunk('blockchain/list', async () => {
  const response = await axios.get('/blockchain');
  return response.data;
});

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState: {
    blockchains: [],
    blockchain: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlockchainById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlockchainById.fulfilled, (state, action) => {
        state.loading = false;
        state.blockchain = action.payload;
      })
      .addCase(getBlockchainById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBlockchain.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlockchain.fulfilled, (state, action) => {
        state.loading = false;
        state.blockchains.push(action.payload);
      })
      .addCase(createBlockchain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlockchain.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlockchain.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blockchains.findIndex(blockchain => blockchain._id === action.payload._id);
        if (index !== -1) {
          state.blockchains[index] = action.payload;
        }
      })
      .addCase(updateBlockchain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlockchain.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlockchain.fulfilled, (state, action) => {
        state.loading = false;
        state.blockchains = state.blockchains.filter(blockchain => blockchain._id !== action.payload);
      })
      .addCase(deleteBlockchain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listBlockchains.pending, (state) => {
        state.loading = true;
      })
      .addCase(listBlockchains.fulfilled, (state, action) => {
        state.loading = false;
        state.blockchains = action.payload;
      })
      .addCase(listBlockchains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blockchainSlice.reducer;
