import React from 'react';
import { connect } from 'react-redux';
import { isArrayLislk, each, gettype } from '../../util/util.js'
import { typelistedit } from '../../model/actions/blog';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import CssList from './csslist';

@connect(
    (state) => ({
        BlogList: state.saveBlogList,
        saveType: state.saveType,
    })
)
export default class JavaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [],
            activeKey: '',
        }
    }
    componentWillMount() {
        const typeList = this.props.saveType;
        //如果分类没有存在props中，则调中一次，并且存到props中
        if(!isArrayLislk(typeList)) {
            typelistedit({}, (data) => {
                this.setState({
                    tabList: this.packComponent(data.list) || [],
                    activeKey: data.list[0]._id
                })
            })(this.props.dispatch)   
        } else {
            this.setState({
                tabList: this.packComponent(typeList.list) || [],
                activeKey: typeList.list[0]._id
            })
        }
    }
    componetWillUpdate() {
        console.info('33');
    }
    packComponent = (temp: any) => {
        //每一个选项卡中都内嵌了一个组件，这边是把组件返回的的对象生成到对象中
        if(!isArrayLislk(temp)) return [];
        each(temp, (v, i) => {
            v['content'] = v.name
        })
        return temp
    }
    //那传过来的name跟带有组件的obj进行对比，生成符合条件的真实DOM。
    setPackDom = (temp: any) => {
        const tempList = {
            'css': CssList
        };
        const Istemp = tempList[temp];
        if(!Istemp) {
            return temp
        }
        return (<Istemp></Istemp>)
    }
    setTypeDom = (typelist: any) => {
        //动态生成分类的列表数据
        let components = [], list = typelist.list, len = typelist.count, comHtml= null;
        if(!isArrayLislk(list)) return components;
        each(list, (v, i) => { 
            components.push(<li key={v._id}>{v.name}</li>)
        });
        return components
    }
    tabOnChange = (activeKey: any) => {
        this.setState({activeKey})
    }
    render() {
        return (
            <div className="javaList">
                <Tabs onChange={this.tabOnChange} activeKey={this.state.activeKey} type="card" tabBarGutter={ 50 }>
                    {this.state.tabList.map(pane => <TabPane className="tabs_Panes" tab={pane.name} key={pane._id} forceRender={false} closable={pane.closable}>
                        {this.setPackDom(pane.name)}
                    </TabPane>)}
                </Tabs>
            </div>
        )
    }
}