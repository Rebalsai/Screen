import { Component } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { store } from "../store";
import { setUser } from '../reducers/authReducer'
import { notification } from "antd";
import validationMessages from "../shared/config/validation.messages";
class OtpLogin extends Component {
    componentDidMount() {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                this.setState({ ...this.state, isRecaptchaChecked: true });
            },
            'expired-callback': () => {
                window.grecaptcha.reset(window.recaptchaWidgetId);
            }
        }, auth);
        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
    }
    state = {
        viewOtpForm: false,
        loading: false,
        isRecaptchaChecked: false
    }
    loginSubmit = () => {
        const auth = getAuth();
        const phoneNumber = document.getElementById("phone").value;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                this.setState({ viewOtpForm: true });
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log(error)
                window.grecaptcha.reset(window.recaptchaWidgetId);
            });
    }
    otpSubmit = () => {
        const code = document.getElementById("otp").value;
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            store.dispatch(setUser(user));
            if (user.meta?.lastSignInTime === user.meta?.createdTime) {
                this.props.history.push("/newuser");
            }
            else {
            }
        }).catch((error) => {
            notification.error({ description:validationMessages.INPUT_CONTROLS.otp, message: "OTP Failed" });
        })
    }
    render() {
        const { viewOtpForm, isRecaptchaChecked, loading } = this.state;
        return <div className="wrapper">
            <h1 className="main-heading">Sign in</h1>
            <p className="sub-text">Sign in using your mobile number.</p>
            {!viewOtpForm ? (
                <div className="form-wrapper">
                    <form id="loginForm">
                        <div className="input-field">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                id="phone"
                                autoComplete="false"
                            />
                        </div>
                        <div id="recaptcha-container"></div>
                        <button className="main-button" disabled={!isRecaptchaChecked} onClick={() => this.loginSubmit()} type="button" id="sign-in-button">
                            Sign in
                        </button>
                    </form>
                </div>
            ) : (
                <div className="form-wrapper" >
                    <form id="otpForm">
                        <div className="input-field">
                            <label>Enter OTP</label>
                            <input
                                type="number"
                                placeholder="One time password"
                                name="otp_value"
                                id="otp"
                                autoComplete="false"
                            />
                        </div>
                        <button className="main-button" type="button" onClick={() => this.otpSubmit()}>
                            Verify OTP
                        </button>
                    </form>
                </div>
            )}
        </div>
    }
}
export default OtpLogin; 