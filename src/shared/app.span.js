import { Component } from "react";
class AppSpan extends Component {
    render() {
        return <span {...this.props}>{this.props.children}</span>
    }
}
export default AppSpan;