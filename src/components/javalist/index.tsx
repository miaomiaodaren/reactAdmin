import * as React from 'react';
import { connect } from 'react-redux';
import { isArrayLislk, each, gettype } from '../../util/util'
import { typelistedit } from '../../model/actions/blog';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import CssList from './csslist';
import JsList from './jslist';
import html from './html';

import { mainStateType } from '../../model/reducers/jstt'

interface JAVAPROPS {
    BlogList?: any,
    saveType?: any,
    dispatch?: any
    csstts?: mainStateType
}

class JavaList extends React.Component<JAVAPROPS, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tabList: [],
            activeKey: '',
            selectInfo : this.props.csstts.name[0]
        }
    }
    componentWillMount() {
        const typeList = this.props.saveType;
        //如果分类没有存在props中，则调中一次，并且存到props中
        if(!isArrayLislk(typeList)) {
            typelistedit({}, (data: any) => {
                this.setState({
                    tabList: this.packComponent(data.result.res) || [],
                    activeKey: data.result.res[0]._id
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
        each(temp, (v: any, i: number) => {
            v['content'] = v.name
        })
        return temp
    }
    //那传过来的name跟带有组件的obj进行对比，生成符合条件的真实DOM。
    setPackDom = (temp: any) => {
        const tempList: any = {
            'css': CssList,
            'javascript': JsList,
            html
        };
        const Istemp = tempList[temp];
        if(!Istemp) {
            return temp
        }
        return (<Istemp title={temp}></Istemp>)
    }
    setTypeDom = (typelist: any) => {
        //动态生成分类的列表数据
        let components: any[] = [], list = typelist.list, len = typelist.count, comHtml= null;
        if(!isArrayLislk(list)) return components;
        each(list, (v: any, i: number) => { 
            components.push(<li key={v._id}>{v.name}</li>)
        });
        return components
    }
    tabOnChange = (activeKey: any) => {
        this.setState({activeKey})
    }
    render() {
        const { csstts } = this.props;
        return (
            <div className="javaList">
                <Tabs onChange={this.tabOnChange} activeKey={this.state.activeKey} type="line" tabPosition="left">
                    {this.state.tabList.map((pane: any) => <TabPane className="tabs_Panes" tab={pane.name} key={pane._id} forceRender={false} closable={pane.closable}>
                        <div className="css_list_warptop" key={this.state.activeKey}>
                            { (() => {
                                const components: any[] = [];
                                csstts['name'].map((item: string, index: number) => {
                                    components.push(<div key={item} className="csslist_top">
                                        <div className="info_tab_header" onClick={() => {this.setState({selectInfo: item})}}>{item}</div>
                                        {item === this.state.selectInfo ? <div className="info_tab_main">this is {this.state.selectInfo}</div> : void 0}
                                    </div>)
                                })
                                return components
                            })()}
                        </div>
                        {this.setPackDom(pane.name)} 
                    </TabPane>)}
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    BlogList: state.saveBlogList,
    saveType: state.saveType,
    csstts: state.CssTtReducer
})

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
}

export default connect(mapStateToProps)(JavaList)