import React, { Component } from "react";
import GridList from "../grid.component";
class User extends Component{
    constructor(props){      
        super()
        this.state={
         Selection:[],
        gridurl:process.env.REACT_APP_GRID_API+`Security/Users`,     
         
        }

    }
    gridColumn=[
        
        {
            
            field:"",
            title:"",
            width:50
        },
        {
            field:"firstName",
            title:"First Name",
            width:250
        },
        {
            field:"lastName",
            title:"Last Name",
            width:250
        },
        {
            field:"userName",
            title:"userName",
            width:250
        },
        {
            field:"email",
            title:"email",
            width:250
        },
        {
            field:"roleName",
            title:"RoleName",
            width:250
        },
        {
            field:"status",
            title:"status",
            width:250
        },
    ]
    render(){
        return(
            <>
            <h1>Welcome to User Screen</h1>
            <GridList            
             columns={this.state.gridColumn}
             url={this.state.gridurl}             
             />             
            </>
        )
    }
}
export default User;