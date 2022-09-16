import { clientApi} from "./clients"
import{ApiControllers} from './config';

 const getMember = (useremail) => {
   return clientApi.get(ApiControllers.accounts + '/' + useremail);
}
const getCommision = (id) => {
  return clientApi.get(ApiControllers.commissions + `/Crypto/${id}`)
}
const getZoneLu=()=>{
  return clientApi.get(ApiControllers.commissions + "/Crypto/Zones")
}
// const saveCommission = (obj)=>{
//   return clientApi.post(ApiControllers.commissions + "Crypto",obj)
// }
// const saveCommission = (obj, id) => {
//   return id == "00000000-0000-0000-0000-000000000000" ? clientApi.post(ApiControllers.banks + "commissions", obj) : clientApi.put(ApiControllers.commissions + `${id}`, obj);
// }
const saveCommission=(obj)=>{
  return clientApi.post(ApiControllers.commissions + "/Crypto",obj)
}
export {getMember,getCommision,getZoneLu,saveCommission}
 