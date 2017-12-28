import React from 'react';
import { Table } from 'antd';
import SearchBar, { SearchForm } from '../searchbar.jsx';
import TableCom from '../tablecom.jsx';
import { connect } from 'react-redux';
import { fetchUserList, AddTodo, fetchUserAdd } from '../../model/actions/user.js'
import { message } from 'antd';
import { RemoveU } from '../../api/api.js';   //接口地址

@connect(
    (state) => ({
        todoList: state.todoList,
        adduser: state.AddUser,
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
            })),
            onChange: (v) => {
                let ref = v === 0 ? {} : v === 1 ? {isAdmin: true} : {isAdmin: false}
                this.gUserList(ref)
            }
        }]
    }

    //添加时要传过去的参数
    addfiles = () => {
        return [{
            title: '用户名',
            key: 'name',
            type: 'input',
        }, {
            title: '密码',
            key: 'psw',
            type: 'password'
        }, {
            title: '是否管理员',
            key: 'isAdmin',
            type: 'select',
            items: () => [{
                value: '0',
                mean: '管理员'
            }, {
                value: '1',
                mean: '普通用户'
            }].map(ele => ({
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

    gUserList = (obj) => {
        fetchUserList({ ...obj })(this.props.dispatch)
    }

    componentDidMount() {
        // this.props.dispatch(AddTodo({
        //     id: 222,
        //     text: '333'
        // }));
        // this.props.dispatch(fetchUserList({
        //     id: 222,
        //     text: '333',
        // }));
        // this.GetUserList();
        //此处只能把dispatch做为最后一个参数再传进去,才没有问题
        fetchUserList()(this.props.dispatch)
    }

    tableAction = async (key, row) => {
        if(key === 'edit') {
            //TODO 执行编译
            console.info(this, 777);
        } else {
            //TODO 执行删除   (后续添加删除确认,需要确认才能删除)
            try {
                const d = await RemoveU({id: row._id});
                if(d.code === 1) {
                    message.success('用户删除成功');
                    fetchUserList()(this.props.dispatch);
                }
            } catch(err) {
                console.error(err);
            }
        }
    }

    //点击提交的时候触发的事件
    submits = (params) => {
        fetchUserAdd({ ...params }, () => {
            message.success('用户添加成功');
            fetchUserList()(this.props.dispatch)
        })(this.props.dispatch)
    } 

    render() {
        const { todoList } = this.props;
        const userL = todoList.data;
        return (
            <div id="warp"> 
                <div className="users">
                    <SearchBar fields={ this.searchFields() } onOk={this.submits} hasadd={{ addfiles: this.addfiles(), rd: 'addUser', title: '用户添加' }} /> 
                </div>
                <div className="tableBox">
                    <div style={{ padding: 20 }}>
                        <TableCom header={ this.tableHeader()} ref="istable" data={ userL && userL.data } 
                            rowClass="tableclass"
                            action={ this.state.actionList }
                            pagination={ true } pageSize={ 10 }
                            total={ this.state.total }
                            onCtrlClick= {this.tableAction}
                            loading = { todoList.loading || false }
                        />
                    </div>
                </div>
                <Modal
                    title={this.props.hasadd && this.props.hasadd.title}
                    visible={this.state.showmodel}
                    footer={null}
                >
                    <SearchForm views={this.props.hasadd.addfiles} showCancel={true} onColse={this.onColse} noBtn={false} okText='添加' addClick={this.sub} />
                </Modal>
            </div>
        )
    }
}