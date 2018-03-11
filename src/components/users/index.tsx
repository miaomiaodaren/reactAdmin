import * as React from 'react';
import { Table, message, Modal, Button } from 'antd';
import SearchBar, { FormModel } from '../searchbar';
// import TableCom from '../tablecom';
// import { connect } from 'react-redux';
// import { fetchUserList, AddTodo, fetchUserAdd } from '../../model/actions/user'
// import { RemoveU } from '../../api/api';   //接口地址

// @connect(
//     (state) => ({
//         todoList: state.todoList,
//         adduser: state.AddUser,
//     })
// )

// export default class Users extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             typeList: [{
//                 value: 0,
//                 mean: '全部'
//             }, {
//                 value: '1',
//                 mean: '管理员'
//             }, {
//                 value: '2',
//                 mean: '普通用户'
//             }],
//             actionList :[
//                 {key: 'edit', name: '修改', color: 'blue', icon: 'edit'}, 
//                 {key: 'delete', name: '删除', color: 'red', icon: 'delete'}
//             ],
//             addDialog: false,  //添加按钮是否显示
//             editDialog: false,  //编辑按钮是否显示
//             editData: {},
//             selectid: ''    //选择的按钮
//         }
//     }

//     searchFields = () => {
//         return [{
//             title: '用户名',
//             key: 'name',   //传入给接口的参数
//             type: 'input', 
//             defaultValue: ''
//         }, {
//             title: '是否管理员',
//             key: 'isAdmin',
//             type: 'select',
//             defaultValue: '全部',
//             items: () => this.state.typeList.map(ele => ({
//                 value: ele.value,
//                 mean: ele.mean
//             })),
//             onChange: (v) => {
//                 let ref = v === '0' ? {} : v === '1' ? {isAdmin: true} : {isAdmin: false};
//                 this.gUserList(ref)
//             }
//         }]
//     }

//     //添加时要传过去的参数
//     addfiles = () => {
//         return [{
//             title: '用户名',
//             key: 'name',
//             type: 'input',
//         }, {
//             title: '密码',
//             key: 'psw',
//             type: 'password',
//         }, {
//             title: '是否管理员',
//             key: 'isAdmin',
//             type: 'select',
//             items: () => [{
//                 value: '0',
//                 mean: '管理员'
//             }, {
//                 value: '1',
//                 mean: '普通用户'
//             }].map(ele => ({
//                 value: ele.value,
//                 mean: ele.mean
//             }))
//         }]
//     }
//     //编辑时要传过的值
//     editfiles = () => {
//         const editData = this.state.editData;
//         return [{
//             title: '用户id',
//             key: '_id',
//             type: 'input',
//             disabled: true,
//             ishide: true,
//             options: {
//                 initialValue: editData._id,
//             }
//         }, {
//             title: '用户名',
//             key: 'name',
//             type: 'input',
//             options: {
//                 initialValue: editData.name,
//             }
//         }, {
//             title: '密码',
//             key: 'psw',
//             type: 'password',
//             options: {
//                 initialValue: editData.psw,
//             }
//         }, {
//             title: '是否管理员',
//             key: 'isAdmin',
//             type: 'select',
//             options: {
//                 initialValue: editData.isAdmin ? '0' : '1',
//             },
//             items: () => [{
//                 value: '0',
//                 mean: '管理员'
//             }, {
//                 value: '1',
//                 mean: '普通用户'
//             }].map(ele => ({
//                 value: ele.value,
//                 mean: ele.mean
//             }))
//         }]
//     }

//     tableHeader = () => {
//         return [{
//             dataIndex: 'name',
//             title: '用户名',
//             key: 'name',
//             render: text => <a href="#">{text}</a>,
//         }, {
//             dataIndex: 'isAdmin',
//             title: '是否管理员',
//             key: 'isAdmin',
//             render: text => <div>{text ? '是': '否'}</div>
//         }]
//     }

//     gUserList = (obj) => {
//         fetchUserList({ ...obj })(this.props.dispatch)
//     }

//     componentDidMount() {
//         // this.props.dispatch(fetchUserList({
//         //     id: 222,
//         //     text: '333',
//         // }));
//         // this.GetUserList();
//         //此处只能把dispatch做为最后一个参数再传进去,才没有问题
//         fetchUserList()(this.props.dispatch)
//     }

//     tableAction = async (key, row) => {
//         console.info(row);
//         if(key === 'edit') {
//             //TODO 执行编译
//             this.setState({
//                 editDialog: true,
//                 editData: row
//             })
//         } else {
//             //TODO 执行删除   (后续添加删除确认,需要确认才能删除)
//             try {
//                 const d = await RemoveU({id: row._id});
//                 if(d.code === 1) {
//                     message.success('用户删除成功');
//                     fetchUserList()(this.props.dispatch);
//                 }
//             } catch(err) {
//                 console.error(err);
//             }
//         }
//     }

//     //点击提交的时候触发的事件
//     submits = (params) => {
//         fetchUserAdd({ ...params }, () => {
//             message.success('用户添加成功');
//             this.setState({addDialog: false});
//             fetchUserList()(this.props.dispatch)
//         })(this.props.dispatch)
//     } 
//     //用户编辑提交事件
//     Editsubmits = (params) => {
//         console.info(params);
//         fetchUserAdd({ ...params, method: 'update' }, () => {
//             message.success('用户编辑成功');
//             this.setState({editDialog: false});
//             fetchUserList()(this.props.dispatch)
//         })(this.props.dispatch)
//     }

//     searcher = (params) => {
//         console.info(params, 777);
//         fetchUserList({ ...params })(this.props.dispatch)
//     }
  
//     add = () => {
//         this.setState({
//             addDialog: true,
//         })
//     }
//     //添加用户关闭按钮
//     onColse =() => {
//         this.setState({addDialog: false})
//     }
//     //编辑用户关闭按钮
//     editColse = () => {
//         this.setState({editDialog: false})
//     }
//     editBtn = (type) => {
//         return [{
//             name: '取消',
//             onClick: () => {
//                // this.setState({addDialog: false});
//                type === "add" ? this.setState({addDialog: false}) : this.setState({editDialog: false})
//             },
//             htmlType: 'button'
//         }, {
//             name: '确定',
//             type: "primary",
//             htmlType: 'submit'
//         }]
//     }  

//     render() {
//         const { todoList } = this.props;
//         const userL = todoList.data;
        
//         return (
//             <div id="warp"> 
//                 <div className="users">
//                     <SearchBar fields={ this.searchFields() } onOk={this.searcher} /> 
//                     <Button onClick={ this.add } className="search" icon="user-add" >添加</Button>
//                 </div>
//                 <div className="tableBox">
//                     <div style={{ padding: 20 }}>
//                         <TableCom header={ this.tableHeader()} ref="istable" data={ userL && userL.data } 
//                             rowClass="tableclass"
//                             action={ this.state.actionList }
//                             pagination={ true } pageSize={ 10 }
//                             total={ this.state.total }
//                             onCtrlClick= {this.tableAction}
//                             loading = { todoList.loading || false }
//                         />
//                     </div>
//                 </div>
//                 <FormModel modalKey="add" title="用户添加" visible={this.state.addDialog}  onColse={this.onColse} fields={this.addfiles()} editBtn={this.editBtn('add')} submitClick={this.submits}></FormModel>
//                 <FormModel modalKey="edit" title="用户编辑" visible={this.state.editDialog}  onColse={this.editColse} fields={this.editfiles()} editBtn={this.editBtn('edit')} submitClick={this.Editsubmits}></FormModel>
//             </div>
//         )
//     }
// }