
export const selectOrderState = (state) => state.order;
export const selectAllOrders = (state) => state.order.orders;
export const selectOrderById = (state, id) => state.order.orders.find(order => order._id === id);
export const selectOrderLoading = (state) => state.order.loading;
export const selectOrderError = (state) => state.order.error;
