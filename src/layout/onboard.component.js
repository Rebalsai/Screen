import React, { Component } from 'react';
import { userInfo, getmemeberInfo } from '../reducers/configReduser';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class OnBoarding extends Component {
  state = {
    isOnboarding: false,
    isGetOnboardingStatus: false,
  };
  componentDidMount() {
    this.getMemberDetails()
  }
  getMemberDetails = async () => {
    if (this.props.user && this.props.user.profile) {
      this.props.getmemeberInfoa(this.props.user.profile.sub);
    }
  }
  render() {
    if (this.props.user && this.props.user.profile && this.props.userConfig) {
        if (!window.location.pathname.includes('home')) this.props.history.push("/home")
    }
    if (this.props.user && this.props.user.profile && this.props.userConfig) {
      if (!window.location.pathname.includes('users')) this.props.history.push("/users")
  }
 
    return <>
      <div className="loader">Loading .....</div>
    </>
  }
}
const connectStateToProps = ({ userConfig, auth }) => {
  return { userConfig: userConfig.userProfileInfo, user: auth.user }
}
const connectDispatchToProps = dispatch => {
  return {
    userInformation: (stepcode) => {
      dispatch(userInfo(stepcode))
    },
    getmemeberInfoa: (useremail) => {
      dispatch(getmemeberInfo(useremail));
    }
  }
}
export default connect(connectStateToProps, connectDispatchToProps)(withRouter(OnBoarding));