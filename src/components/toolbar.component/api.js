import { clientApi } from "../../api/clients"
import { ApiControllers } from "../../api/config"


const fetchScreenPermissions = ({ memId, perKey }) => {
    return clientApi.get(ApiControllers.security + `Toolbar/${memId}/${perKey}`);
}
const fetchMenuItems = (AccounId) => {
    return clientApi.get(ApiControllers.security + `Features/${process.env.REACT_APP_APP_ID}/${AccounId}`);
}

export { fetchScreenPermissions, fetchMenuItems }