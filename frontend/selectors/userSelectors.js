
export const selectUserState = (state) => state.user;
export const selectAllUsers = (state) => state.user.users;
export const selectUserById = (state, id) => state.user.users.find(user => user._id === id);
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
