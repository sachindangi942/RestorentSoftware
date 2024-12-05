import { configureStore } from "@reduxjs/toolkit";
// import AlerScliceReducer  from "./AlertSclice";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Fetures/Authslice"
// import productlistReducer from "./Fetures/ProductList_slice"
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"; 


const rootReducer = combineReducers({
   auth: authReducer,
  
});
const persistConfig ={
    key: "root", 
    storage,
  };

const persistreducer = persistReducer(persistConfig,rootReducer);

const Store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
      }),

    devTools: true,

});



//  const Store =configureStore({
//     reducer:{
//         alert:AlerScliceReducer
//     }
// });

export default Store;
export const persistor = persistStore(Store);