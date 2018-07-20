import * as React from 'react';
import { Table, message, Modal, Button } from 'antd';
import SearchBar, { FormModel } from '../searchbar';
import TableCom from '../tablecom';
import { connect } from 'react-redux';
import { GetBlogList, GetBlogTypeList, AddBlogType } from '../../api/api';
import { fetchBlogList, delfetchBlog, typelistedit, savetypelist, getAsynTypeList } from '../../model/actions/blog';
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { isEmptyObject } from '../../util/util'
import moment from 'moment';

import history from "../../util/history";   //在4.0的react-router没有暴露browserHistory的时候可以用。 history.push("/user"); 进行跳转

interface BlogInterface {
    saveBlogList?: any,
    saveType?: any,
    getAllType?: any
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
            pageSize: 10,  //每页显示10条
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
                console.info(v, 33);
                let ref = v === '0' ? {} : v === '1' ? {isAdmin: true} : {isAdmin: false};
            }
        }]
    }

    componentDidMount() {
        const {BolgList, alltypeList, GetAllTypes} = this.props;
        BolgList({page: 1, pagesize: 10});
        // //在加载的时候会先执行一次获取博客列表.此时因别处要使用，把代码数据放到redux中，方便后面的调用
        if(isEmptyObject(alltypeList)) {
            GetAllTypes().then((res: any[]) => {
                this.setState({
                    typeList: res || []
                })
            });
        } else {
            this.setState({
                typeList: alltypeList.list || []
            })
        }
    }

    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '标题',
            key: 'title',
            className: 'column-title',
            render: (text: any, record: any, index: any) => <Link to={`/blogcon/${record._id}`}>{text}</Link>,
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
        this.props.BolgList({page: 1, pagesize: 10, ...params});
    }

    //跳转到添加用户页面
    addblog = () => {
        const {history} = this.props;
        history.push('/blogedit');
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

    pagechange = (page: number, pageSize:number) => {
        this.props.BolgList({page, pagesize: pageSize})
    }


    render() {
        let { BlogList } = this.props;
        const {pageSize} = this.state;
        (BlogList.data || []).forEach((item: any) => {
            item.addtime = moment(item.addtime).format('YYYY-MM-DD');
        });
        return (
            <div id="warp">
                <div className="serach users">
                    <SearchBar fields={ this.searchFields() } onOk={ this.seach } />
                    <Button onClick={ this.addblog } className="search" icon="user-add" >添加</Button>
                    <Button onClick={ this.addtype } className="search" icon="user-add" style={{marginLeft: 20}}>添加分类</Button>
                </div>
                <div className="tableBox">
                    <div style={{ padding: 20 }}>
                        <TableCom header={ this.tableHeader()} ref="istable" data={ BlogList && BlogList.data } 
                            rowClass="tableclass"
                            action={ this.state.actionList }
                            pagination={ true } pageSize={ pageSize }
                            total={ BlogList.count }
                            onCtrlClick= {this.tableAction}
                            loading = { BlogList.loading || false }
                            onChange={this.pagechange}
                            current= {BlogList.page}
                        />
                    </div>
                </div>
                <FormModel modalKey="add" title="分类添加" visible={this.state.typeDialog}  onColse={this.onColse} fields={this.typefiles()} editBtn={this.editBtn()} submitClick={this.submits}></FormModel>
            </div>
        )
    }
}

const mapStateToProps = (state: BlogInterface) => ({
    BlogList: state.saveBlogList,
    saveType: state.saveType,
    alltypeList: state.getAllType,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        BolgList: (params: any = {}) => {
            fetchBlogList(params)(dispatch)
        },
        GetAllTypes: async(data: any = {}, callback?: any) => {
            return await getAsynTypeList(data, callback)(dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)