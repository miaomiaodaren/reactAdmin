import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as enhanceWithClickOutside from 'react-click-outside';
import styled from 'styled-components';
import * as stylelist from 'classnames';
import {Icon} from 'antd';

const SelMain = styled.div`
    width: 250px;
    position: relative;
    .selicon{
        position: absolute;
        right: 10px;
        top: 10px;
    }
`
export const SelInput = styled.input`
    width: 250px;
    height: 40px;
    line-height: 40px;
    borer: 1px solid #ddd;
    &.disabled {
        cursor: no-drop;
    }
`

class Select extends React.Component<any, any> {
    static propTypes = {
        isopen: PropTypes.bool,
        closed: PropTypes.func,
        value: PropTypes.any,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,           
        clearable: PropTypes.bool,
    }
    static defaultProps = {
        isopen: false,
    }
    public Option = ''
    constructor(props: any) {
        super(props)
        this.state = {
            toggle: false,
            defaultval: props.value || '',
            ishover: false
        }
    }

    handleClickOutside() {
        this.setState({
            toggle: false
        })
    }

    hasFocus = (e: any) => {
        e.stopPropagation();
        this.setState((preState: any) => {
            return {
                toggle: !preState.toggle
            }
        })
    }

    setnewComponet = () => {
        let component = [];
        component = React.Children.map(this.props.children, (item: any, index: number) => {
            return React.cloneElement(item, {doChange: this.inputChange, selectValue: this.state.defaultval})
        })
        return component
    }

    inputChange = (value?: any, label?: any) => {
        const {onChange, multiple} = this.props;
        const {defaultval} = this.state;
        this.setState((preState: any) => ({ 
            defaultval: multiple ? preState.defaultval.concat(label) : label,
            toggle: false
        }), () => {
            console.info(this.state.defaultval);
        })
    }

    //mouseOver 鼠标经过
    mouseOver = (e: any) => {
        if(!this.props.clearable) return false
        this.setState({ishover: true})
    }

    mouseOut = (e: any) => {
        if(!this.props.children) return false
        this.setState({ishover: false})
    }

    clearVlue = () => {
        this.inputChange('', '')
    }

    render() {
        const {children, disabled, multiple} = this.props;
        const {toggle, defaultval, ishover} = this.state;
        const clist = stylelist('select', {'disabled': disabled});
        console.info(defaultval, 'isdefault');
        return (
            <SelMain className="select_main">{Array.isArray(defaultval) === true}
                {Array.isArray(defaultval) ? <div className="multiple">
                    {defaultval.map(item => {
                        <span>{item}<i onClick={() => { alert(item) }}>*</i></span>
                    })}
                </div> : ''}
                {ishover && defaultval && !multiple ? <Icon type="close-circle-o" className="selicon" onClick={this.clearVlue} /> : ''}
                <SelInput className={clist} onMouseDown={this.hasFocus} value={defaultval} onChange={() => this.inputChange} disabled={disabled} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} />
                {toggle ? this.setnewComponet() : ''}
            </SelMain>
        )
    }
}

export default enhanceWithClickOutside(Select) 