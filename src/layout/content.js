import { Component } from 'react'
import { Layout } from 'antd';
import RouteConfig from './routes';
const { Content } = Layout;

class AppContent extends Component {

    render() {
        return(<>
         <Content className="sidebar-push">
         <RouteConfig />   
        </Content>
        </>
        )
    }
}

export default AppContent;