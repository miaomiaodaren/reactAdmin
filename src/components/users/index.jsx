import React from 'react';
import { Table } from 'antd';
import SearchBar from '../searchbar.jsx';
import TableCom from '../tablecom.jsx';
import { connect } from 'react-redux';
import { addTodo } from '../../model/actions/user.js'

import { GetUser } from '../../api/api.js';

@connect(
    (state) => ({
        todoList: state.todoList,
    })
)

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
            }],
            actionList :[
                {key: 'edit', name: '修改', color: 'blue', icon: 'edit'}, 
                {key: 'delete', name: '删除', color: 'red', icon: 'delete'}
            ]
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

    tableHeader = () => {
        return [{
            dataIndex: 'name',
            title: '用户名',
            key: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            dataIndex: 'isAdmin',
            title: '是否管理员',
            key: 'isAdmin',
            render: text => <div>{text ? '是': '否'}</div>
        }]
    }

    GetUserList = async () => {
        try{
            let d = await GetUser();
            this.userList = d.data;
            this.setState.total = d.total;
        } catch(err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.props.dispatch(addTodo({
            id: 222,
            text: '333',
        }));
        this.GetUserList();
    }

    tableAction = (key, row) => {
        if(key === 'edit') {
            //TODO 执行编译
        } else {
            //TODO 执行删除
        }
    }

    render() {
        const { todoList } = this.props
        return (
            <div id="warp">
                <div className="users">
                    <SearchBar fields={ this.searchFields() } />
                </div>
                <div className="tableBox">
                    <div style={{ padding: 20 }}>
                        <TableCom header={ this.tableHeader()} ref="istable" data={ this.userList } 
                            rowClass="tableclass"
                            action={ this.state.actionList }
                            pagination={ true } pageSize={ 3 }
                            total={ this.state.total }
                            onCtrlClick= {this.tableAction}
                        />
                    </div>
                </div>
            </div>
        )
    }
}