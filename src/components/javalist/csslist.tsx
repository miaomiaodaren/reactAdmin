import * as React from 'react';
// import cssJson from './css.json';
import { Button } from 'antd';
import { isArrayLislk, each, gettype } from '../../util/util';
import { csstt, cssAttrAction } from '../../model/actions/jstt';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';


import { createAjaxAction } from '../../util/index'
import { getLineAge } from '../../api/api'

// @withRouter

interface PROPS {
    csstts?: any,
    cssattr?: any,
    dispatch: any,
    createAjaxAction?: any,
}

class csslist extends React.Component<PROPS, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            cssType: {}
        }
    }
    componentWillMount() {
    }
    cerateCssDom = () => {
        //动态生成css列表的dom
        let temps: any[] = [], temp;
        each(require('./css.json'), (v: any, i: number) => {
            let con = v['content'];
            let child: any[] = []; 
            each(con, (j: any, k: number) => {
                child.push(<li className="css_li_style" key={ k }><Link to={ `/lineage/${j}` }>{ j }</Link></li>)
            })
            temps.push(<section key={ v.title } id={ v.title }><h3>{ v.title }</h3>
                <ul>
                    { child }
                </ul>
            </section>);
        });
        return temps
    }
    render() {
        return(
            <div className="csslist">
                {/* <Button type="primary" onClick={() => this.props.createAjaxAction()}>Primary</Button>
                <Button type="primary" onClick={() => console.info(this.props)}>showProps</Button> */}
                <section id="cssbd">
                    {this.cerateCssDom()}
                </section>
            </div>
        )
    }
}

const mapStateToProps  = (state: any) => ({
    csstts: state.CssTtReducer,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        csslists: () => {
            dispatch(csstt())
        },
        cssattr: () => {
            dispatch(cssAttrAction('top'))
        },
        createAjaxAction: () => createAjaxAction(getLineAge, '', cssAttrAction)({title: 'top'})(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(csslist)