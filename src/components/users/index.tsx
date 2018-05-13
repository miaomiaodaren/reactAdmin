import * as React from 'react';
import { Table, message, Modal, Button } from 'antd';
import SearchBar, { FormModel } from '../searchbar';
import TableCom from '../tablecom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncAddTodo, asyncAddUser, USERS } from '../../model/actions/user'
import { RemoveU } from '../../api/api';   //接口地址
import { withRouter, Prompt  } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import {is, fromJS} from 'immutable'

export interface UserProps {
    todoList?: any;
    dispatch?: any;
    userList?: any;
    myName?: string;
    userAdd?: any;
}

export interface Ele {
    value?: any;
    mean?: any;
}

class Users extends React.Component<UserProps, any> {
    static defaultProps = {
        myName: 'fufeng',
    }

    static propTypes = {
        myName: PropTypes.string,
        todoList: PropTypes.any,
        dispatch: PropTypes.node,
        userList: PropTypes.any,
    }

    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props: UserProps, context: any) {
        super(props, context)
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
            ],
            addDialog: false,  //添加按钮是否显示
            editDialog: false,  //编辑按钮是否显示
            editData: {},
            selectid: ''    //选择的按钮
        }
    }
    
    searchFields = (): any[] => {
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
            items: (): void => this.state.typeList.map((ele: any): any => ({
                value: ele.value,
                mean: ele.mean
            })),
            onChange: (v: any): void => {
                let ref = v === '0' ? {} : v === '1' ? {isAdmin: true} : {isAdmin: false};
                this.props.userList(ref);
            }
        }]
    }

    //添加时要传过去的参数
    addfiles = (): any[] => {
        return [{
            title: '用户名',
            key: 'name',
            type: 'input',
        }, {
            title: '密码',
            key: 'psw',
            type: 'password',
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
    //编辑时要传过的值
    editfiles = (): any[] => {
        const editData = this.state.editData;
        return [{
            title: '用户id',
            key: '_id',
            type: 'input',
            disabled: true,
            ishide: true,
            options: {
                initialValue: editData._id,
            }
        }, {
            title: '用户名',
            key: 'name',
            type: 'input',
            disabled: true,
            options: {
                initialValue: editData.name,
            }
        }, {
            title: '是否管理员',
            key: 'isAdmin',
            type: 'select',
            options: {
                initialValue: editData.isAdmin ? '0' : '1',
            },
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
            render: (text: any) => <a href="#">{text}</a>,
        }, {
            dataIndex: 'isAdmin',
            title: '是否管理员',
            key: 'isAdmin',
            render: (text: boolean) => <div>{text ? '是': '否'}</div>
        }]
    }

    gUserList = (obj: any) => {
        this.props.userList({ ...obj });
    }
    componentWillMount() {
        //WillMount是在完成首次渲染之前调用，此时可以修改组件的state
    }
    componentDidMount() {
        //在此使用了redux的connect的第二个参数，可以直接封装一个方法，然后直接在页面实现action的方法
        this.props.userList();
    }

    shouldComponentUpdate(nextProps:UserProps, nextState: any) {
        return !is(fromJS(nextProps), fromJS(this.props)) || !is(fromJS(nextState), fromJS(this.state))
    }

    tableAction = async (key: any, row: any) => {
        if(key === 'edit') {
            console.info(key, row, 3333);
            //TODO 执行编译
            this.setState({
                editDialog: true,
                editData: row
            })
        } else {
            //TODO 执行删除   (后续添加删除确认,需要确认才能删除)
            try {
                const d = await RemoveU({id: row._id});

                if(d.statue === 'success') {
                    message.success('用户删除成功');
                    this.props.userList();
                } else {
                    message.error(d.message);
                }
            } catch(err) {
                console.error(err);
            }
        }
    }

    //点击提交的时候触发的事件
    submits = (params : any) => {
        this.props.userAdd({ ...params }, (res: any) => {
            if(res.statue === 'success') {
                message.success('用户添加成功');
                this.setState({addDialog: false});
                this.props.userList();
            }  else {
                message.success(res.message);
            }
        })
    } 
    //用户编辑提交事件
    Editsubmits = (params: any) => {
        this.props.userAdd({...params}, (res: any) => {
            console.info(res, 4444);
            if(res.statue === 'success') {
                message.success('用户编辑成功');
                this.setState({editDialog: false});
                this.props.userList();
            }  else {
                message.success(res.message);
            }
        })
    }

    searcher = (params: any) => {
        this.props.userList({ ...params });
    }
  
    add = () => {
        this.setState({
            addDialog: true,
        })
    }
    //添加用户关闭按钮
    onColse =() => {
        this.setState({addDialog: false})
    }
    //编辑用户关闭按钮
    editColse = () => {
        this.setState({editDialog: false})
    }
    editBtn = (type: string) => {
        return [{
            name: '取消',
            onClick: () => {
               // this.setState({addDialog: false});
               type === "add" ? this.setState({addDialog: false}) : this.setState({editDialog: false})
            },
            htmlType: 'button'
        }, {
            name: '确定',
            type: "primary",
            htmlType: 'submit'
        }]
    }  

    render() {
        console.info(this, 3333);
        const { todoList }: any = this.props;

        return (
            <div id="warp">
                <div className="users">
                    <SearchBar fields={ this.searchFields() } onOk={this.searcher} /> 
                    <Button onClick={ this.add } className="search" icon="user-add" >添加用户</Button>
                </div>
                <div className="tableBox">
                    <div style={{ padding: 20 }}>
                        <TableCom header={ this.tableHeader()} ref="istable" data={ todoList.list } 
                            rowClass="tableclass"
                            action={ this.state.actionList }
                            pagination={ true } pageSize={ 10 }
                            total={ this.state.total }
                            onCtrlClick= {this.tableAction}
                            loading = { todoList.loading || false }
                        />
                    </div>
                </div>
                <FormModel modalKey="add" title="用户添加" visible={this.state.addDialog}  onColse={this.onColse} fields={this.addfiles()} editBtn={this.editBtn('add')} submitClick={this.submits}></FormModel>
                <FormModel modalKey="edit" title="用户编辑" visible={this.state.editDialog}  onColse={this.editColse} fields={this.editfiles()} editBtn={this.editBtn('edit')} submitClick={this.Editsubmits}></FormModel>
            </div>
        )
    }
}

const mapStateToProps  = (state: any) => ({
    todoList: state.Users,
    adduser: state.AddUser,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        userList: (params={}) => {
            asyncAddTodo(params)(dispatch)
        },
        userAdd: (params: USERS, callback?: () => void) => {
            asyncAddUser(params, callback)(dispatch)
        }
    }
}

//connect()(Users) 是用来把dispatch注册到props，但是当第二个参数传入了方法，则dispatch不会再注册到props中
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(Users))