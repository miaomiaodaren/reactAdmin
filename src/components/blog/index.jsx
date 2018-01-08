import React from 'react';
import { Table } from 'antd';
import SearchBar, { FormModel } from '../searchbar.jsx';
import TableCom from '../tablecom.jsx';
import { connect, message, Modal, Button } from 'react-redux';
import { GetBlogList, GetBlogTypeList } from '../../api/api.js';
import { fetchBlogList } from '../../model/actions/blog.js'

@connect(
    (state) => ({
        BlogList: state.saveBlogList,
    })
)

export default class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeList: [],
            actionList :[
                {key: 'edit', name: '修改', color: 'blue', icon: 'edit'}, 
                {key: 'delete', name: '删除', color: 'red', icon: 'delete'}
            ],
            total: 0
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
            key: 'isAdmin',
            type: 'select',
            defaultValue: '全部',
            items: () => this.state.typeList.map(ele => ({
                value: ele._id,
                mean: ele.name
            })),
            onChange: (v) => {
                // let ref = v === '0' ? {} : v === '1' ? {isAdmin: true} : {isAdmin: false};
            }
        }]
    }



    componentDidMount() {
        fetchBlogList()(this.props.dispatch)
        GetBlogTypeList().then(res => {
            if(res) {
                this.setState({
                    typeList: res
                })
            }
        })
    }

    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '标题',
            key: 'title',
            render: text => <a href="#">{text}</a>,
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

    tableAction = () => {
        console.info('22');
    }

    render() {
        console.info(this.props, 888);
        const { BlogList } = this.props
        return (
            <div id="warp">
                <div className="serach">
                    <SearchBar fields={ this.searchFields() } />
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
            </div>
        )
    }
}