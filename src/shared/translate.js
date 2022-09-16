import { Component } from "react";

class Translate extends Component {

    render() {
        const { component: AppComponent } = this.props;
        return <AppComponent {...this.props} />;
    }


}
export default Translate;