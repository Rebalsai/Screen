import { Form } from "antd";
import { Component } from "react";

class AppForm extends Component {

    render() {
        return <Form layout="vertical" {...this.props} >
            {this.props.children}
        </Form>
    }
}

export default AppForm;