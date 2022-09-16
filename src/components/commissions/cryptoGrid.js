import React, { Component } from "react";
import GridList from "../grid.component";
import { Button,Radio,Alert} from 'antd';

class Crypto extends Component {
state = {
  selection: [],

      CryptoBankUrl:
        process.env.REACT_APP_GRID_API + `Commissions/Crypto`,
        warningMsg : null 
    }
  

   addCommission = () => {
    this.props.history.push("/commissions/00000000-0000-0000-0000-000000000000/add")  
	};
  // editCommission = () => {
  //   this.props.history.push("/commissions/00000000-0000-0000-0000-000000000000/edit")  
	// };
  editCryptoCommission = (e) => {
    debugger
    if (this.state.selection.length == 0 || this.state.selection.length>1) {
      this.setState({ ...this.state, warningMsg: "Please select one record"})
      return;
    }else{
      this.props.history.push({
        pathname:
          "/commissions/" +
          (this.state.fiat ? "Fiat" : "Crypto") + "/" +
          this.state.selection[0]+"/edit",
        state: { pKey: "commisions", action: "edit" }
      });
    }
   
  }


  gridColumn =  [
    {
        field: "",
        title: "",
        width: 70,
        //customcell means particular cell
        customCell: (props) => (
          <td className="text-center">
              <label className="text-center custom-checkbox">
                  <input
                      name="check"
                      id={props.dataItem.id}
                      type="checkbox"
                      checked={this.state.selection.indexOf(props.dataItem.id) > -1}
                      onChange={(e)=>this.handleInputChange(props,e)}
                  />
                    <span></span>
                </label>
            </td>
        ),

    },
    {
      field: "accountType",
      title: "Account Type",
      filter: true,
      width: 160
    },
    {
      field: "zoneCode",
      title: "Zone",
      filter: true,
      width: 140
    },
    // {
    //   title: "SuisseBase Deposit",
    //   children: [
        {
          field: "dsMaxFee",
          title: "SuisseBase Deposit Fee(%)",
          filter: true,
        //   filterType: "number",
          width: 240
        },
      
    
    // {
    //   title: "SuisseBase Withdraw",
    //   children: [
        {
          field: "wsMaxFee",
          title: "SuisseBase Withdraw Fee(%)",
          filter: true,
        //   filterType: "number",
          width: 240
        },
      
    
    // {
    //   title: "SuisseBase Buy",
    //   children: [
        {
          field: "buySMaxFee",
          title: "SuisseBase Buy Fee(%)",
          filter: true,
        //   filterType: "number",
          width: 240
        },
      
    
    // {
    //   title: "SuisseBase Sell",
    //   children: [
        {
          field: "sellSMaxFee",
          title: "SuisseBase Sell Fee(%)",
          filter: true,
        //   filterType: "number",
          width: 240
        },
        {
          field: "partnerDMaxFee",
          title: "Partner Deposit",
          filter: true,
          width: 240
        },
        {
          field: "partnerWMaxFee",
          title: "Partner Withdraw",
          filter: true,
          width: 240
        },
        {
          field: "partnerBuyMaxFee",
          title: "Partner Buy",
          filter: true,
          width: 240
        },
        {
          field: "partnerSellMaxFee",
          title: "Partner Sell",
          filter: true,
          width: 240
        },
        {
          field: "depositMaxSubPartnerFee",
          title: "Sub Partner Deposit %",
          filter: true,
          width: 240
        },
        {
          field: "withdrawMaxSubPartnerFee",
          title: "Sub Partner Withdraw %",
          filter: true,
          width: 240
        },
        {
          field: "buyMaxSubPartnerFee",
          title: "Sub Partner Buy %",
          filter: true,
          width: 240
        },
        {
          field: "sellMaxSubPartnerFee",
          title: "Sub Partner Sell %",
          filter: true,
          width: 240
        },
      
    
    {
      field: "status",
      title: "Status",
      filter: true,
      width: 150
    }


  ]

//   handleSelection=(props,e)=>{
//     debugger
//     const rowChecked=props.dataItem;
//     const target=e.target.type;
//    const value=target==="checkbox" ? target.checked : target.value;
//    const name=target.name;
//    let {selection}=this.state;
//    let idx=selection.indexOf(rowChecked.id);
//    if(selection){
//     selection=[]
//    }
//    if(idx > -1){
//     selection.splice(idx,1);
//    }
//    else{
//     selection.push(rowChecked.id);
//    }
//    this.setState({[name]:value,selection})
// }
  handleInputChange = (prop, e) => {
    const rowChecked = prop.dataItem;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    let { selection } = this.state;
    let idx = selection.indexOf(rowChecked.id);
    if (selection) {
      selection = [];
    }
    if (idx > -1) {
      selection.splice(idx, 1);
    } else {
      selection.push(rowChecked.id);
    }
    this.setState({
      ...this.state,
      [name]: value,
      selection: selection,
      selectedObj: { status: rowChecked.status },
      warningMsg: null
    });

  };
  render() {
    // destructuring
    const {warningMsg}=this.state
    return (
      <>
      
        {warningMsg !== undefined && warningMsg !== null && (
<Alert
  className="w-100 mb-16"
  type="warning"
  description={warningMsg}
  showIcon
/>
)}
      <Radio.Group
defaultValue={1}
className="buysell-toggle mb-0"
>
<Radio.Button value={1}> Crypto </Radio.Button>
</Radio.Group><br/>
       <Button type="primary" onClick={this.addCommission}>Add</Button>
       &emsp;
       <Button type="primary" onClick={this.editCryptoCommission}>Edit</Button>&emsp;
       <Button>Disable</Button>
        <GridList
          columns={this.gridColumn}
          url={this.state.CryptoBankUrl}
        />
      </>
    );
  }
}
export default Crypto;