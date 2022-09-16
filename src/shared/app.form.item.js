import { Form } from "antd";
import { Component } from "react";

class AppFormItem extends Component {

    render() {
        return <Form.Item {...this.props}>
            {this.props.children}
        </Form.Item>
    }
}

export default AppFormItem;