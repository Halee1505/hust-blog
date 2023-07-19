import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "@/models/admin.model";

const userStore = createSlice({
  name: "userStore",
  initialState: {} as Admin,
  reducers: {
    fetchProfile: (state, action: PayloadAction<Admin>) => {
      return action.payload;
    },
    clear: (state) => {
      return {} as Admin;
    },
  },
});

export default userStore;
