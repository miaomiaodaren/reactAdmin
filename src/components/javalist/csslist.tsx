// import React from 'react';
// import cssJson from './css.json';
// import { Button } from 'antd';
// import { isArrayLislk, each, gettype } from '../../util/util';
// import { csstt } from '../../model/actions/jstt';
// import { bindActionCreators } from 'redux';
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom';

// @withRouter
// @connect(state => ({
//         csstt: state.csstt
//     }), dispatch => ({
//         actions: bindActionCreators(csstt, dispatch)
//     })
// )
// export default class csslist extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             cssType: {}
//         }
//     }
//     componentWillMount() {
//     }
//     cerateCssDom = () => {
//         //动态生成css列表的dom
//         let temps = [], temp;
//         each(cssJson, (v, i) => {
//             let con = v['content'];
//             let child = []; 
//             each(con, (j, k) => {
//                 child.push(<li className="css_li_style" key={ k }><Link to={ `/lineage/${j}` }>{ j }</Link></li>)
//             })
//             temps.push(<section key={ v.title } id={ v.title }><h3>{ v.title }</h3>
//                 <ul>
//                     { child }
//                 </ul>
//             </section>);
//         });
//         return temps
//     }
//     render() {
//         console.info(this.props, 888);
//         return(
//             <div className="csslist">
//                 {/* <Button type="primary" onClick={() => this.props.csstt('sbff')}>Primary</Button> */}
//                 <section id="cssbd">
//                     {this.cerateCssDom()}
//                 </section>
//             </div>
//         )
//     }
// }
