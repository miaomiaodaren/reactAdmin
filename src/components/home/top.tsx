import * as React from 'react';
import styled from 'styled-components';
import {orderBy} from '../../util/util';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import * as classnames from 'classnames';
import Topsolid from '../topsolid';

const Top = styled.div`
    height: 60px;
    line-height: 60px;
    display: block;
    background-color: #1e89e0;
    .container{
        width: 1200px;
        font-size: 14px;
        margin: 0 auto;
        color: #fff;
        .top-item{
            width: 155px;
            font-size: 16px;
            color: #fff;
            display: inline-block;
            text-align: center;
            &:hover{
                background: #0c77d1
            }
            &.active{
                background: #006bc7;
                outline:0
            }
        }
        .nav_right{
            float: right;
            width: 300px;
            display: block;
            text-align: right;
        }
    }
`

interface HeaderPROPS {
    topRoute?: any,
    location?: any
}


@withRouter
export default class TopCompont extends React.Component<HeaderPROPS, {}> {
    constructor(props: HeaderPROPS) {
        super(props)
    }

    render() {
        const {topRoute, location} = this.props;
        let component = topRoute.filter((item: any) => {
            return !!item.name
        });
        component = orderBy(component, 'sort');
        const styleList = (value: string) => classnames('top-item', {'active': location.pathname == value});
        return (
            <Top>
                <Topsolid />
                <div className="container clearfix">
                    {component.map((value: any) => (
                        <Link className={styleList(value.path)} key={value.name} to={value.path}>{value.name}</Link>
                    ))}
                    <nav className="nav_right">{window.sessionStorage.token}</nav>
                </div>
            </Top>
        )
    }
}