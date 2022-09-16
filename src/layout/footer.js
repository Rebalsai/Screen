import { Component } from 'react'
import { Layout, Typography } from 'antd';
const { Footer: AntFooter } = Layout
const { Text } = Typography;
class AppFooter extends Component {

    render() {
        return (<AntFooter style={{ backgroundColor: 'transparent', padding: 0 }}>
        <div className="main-container">
            <div className="footer-links">
                <a href="https://suissebase.ch/" target="_blank"><Text className="text-white-30">Home</Text></a>
                <a href="https://suissebase.ch/" target="_blank"><Text className="text-white-30" >Careers
                </Text></a>
                {/* <a><Text className="text-white-30">Legan &amp; Policy</Text></a> */}
                <Text className="text-white-30">Suissebase<sup className="fs-10">TM</sup> {new Date().getFullYear()}</Text>
            </div>
        </div>
    </AntFooter>)
    }
}

export default AppFooter;