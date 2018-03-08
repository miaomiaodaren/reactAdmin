import * as React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reqMenuChange } from '../../model/actions/key'

// @connect(
//     (state) => ({
//         changeMenu: state.changeMenu,
//     })
// )

interface ssb {
    changeMenu?: any
}

export default class TopCompont extends React.Component<ssb, {}> {
    constructor(props: any) {
        super(props)
    }
    toggleCollapsed = () => {
        // this.props.dispatch(reqMenuChange({collapsed: !this.props.changeMenu.collapsed}));
    }

    render() {
        const { changeMenu } = this.props;
        return (
            <div id="admin_top">
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginTop: 16 }}>
                    <Icon type={changeMenu ? 'menu-unfold' : 'menu-fold'} />
                </Button>
            </div>
        )
    }
}