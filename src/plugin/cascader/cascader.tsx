import * as React from 'react'
import CascaderMenu from './menu'
import * as PropTypes from 'prop-types'


import PopperJS from 'popper.js'
import { findDOMNode } from 'react-dom'
const ClickOutside = require('react-click-outside');

interface State {
    menu?: any,
    menuVisible: boolean,
    inputValue: any,
}

class Cas extends React.Component<any, State> {
    public popperJS: any
    constructor(props: any) {
        super(props);
        let initialValue = [];
        if ('value' in props) {
            initialValue = props.value || [];
        } else if ('defaultValue' in props) {
            initialValue = props.defaultValue || [];
        }
        this.state = {
            menuVisible: false,             //判断弹出框是否显示的状态
            inputValue: '',                 //输入框的当前值
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClick = () => {
        const { menuVisible } = this.state
        if(!menuVisible) {
            this.setState({
                menuVisible: true,
            })
        }
    }

    componentDidMount() {
        console.info(this.context, 'sss')
    }

    componentDidUpdate(props: Object, state: State) {
        const { menuVisible } = this.state
        const {inputs, menu} = this.refs;
        if(state.menuVisible != menuVisible) {
            if(menuVisible) {
                if(!this.popperJS) {
                    this.popperJS = new PopperJS((findDOMNode(inputs)as any), (findDOMNode(menu)as any), {
                        modifiers: {
                            applyStyle: {
                                gpuAcceleration: false,
                            }
                        },
                        placement: 'top',
                    })
                } else {
                    this.popperJS.update();
                }
            } else {
                if(this.popperJS) {
                    this.popperJS.destroy();
                    delete this.popperJS
                }
            }
        }
    }
    showMenu = () => {
        
    }

    handleClickOutside() {
        if (this.state.menuVisible) {
          this.setState({ menuVisible: false });
        }
    }

    render() {
        const {inputValue, menuVisible} = this.state
        return (
            <label onClick={this.handleClick}>
                <span ref="inputs">
                    <input defaultValue={inputValue} />
                </span>
                {menuVisible ? <CascaderMenu ref="menu" options={this.props.option} /> : ''}
            </label>
        )
    }
}

export default ClickOutside(Cas)