import { Component } from "react";
class AppLabel extends Component {
    render() {
        return <label {...this.props}>{this.props.children}</label>
    }
}
export default AppLabel;