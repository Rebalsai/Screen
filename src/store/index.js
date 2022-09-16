import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import UserConfig from '../reducers/configReduser';
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
}
const rootReducer = combineReducers({
    auth: authReducer,
    userConfig: UserConfig,

});
const reducer = persistReducer(persistConfig, rootReducer)
let store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export { store, persistor }