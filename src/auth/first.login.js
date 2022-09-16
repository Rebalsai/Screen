import { Component } from "react";
import AppButton from "../shared/app.button";
import AppForm from "../shared/app.form";
import AppFormItem from "../shared/app.form.item";
import AppIput from "../shared/inputs/app.input";
class UserFirstLogin extends Component {

    render() {
        return <div className="wrapper">
            <h1 className="main-heading">New User</h1>
            <p className="sub-text">Please input few details</p>
            <div className="form-wrapper">
                <AppForm onFinish={(values)=>{console.log(values)}} name="details" initialObj={{ companyname: "", email: "", address: "" }}>
                    <AppFormItem name="companyname" label="Company Name">
                        <AppIput  />
                    </AppFormItem>
                    <AppFormItem name="email" label="Email" >
                        <AppIput  />
                    </AppFormItem>
                    <AppFormItem name="address" label="Address">
                        <AppIput  />
                    </AppFormItem>
                    <AppFormItem >
                        <AppButton className="main-button" htmlType="submit">
                            Submit
                        </AppButton>
                    </AppFormItem>
                </AppForm>
            </div></div>
    }
}
export default UserFirstLogin