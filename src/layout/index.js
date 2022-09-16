import { Layout } from 'antd';
import { Component } from 'react'
import AppContent from './content';
import AppFooter from './footer';
import AppHeader from './header';
import CallbackPage from '../auth/callback.component';
import OnBoarding from './onboard.component';
import { userManager } from '../auth';
import { clearUserInfo } from '../reducers/configReduser';
import { connect } from "react-redux";
class AppLayout extends Component {
    componentDidMount() {
        if ((!this.props.user || this.props.user.expired) && !window.location.pathname.includes('callback')) {
            userManager.clearStaleState().then(()=>{
                this.props.dispatch(clearUserInfo());
                userManager.signinRedirect();
            });
        }
    }
    render() {
        if ((!this.props.user || this.props.user.expired) && !window.location.pathname.includes('callback')) {
            return <div className="loader">Loading .....</div>
        }else if((!this.props.user || this.props.user.expired) && window.location.pathname.includes('callback')){
            return <CallbackPage />
        }else if(this.props.user && !this.props.userProfile){
            return <OnBoarding />
        }else{
        return <Layout>
            <AppHeader />
            <AppContent />
            <AppFooter />
        </Layout>
        }
    }
}
const connectStateToProps = ({
    userConfig,
    auth,
  }) => {
    return {
        userProfile:userConfig.userProfileInfo,
      user:auth.user
    };
  };
  const connectDispatchToProps = (dispatch) => {
    return {
      dispatch
    };
  };
export default connect(
    connectStateToProps,
    connectDispatchToProps
  )(AppLayout);