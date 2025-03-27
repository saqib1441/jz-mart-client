import { ApiResponse, AuthState, UserData } from "@/lib/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
const initialState: AuthState = {
  loading: false,
  error: null,
  tempData: null,
  data: null,
  isLoggedIn: false,
};

const BASE_URL = "http://localhost:5000/api/user";

// Async thunk for sending OTP
export const sendOtp = createAsyncThunk<
  ApiResponse,
  UserData | null,
  { rejectValue: ApiResponse }
>("auth/sendOtp", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      return rejectWithValue(errorData);
    }

    return (await response.json()) as ApiResponse;
  } catch (error: unknown) {
    return rejectWithValue({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Async thunk for registering user
export const registerUser = createAsyncThunk<
  ApiResponse,
  UserData | null,
  { rejectValue: ApiResponse }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      return rejectWithValue(errorData);
    }

    return (await response.json()) as ApiResponse;
  } catch (error: unknown) {
    return rejectWithValue({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Async thunk for logging out user
export const loginUser = createAsyncThunk<
  ApiResponse,
  UserData,
  { rejectValue: ApiResponse }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      return rejectWithValue(errorData);
    }

    return (await response.json()) as ApiResponse;
  } catch (error: unknown) {
    return rejectWithValue({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Async thunk for logging out user
export const logoutUser = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: ApiResponse }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/logout`);

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      return rejectWithValue(errorData);
    }

    return (await response.json()) as ApiResponse;
  } catch (error: unknown) {
    return rejectWithValue({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling send OTP
      .addCase(sendOtp.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.tempData = action.meta.arg;
      })
      .addCase(
        sendOtp.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          if (!action.payload.success) {
            state.error = action.payload.message;
          }
        }
      )
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send OTP";
      })

      // Handling register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          if (!action.payload.success) {
            state.error = action.payload.message;
          } else {
            state.isLoggedIn = true;
            state.data = action.payload.data as UserData;
            state.tempData = null;
          }
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      // Handling Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          if (!action.payload.success) {
            state.error = action.payload.message;
          }
          state.data = action.payload.data as UserData;
          state.isLoggedIn = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      // Handling logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.success) {
          state.error = action.payload.message;
        }
        state.isLoggedIn = false;
        state.data = null;
        state.tempData = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed";
      });
  },
});

// Export reducer
export default authSlice.reducer;
