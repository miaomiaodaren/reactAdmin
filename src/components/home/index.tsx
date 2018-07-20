import * as React from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Sidebar from './left'
import TopCompont from './top'
import Errors from '../404'
import routes from '../../routes';
import Sticky from '../../plugin/sticky/sticky'

export interface Props extends React.Props<Home> {}
export interface State {}

const isLogin = () => {
    const token = sessionStorage.getItem('token');
    return !!token
}

const PrivateRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route exact {...rest} render={ props =>
            isLogin() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }/>
    )
} 


export default class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
    }
    setRoute = () => {
        let component: any[] = [];
        routes.map((route: any) => {
            component.push(<PrivateRoute path={route.path} key={route.path} component={route.body()} />)
        })
        component.push(<Route key={'error'} component= {Errors}/>);
        return component
    }
    render() {
        return (
            <div className="admin_home">
                {/* <Sidebar /> */}
                <Sticky>
                    <TopCompont topRoute={routes} />
                </Sticky>
                <div id="main_right">
                    <Switch>
                        {this.setRoute()}
                    </Switch>
                </div>
            </div>
        )
    }
}