import { fetchMenuItems, fetchScreenPermissions } from "../components/toolbar.component/api";
const PER_HANDLE_PERMISSIONS = "perHandlePermissions";
const UPDATE_CURRENTSCREEN = "updateCurrentScreen";
const UPDATE_ACCESSDENIED = "updateAccessDenied";
const CLEAR_PERMISSIONS = "clearPermissions";
const perHandlePermissions = (payload) => {
    return {
        type: PER_HANDLE_PERMISSIONS,
        payload
    }
}
const updateCurrentScreen = (payload) => {
    return {
        type: UPDATE_CURRENTSCREEN,
        payload
    }
}
const updateAccessDenied = (payload) => {
    return {
        type: UPDATE_ACCESSDENIED,
        payload
    }
}
const clearPermissions = (payload) => {
    return {
        type: CLEAR_PERMISSIONS,
        payload: null
    }
}
const getPermissions = ({ memId, perKey }) => {
    return async dispatch => {
        dispatch(perHandlePermissions({ key: "", data: [], loading: true }));
        const response = await fetchScreenPermissions({ memId, perKey });
        let _sreenPermissions = []
        if (response.ok) {

            for (let key in response.data) {
                if (!["id", "screenName", "permissionKey", "recordStatus", "featureId", "appId", "recorder", "modifiedBy", "createdBy"].includes(key)) {
                    if (key === "actions") {
                        if (response.data.actions) {
                            for (let action of response.data.actions) {
                                _sreenPermissions.push({ key: action.permissionName, value: action.values, isAction: true })
                            }
                        }
                    } else {
                        _sreenPermissions.push({ key, value: response.data[key], isAction: false })
                    }
                }
            }
            dispatch(perHandlePermissions({ key: perKey, data: _sreenPermissions, loading: false, currentScreen: response.data?.permissionKey }))
        } else {
            dispatch(perHandlePermissions({ key: perKey, data: _sreenPermissions, loading: false, error: response.data, currentScreen: "dashboard" }))
        }
    }
}
const getFeatures = (memId) => {
    return async dispatch => {
        dispatch(perHandlePermissions({ key: "menuItems", data: [], loading: false }));
        const response = await fetchMenuItems(memId);
        if (response.ok) {
            dispatch(perHandlePermissions({ key: "menuItems", data: response.data, loading: false }));
        } else {
            dispatch(perHandlePermissions({ key: "menuItems", data: [], loading: false }));
        }
    }
}
const initialState = {
    loading: true,
    currentScreen: "dashboard",
    accessDenied: false
}
const permissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PER_HANDLE_PERMISSIONS:
            state = { ...state, [action.payload.key]: action.payload.data, loading: action.payload.loading, currentScreen: action.payload?.currentScreen || state.currentScreen };
            return state;
        case UPDATE_CURRENTSCREEN:
            state = { ...state, currentScreen: action.payload || state.currentScreen };
            return state;
        case UPDATE_ACCESSDENIED:
            return { ...state, accessDenied: action.payload };
        case CLEAR_PERMISSIONS:
            return { loading: false, currentScreen: "dashboard", accessDenied: false, menuItems: [...state?.menuItems] }
        default:
            return state;
    }
}
export { getPermissions, getFeatures, updateCurrentScreen, updateAccessDenied, clearPermissions }
export default permissionsReducer;