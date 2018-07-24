import * as React from 'react';
import { Table, Menu, Dropdown, Icon, Tooltip } from 'antd';
// import PropTypes from 'prop-types';

interface Props {
    header?: any,
    action?: any,
    headerWidth?: any,
    currentPage?: any,
    data?: any,
    onCtrlClick?: any,
    pagination?: any,
    total?: number,
    pageSize?: number,
    rowClass?: any,
    loading?: boolean,
    onChange?: any,
    current?: number
}

export default class TableCom extends React.Component<Props, any> {
    public columns : any;
    constructor(props: any) {
        super(props);
        this.mountProps(props);
        this.state = {
            currentPage: 1
        }
    }
    mountProps(props: any) {
        const { header, action, headerWidth, currentPage, data } = props;
        //如果有action传入，则要生成操作的render
        if(action) {
            this.columns = [].concat(header);
            const len: number = action.length;
            this.columns.push({
                title: '操作',
                key: 'action',
                render: (row: any) => {
                    const buttons = action.map(({color, name, key, icon}: any): any => {
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
    onPageChangeHandler = (page: number, pageSize: number) => {
        //会传入要去的页数
        this.setState({ currentPage: page })
    }
    render() {
        return (
            <Table columns={ this.columns } rowClassName={ this.props.rowClass } dataSource={ this.props.data } rowKey={(record: any): any => record._id} loading={this.props.loading}
                pagination={this.props.pagination !== false ? {
                    total: this.props.total,
                    pageSize: this.props.pageSize,
                    current: this.props.current,
                    onChange: this.props.onChange,
                    showTotal(total, range) {
                        // return <span className={styles.pageTotal}>共<span className={styles.count}>{total}</span>条</span>;
                        return <span>共<span>{total}</span>条</span>;
                    },
                } : false}
            />
        )
    }
}

