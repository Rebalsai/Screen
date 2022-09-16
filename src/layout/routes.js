import { Component } from 'react'
import { Route,Switch} from 'react-router-dom';
import Home from '../components/home';
import CallbackPage from '../auth/callback.component';
import OnBoarding from './onboard.component';
import Crypto from '../components/commissions/cryptoGrid';
import AddForm from '../components/commissions/cryptoAddForm';
//import EditForm from '../components/commissions/cryptoEditForm';

class RouteConfig extends Component {
debugger
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/callback" component={CallbackPage} />
                    <Route path="/onboading" component={OnBoarding} />
                    <Route path="/commissions" component={Crypto} exact/>
                    <Route path="/commissions/:id/add" component={AddForm}/>
                    <Route path="/commissions/Crypto/:id/edit" component={AddForm}/>
                </Switch>
            </>
        )
    }
}

export default RouteConfig;