import React from 'react';

import { Table } from 'antd';
import SearchBar from '../searchbar.jsx';
import TableCom from '../tablecom.jsx';

export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeList: [{
                value: 0,
                mean: '全部'
            }, {
                value: '1',
                mean: '管理员'
            }, {
                value: '2',
                mean: '普通用户'
            }]
        }
    }

    searchFields = () => {
        return [{
            title: '用户名',
            key: 'name',   //传入给接口的参数
            type: 'input', 
            defaultValue: ''
        }, {
            title: '是否管理员',
            key: 'isAdmin',
            type: 'select',
            defaultValue: '全部',
            items: () => this.state.typeList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            }))
        }]
    }
    render() {
        return (
            <div id="warp">
                <div className="users">
                    <SearchBar fields={ this.searchFields() } />
                </div>
                <div className="tableBox">
                    <div style={{ paddingTop: 40 }}>
                        <TableCom  header={ this.tableHeader()} data={ userList } />
                    </div>
                </div>
            </div>
        )
    }
}