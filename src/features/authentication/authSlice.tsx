import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Tokens {
  access: string | null;
  refresh: string | null;
}

interface User {
  id: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  designerId: string | null;
  designerEmail: string | null;
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
    name: null,
    role: null,
    designerId: null,
    designerEmail: null,
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
          name?: string
          role?: string;
          designerId?: string| null;
          designerEmail?: string | null;
        };
      }>
    ) => {
      state.tokens.access = action.payload.access_token ?? null;
      state.tokens.refresh = action.payload.refresh_token ?? null;
      state.user.id = action.payload.user?.id ?? null;
      state.user.email = action.payload.user?.email ?? null;
      state.user.name = action.payload.user?.name ?? null;
      state.user.role = action.payload.user?.role ?? null;

      // Only for clients with linked designers
      state.user.designerId = action.payload.user?.designerId ?? null;
      state.user.designerEmail = action.payload.user?.designerEmail ?? null;

      state.loginTime = action.payload.login_time ?? null;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.tokens = { access: null, refresh: null };
      state.user = {
        id: null,
        email: null,
        name: null,
        role: null,
        designerId: null,
        designerEmail: null,
      };
      state.loginTime = null;
      state.isAuthenticated = false;
    },
    updateTokens: (
      state,
      action: PayloadAction<{
        access_token?: string;
        refresh_token?: string;
      }>
    ) => {
      if (action.payload.access_token !== undefined) {
        state.tokens.access = action.payload.access_token;
      }
      if (action.payload.refresh_token !== undefined) {
        state.tokens.refresh = action.payload.refresh_token;
      }
    }
  },
});

export const { setAuth, logout, updateTokens } = authSlice.actions;
export default authSlice.reducer;
