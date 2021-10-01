import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportState {
    child_id?: string;
    name?: { first: string; last: string };
    profilePic?: string;
    category?: string;
    subCategories?: string[];
}

const initialState: ReportState = {};

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        updateChild(state, action: PayloadAction<ReportState>) {
            state.child_id = action.payload.child_id;
            state.name = action.payload.name;
            state.profilePic = action.payload.profilePic;
        },
        updateCategory(state, action: PayloadAction<ReportState>) {
            state.category = action.payload.category;
        },
        updateSubCategories(state, action: PayloadAction<ReportState>) {
            state.subCategories = action.payload.subCategories;
        },
        resetReport(state) {
            state = {};
        },
    },
});

export const { resetReport, updateCategory, updateChild, updateSubCategories } =
    reportSlice.actions;

export default reportSlice.reducer;
