import { Select } from "antd";
import { Component } from "react";

class AppDropdown extends Component {

    render() {
        const { data = [], valueField, textField, placeholder } = this.props
        return <Select showSearch {...this.props} placeholder={placeholder || "Please select an option"}>
            {data?.map(item => <Select.Option value={item[valueField]}>{item[textField]}</Select.Option>)}
        </Select>
    }
}
export default AppDropdown;