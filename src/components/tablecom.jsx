import React, { Component } from 'react';
import { Table, Menu, Dropdown, Icon, Tooltip } from 'antd';

export default class TableCom extends Component {
    constructor(props) {
        super(props);
        this.mountProps(props);
    }
    mountProps(props) {
        const { header, action, headerWidth, currentPage, data } = props;
    }
    render() {
        return (
            <Table columns={ columns } dataSource={ data } />
        )
    }
}