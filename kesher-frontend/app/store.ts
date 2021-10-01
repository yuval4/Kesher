import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "../features/report/report-slice";
import userReducer from "../features/user/user-slice";

export const store = configureStore({
    reducer: {
        report: reportReducer,
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
