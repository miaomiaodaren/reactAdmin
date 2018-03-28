import * as React from 'react';
import { Table, message, Modal, Button } from 'antd';
import SearchBar, { FormModel } from '../searchbar';
import TableCom from '../tablecom';
import { connect } from 'react-redux';
import { GetBlogList, GetBlogTypeList, AddBlogType } from '../../api/api';
import { fetchBlogList, delfetchBlog, typelistedit } from '../../model/actions/blog';
import { Switch, Route, Link, withRouter } from 'react-router-dom'


// import moment from '../../util/monent'
import history from "../../util/history";   //在4.0的react-router没有暴露browserHistory的时候可以用。 history.push("/user"); 进行跳转
// var styles = require("../../style.less");

// @connect(
//     (state) => ({
//         BlogList: state.saveBlogList,
//         saveType: state.saveType,
//     })
// )

interface BlogInterface {
    saveBlogList?: any,
    saveType?: any
}

interface StateInterface {
    typeList?: any[],
    actionList: any[],
    total?: number,
    typeDialog?: boolean
}


class Blog extends React.Component<any, any> {
    static router: any;
    constructor(props: BlogInterface) {
        super(props);
        this.state = {
            typeList: [],
            actionList :[
                {key: 'edit', name: '修改', color: 'blue', icon: 'edit'}, 
                {key: 'delete', name: '删除', color: 'red', icon: 'delete'}
            ],
            total: 0,
            typeDialog: false,    //博客类别添加弹出框 
        }
    }

    //搜索框数据结构
    searchFields = () => {
        return [{
            title: '标题',
            key: 'title',   //传入给接口的参数
            type: 'input', 
            defaultValue: ''
        }, {
            title: '分类',
            key: 'type',
            type: 'select',
            defaultValue: '全部',
            items: () => this.state.typeList.map((ele: any) => ({
                value: ele.name,
                mean: ele.name
            })),
            onChange: (v: any) => {
                let ref = v === '0' ? {} : v === '1' ? {isAdmin: true} : {isAdmin: false};
            }
        }]
    }

    componentDidMount() {
        console.info(this, 223);
        fetchBlogList()(this.props.dispatch)
        // //在加载的时候会先执行一次获取博客列表.此时因别处要使用，把代码数据放到redux中，方便后面的调用
        if(!Object.keys(this.props.saveType).length) {
            typelistedit({}, (data: any) => {
                this.setState({
                    typeList: data.list
                })
            })(this.props.dispatch)   
        }
        // this.setState((prostate: any, props: any) => {
        //     total: prostate.total + 1
        // });
    }

    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '标题',
            key: 'title',
            className: 'column-title',
            render: (text: any, record: any, index: any) => <Link to={`/blogedit/${record._id}`}>{text}</Link>,
        }, {
            dataIndex: 'addtime',
            title: '用户名',
            key: 'addtime',
        }, {
            dataIndex: 'type',
            title: '所属分类',
            key: 'type'
        }]
    }

    tableAction = (key: string, row: any) => {
        if(key === 'edit') {
            const {_id} = row;
            this.props.history.push(`/blogedit/${_id}`);
        } else {
            delfetchBlog({_id: row._id}, () => {
                message.success('博客删除成功');
                fetchBlogList()(this.props.dispatch);
            })(this.props.dispatch)
        }
    }

    seach = (params: any) => {
        fetchBlogList({...params})(this.props.dispatch)
    }

    //跳转到添加用户页面
    addblog = () => {
        console.info(this.context, 99);
        // history.push("/user");
        // this.props.history.push('/blogedit');
    }

    //添加type模块
    addtype = async () => {
        this.setState({
            typeDialog: true,
        })
    }

    onColse = () => {
        this.setState({
            typeDialog: false
        })
    }

    editBtn = (): any[] => {
        return [{
            name: '取消',
            onClick: () => {
               this.onColse();
            },
            htmlType: 'button'
        }, {
            name: '确定',
            type: "primary",
            htmlType: 'submit'
        }]
    }

    submits = async (data: any) => {
        let d = await AddBlogType({...data});
        if(d.code == 1) {
            message.success('分类添加成功');
            typelistedit({}, (data: any) => {
                this.setState({
                    typeList: data.list,
                    typeDialog: false
                })
            })(this.props.dispatch)
        }
        
    }

    typefiles = () => {
        const { saveType }  = this.props;
        return [{
            title: '标题',
            key: 'name',
            type: 'input',
        }, {
            title: '排序',
            key: 'sorts',
            type: 'input',
            options: {
                initialValue: saveType.count + 1,
            }
        }]
    }

    render() {
        let { BlogList } = this.props;
        // (BlogList.data || []).forEach((v: any) => {
        //     v.addtime = moment(v.addtime).formart('yyyy-MM-dd');
        // });
        return (
            <div id="warp">
                <div className="serach users">
                    <SearchBar fields={ this.searchFields() } onOk={ this.seach } />
                    <Button onClick={ this.addblog } className="search" icon="user-add" >添加</Button>
                    <Button onClick={ this.addtype } className="search" icon="user-add" style={{marginLeft: 20}}>添加</Button>
                </div>
                <div className="tableBox">
                    <div style={{ padding: 20 }}>
                        <TableCom header={ this.tableHeader()} ref="istable" data={ BlogList && BlogList.data } 
                            rowClass="tableclass"
                            action={ this.state.actionList }
                            pagination={ true } pageSize={ 10 }
                            total={ this.state.total }
                            onCtrlClick= {this.tableAction}
                            loading = { BlogList.loading || false }
                        />
                    </div>
                </div>
                <FormModel modalKey="add" title="分类添加" visible={this.state.typeDialog}  onColse={this.onColse} fields={this.typefiles()} editBtn={this.editBtn()} submitClick={this.submits}></FormModel>
            </div>
        )
    }
}

//props类型定义
// Blog.propTypes = {
//     BlogList: PropTypes.string,
//     saveType: PropTypes.element.isRequired
// };
//props默认值
// Greeting.defaultProps = {
//   name: 'Stranger'
// };

export default connect((state: BlogInterface) => ({
    BlogList: state.saveBlogList,
    saveType: state.saveType,
}))(Blog)

// export default withRouter(Blog)