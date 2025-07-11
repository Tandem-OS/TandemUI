import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Tokens {
  access: string | null;
  refresh: string | null;
}

interface User {
  id: string | null;
  email: string | null;
}

interface AuthState {
  tokens: Tokens;
  user: User;
  loginTime: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  tokens: {
    access: null,
    refresh: null,
  },
  user: {
    id: null,
    email: null,
  },
  loginTime: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        access_token?: string;
        refresh_token?: string;
        login_time?: string;
        user?: {
          id?: string;
          email?: string;
        };
      }>
    ) => {
      state.tokens.access = action.payload.access_token ?? null;
      state.tokens.refresh = action.payload.refresh_token ?? null;
      state.user.id = action.payload.user?.id ?? null;
      state.user.email = action.payload.user?.email ?? null;
      state.loginTime = action.payload.login_time ?? null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.tokens = { access: null, refresh: null };
      state.user = { id: null, email: null };
      state.loginTime = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
