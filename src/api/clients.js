import { create } from 'apisauce'
import { store } from '../store';
import CryptoJS from 'crypto-js'
import { updateAccessDenied } from '../reducers/permissionsReducer'

const clientApi = create({
    baseURL: process.env.REACT_APP_API_END_POINT + '/api/v1/'
})
const clientFormApi = create({
	baseURL: process.env.REACT_APP_API_END_POINT + "/api",
});
const clientGridApi = create({
	baseURL: process.env.REACT_APP_RECONCILE_GRID_API,
});
const reportClient = create({
    baseURL: process.env.REACT_APP_ANALYTICS_API_END_POINT
})
const ipRegistry = create({
    baseURL: 'https://api4.ipregistry.co'
})
const _encrypt = (msg, key) => {

    msg = typeof (msg) == 'object' ? JSON.stringify(msg) : msg;
    var salt = CryptoJS.lib.WordArray.random(128 / 8);

    key = CryptoJS.PBKDF2(key, salt, {
        keySize: 256 / 32,
        iterations: 10
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });
    return salt.toString() + iv.toString() + encrypted.toString();
}
reportClient.axiosInstance.interceptors.request.use((config) => {
    const { oidc: { user } } = store.getState()
    config.headers.Authorization = `Bearer ${user.access_token}`
    return config;
})
const get = clientApi.get;
clientFormApi.axiosInstance.interceptors.request.use((config) => {
	const {
		oidc: { user },
	} = store.getState();
	config.headers.Authorization = `Bearer ${user.access_token}`;
	return config;

});
clientApi.get = async (url) => {
    // const { oidc: { user }, userConfig: { userProfileInfo }, currentAction: { action }, permissions: { currentScreen } } = store.getState()
    const response = await get(url, null, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InhueHNWejMtbjJrOFFLRkFjUXlLc2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NTgxMzU2NzcsImV4cCI6MTY1ODczNTY3NywiaXNzIjoibnVsbCIsImNsaWVudF9pZCI6InN1aXNzZWJhc2UiLCJzdWIiOiIyZTkwZTIxZi1kMzVjLTQxNDMtODVlZi1jZTIxZTkwYzM2YTMiLCJhdXRoX3RpbWUiOjE2NTgxMzUyMDksImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsInVuaXF1ZV9uYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsImVtYWlsIjoiamFtYWxAeW9wbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiKzkxIDc3NTIwMDk0ODIiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwiYW1yIjpbInB3ZCJdfQ.Ejtac_bs_X93urnn_an2iO-E4HmPO-I-5kxWkXuUq--WJsbQxkQ35Z6ofYLdq0C02ywXcdCb9I9Km4WHFDWxP7g3skil54Opctqt32RKWsskhe0_m0I-ymUYTtCxXeBWBLrqKShH_B79zE5QV_uiR0PTNRG4lXR8hHACp4Wihr_GFQjVmUCofQg_yGSl2qc8NWkuEVYwuOuyp52Zhl52RolOl-HJs8sIG3ZwEoiktGXPC17ur2Ue1kxCtrs25K_J3Z9dnskjelWDQO0BKZ54Go-ft_2PlsaXQLX4xkMt86ehyVYjPN5-zZewT-MaH8UbKgEAar-9EBM6oXUcxlmFHQ`,
            AuthInformation: '5eab9606d1ee3b8ade84e36f46491e12eb2751c61c04cec6468502bc05678e6emFKPomxlBw1T6pc3Jdcs5Xqq0VSEBsXYdMIAg2oUBrLHIJxz0gmPIH0oqT4Ebb6KkYOk1nctI5HPwSCLOClKJ0djbKPLGohfW36OTs9FtD3G329sF0KdbHdrjCGusqSZ'
        }
    })
    if (response.status === 401) {
        store.dispatch(updateAccessDenied(true))
    } else {
        store.dispatch(updateAccessDenied(false))
    }
    return response;
}
const post = clientApi.post;
clientApi.post = async (url, params) => {
    //const { oidc: { user }, userConfig: { userProfileInfo }, currentAction: { action }, permissions: { currentScreen } } = store.getState()
    const response = await post(url, params,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InhueHNWejMtbjJrOFFLRkFjUXlLc2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NTgxMzU2NzcsImV4cCI6MTY1ODczNTY3NywiaXNzIjoibnVsbCIsImNsaWVudF9pZCI6InN1aXNzZWJhc2UiLCJzdWIiOiIyZTkwZTIxZi1kMzVjLTQxNDMtODVlZi1jZTIxZTkwYzM2YTMiLCJhdXRoX3RpbWUiOjE2NTgxMzUyMDksImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsInVuaXF1ZV9uYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsImVtYWlsIjoiamFtYWxAeW9wbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiKzkxIDc3NTIwMDk0ODIiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwiYW1yIjpbInB3ZCJdfQ.Ejtac_bs_X93urnn_an2iO-E4HmPO-I-5kxWkXuUq--WJsbQxkQ35Z6ofYLdq0C02ywXcdCb9I9Km4WHFDWxP7g3skil54Opctqt32RKWsskhe0_m0I-ymUYTtCxXeBWBLrqKShH_B79zE5QV_uiR0PTNRG4lXR8hHACp4Wihr_GFQjVmUCofQg_yGSl2qc8NWkuEVYwuOuyp52Zhl52RolOl-HJs8sIG3ZwEoiktGXPC17ur2Ue1kxCtrs25K_J3Z9dnskjelWDQO0BKZ54Go-ft_2PlsaXQLX4xkMt86ehyVYjPN5-zZewT-MaH8UbKgEAar-9EBM6oXUcxlmFHQ`,
                AuthInformation: '5eab9606d1ee3b8ade84e36f46491e12eb2751c61c04cec6468502bc05678e6emFKPomxlBw1T6pc3Jdcs5Xqq0VSEBsXYdMIAg2oUBrLHIJxz0gmPIH0oqT4Ebb6KkYOk1nctI5HPwSCLOClKJ0djbKPLGohfW36OTs9FtD3G329sF0KdbHdrjCGusqSZ'
            }
        });
    if (response.status === 401) {
        store.dispatch(updateAccessDenied(true))
    } else {
        store.dispatch(updateAccessDenied(false))
    }
    return response;
}
const put = clientApi.put;
clientApi.put = async (url, params) => {
  //  const { oidc: { user }, userConfig: { userProfileInfo }, currentAction: { action }, permissions: { currentScreen } } = store.getState()
    const response = await put(url, params,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InhueHNWejMtbjJrOFFLRkFjUXlLc2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NTgxMzU2NzcsImV4cCI6MTY1ODczNTY3NywiaXNzIjoibnVsbCIsImNsaWVudF9pZCI6InN1aXNzZWJhc2UiLCJzdWIiOiIyZTkwZTIxZi1kMzVjLTQxNDMtODVlZi1jZTIxZTkwYzM2YTMiLCJhdXRoX3RpbWUiOjE2NTgxMzUyMDksImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsInVuaXF1ZV9uYW1lIjoiamFtYWxAc3Vpc3NlYmFzZS5jaCIsImVtYWlsIjoiamFtYWxAeW9wbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiKzkxIDc3NTIwMDk0ODIiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwiYW1yIjpbInB3ZCJdfQ.Ejtac_bs_X93urnn_an2iO-E4HmPO-I-5kxWkXuUq--WJsbQxkQ35Z6ofYLdq0C02ywXcdCb9I9Km4WHFDWxP7g3skil54Opctqt32RKWsskhe0_m0I-ymUYTtCxXeBWBLrqKShH_B79zE5QV_uiR0PTNRG4lXR8hHACp4Wihr_GFQjVmUCofQg_yGSl2qc8NWkuEVYwuOuyp52Zhl52RolOl-HJs8sIG3ZwEoiktGXPC17ur2Ue1kxCtrs25K_J3Z9dnskjelWDQO0BKZ54Go-ft_2PlsaXQLX4xkMt86ehyVYjPN5-zZewT-MaH8UbKgEAar-9EBM6oXUcxlmFHQ`,
                AuthInformation: '5eab9606d1ee3b8ade84e36f46491e12eb2751c61c04cec6468502bc05678e6emFKPomxlBw1T6pc3Jdcs5Xqq0VSEBsXYdMIAg2oUBrLHIJxz0gmPIH0oqT4Ebb6KkYOk1nctI5HPwSCLOClKJ0djbKPLGohfW36OTs9FtD3G329sF0KdbHdrjCGusqSZ'
            }
        });
    if (response.status === 401) {
        store.dispatch(updateAccessDenied(true))
    } else {
        store.dispatch(updateAccessDenied(false))
    }
    return response;
}
const delete1 = clientApi.delete;
clientApi.delete = async (url, params) => {
    const { oidc: { user }, userConfig: { userProfileInfo }, currentAction: { action }, permissions: { currentScreen } } = store.getState()
    const response = await delete1(url, params,
        {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                AuthInformation: userProfileInfo?.id ? _encrypt(`{MemberId:"${userProfileInfo?.id}",Action:"${action || 'view'}", PermissionKey:"${currentScreen}"}`, userProfileInfo.sk) : ''
            }
        });
    if (response.status === 401) {
        store.dispatch(updateAccessDenied(true))
    } else {
        store.dispatch(updateAccessDenied(false))
    }
    return response;
}
export { clientApi, reportClient, ipRegistry,clientFormApi,clientGridApi }