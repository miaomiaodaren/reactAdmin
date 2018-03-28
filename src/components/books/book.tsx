import * as React from 'react';
import { Table, message, Modal, Button } from 'antd';
import TableCom from '../tablecom';
import { GetBooksList } from '../../api/api';
import { Link } from 'react-router-dom';

interface stateinterface {
    loading?: boolean,
    total?: number,
    dataInfo?: any[],
    actionList?: any[]
}

class books extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props)
    }
    
    state:stateinterface = {
        loading: false,
        total: 0,
        dataInfo: [],
        actionList :[
            // {key: 'edit', name: '修改', color: 'blue', icon: 'edit'}, 
            {key: 'delete', name: '删除', color: 'red', icon: 'delete'}
        ],
    }

    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '书名',
            key: 'title',
            className: 'column-title',
            render: (text: any, record: any, index: any) => <Link to={`/blogedit/${record._id}`}>{text}</Link>,
        }, {
            dataIndex: 'author',
            title: '作者',
            key: 'author',
        }, {
            dataIndex: 'type',
            title: '所属分类',
            key: 'type'
        }]
    }


    tableAction = async(key: any, row: any) => {
        if(key === 'delete') {
            //删除消息
        }
    }

    getList = async() => {
        this.setState({ loading: true });
        let booklist = await GetBooksList();
        this.setState({
            dataInfo: booklist,
            loading: false
        });
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        const { loading, total, dataInfo } = this.state
        console.info(loading, 99, dataInfo);
        return (
            <div className="books">
                <div className="tableBox">
                    <TableCom header={ this.tableHeader()} ref="istable" data={ dataInfo } 
                        rowClass="tableclass"
                        action={ this.state.actionList }
                        pagination={ true } pageSize={ 10 }
                        total={ total }
                        onCtrlClick= {this.tableAction}
                        loading = { loading || false }
                    />
                </div>
            </div>
        )
    }
}

export default books