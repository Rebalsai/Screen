import { Component } from 'react';
import { Typography, Menu, Layout } from 'antd';
import logoColor from '../assets/images/logo-color.png';
import { userManager } from '../auth';
import { connect } from 'react-redux';
const { Text } = Typography;
class AppHeader extends Component {
    render() {
        return (
            <>
                <Layout className="layout">
                    <div className="tlv-header" id="area">
                        <div className="login-user">
                            <ul className="header-logo pl-0">
                                <li className="pr-30 p-relative">
                                    {<img src={logoColor} alt="logo" className="tlv-logo light c-pointer" alt={"image"} onClick={this.routeToHome} />}
                                </li>
                                <li className="mb-d-none px-36">
                                    <Text content="Dashboard" className="text-white-30 fs-24 c-pointer cp-link" >Dashboard</Text>
                                    <Text className="text-white-30 fs-24">|</Text>
                                    <Text className="text-white-30 fs-24 ml-16">Personal</Text>
                                </li>
                            </ul>
                           
                        </div>
                        <Menu theme="light" mode="horizontal" className="header-right mobile-headerview">
                            <Menu.Item key="1" className='text-plain'>
                                {this.props.userConfig.email}
                                </Menu.Item>
                            <Menu.Item key="2" className="list-item" onClick={()=>{
                                userManager.signoutRedirect();
                            }}>Louout</Menu.Item>
                          
                        </Menu>
                    </div>
                </Layout >
            </>

        );
    }
}

const connectStateToProps = ({ userConfig }) => {
    return { userConfig: userConfig.userProfileInfo}
}
export default connect(connectStateToProps)(AppHeader);