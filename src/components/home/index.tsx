import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import TopCompont from './top'
import Errors from '../404'
import routes from '../../routes';
import Sticky from '../../plugin/sticky/sticky';
import styled from 'styled-components';

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import axios from 'axios';

export interface Props extends React.Props<Home> {}
export interface State {}

const isLogin = () => {
    const token = sessionStorage.getItem('token');
    return !!token
}

const PrivateRoute = ({component: Component, ...rest}: any) => {
    // rest.exact = rest.path === '/' ? true : false;
    return (
        <Route {...rest} exact={true} render={ props =>
            isLogin() ? (
                <Component  {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }/>
    )
} 


export default class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    async componentDidMount() {
        const datainfo = await axios.get('/api/user/getsign?url=' + document.location.href);
        console.info(datainfo, 777777777777777);
    }
    setRoute = () => {
        let component: any[] = [];
        routes.map((route: any) => {
            component.push(<PrivateRoute path={route.path} name='222' key={route.path || route.key} component={route.body()} />)
        })
        // component.push(<Route key={'error'} component= {Errors}/>);
        return component
    }
    render() {
        return (
            <Homemain className="admin_home">
                {/* <Sidebar /> */}
                <Sticky>
                    <TopCompont topRoute={routes} />
                </Sticky>
                <div id="main_right">
                    <Switch>
                        {this.setRoute()}
                    </Switch>
                </div>
            </Homemain>
        )
    }
}

const Homemain = styled.div`

`