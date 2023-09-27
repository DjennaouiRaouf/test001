import { configureStore } from '@reduxjs/toolkit';

import EditPlatReducer from "../slices/EditPlatSlice";
export default configureStore({
    reducer: {
        editplat:EditPlatReducer,
    },
});
