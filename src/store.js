import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from "./modules/partner/auth/authSlice";
import overviewReducer from "./modules/partner/overview/overviewSlice";
import funnelReducer from "./pages/funnel/funnelSlice";

export const store = configureStore({
    reducer: {auth: AuthReducer, overview: overviewReducer, funnel: funnelReducer},
})