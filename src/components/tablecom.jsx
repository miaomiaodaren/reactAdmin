import React, { Component } from 'react';
import { Table, Menu, Dropdown, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default class TableCom extends Component {
    constructor(props) {
        super(props);
        this.mountProps(props);
        this.state = {
            currentPage: 1
        }
    }
    mountProps(props) {
        const { header, action, headerWidth, currentPage, data } = props;
        //如果有action传入，则要生成操作的render
        if(action) {
            this.columns = [].concat(header);
            const len = action.length;
            this.columns.push({
                title: '操作',
                key: 'action',
                render: (row) => {
                    const buttons = action.map(({color, name, key, icon}) => {
                        return (<Tooltip title={ name } key={key}>
                            <a key={key}
                            onClick={(e) => {
                                e.preventDefault();
                                if ('onCtrlClick' in this.props) {
                                    this.props.onCtrlClick(key, row);
                                }
                            }}
                            style={{
                                color,
                                marginRight: 12,
                                display: 'inline-block',
                                fontSize: 14,
                            }}>
                        <Icon type={ icon } /></a></Tooltip>)
                    })
                    return(
                        <div>{buttons}</div>
                    )
                }
            })
        }
    }
    onPageChangeHandler = (e) => {
        //会传入要去的页数
        this.setState({ currentPage: e })
    }
    render() {
        return (
            <Table columns={ this.columns } rowClassName={ this.props.rowClass } dataSource={ this.props.data }
                pagination={this.props.pagination !== false ? {
                    total: this.props.total,
                    pageSize: this.props.pageSize,
                    current: this.state.currentPage,
                    onChange: this.onPageChangeHandler,
                    showTotal(total, range) {
                        // return <span className={styles.pageTotal}>共<span className={styles.count}>{total}</span>条</span>;
                        return <span>共<span>{total}</span>条</span>;
                    },
                } : false}
            />
        )
    }
}

TableCom.PropTypes = {
    pageSize: PropTypes.number,
}