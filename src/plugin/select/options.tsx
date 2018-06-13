import * as React from 'react';
import * as PropType from 'prop-types';
import styled from 'styled-components';

interface OtProps {
    value: string,
    label: string,
    doChange?: (item: any, label: any) => void,
    disabled?: boolean,
    selectValue?: any
}

const Wrapper = styled.div`
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    width: 150px;
`

const OpLi = styled.li`
    list-style: none;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    &.disabled{
        cursor: no-drop;
        background-color: #ddd;
    }
    &.active{
        background-color: #20a0ff;
        color: #fff;
    }
`

export default class Options extends React.Component<OtProps, any> {
    constructor(props: any) {
        super(props)
    }
    static propType = {
        value: PropType.string,
        label: PropType.string
    }
    liClick = (val: string, label: string) => {
        const {doChange, disabled} = this.props;
        if(disabled) return false
        doChange && doChange(val, label)
    }
    
    render() {
        const {value, label, disabled, selectValue} =this.props;
        return (
            <Wrapper>
                <OpLi className={`${disabled ? 'disabled' : ''} ${(Array.isArray(selectValue) ? selectValue : [selectValue]).indexOf(label) > -1  ? 'active' : ''}`} onClick={() => {this.liClick(value, label)}}>
                    {label}
                </OpLi>
            </Wrapper>
        )
    }
}
