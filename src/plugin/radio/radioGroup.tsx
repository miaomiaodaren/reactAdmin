import * as React from 'react';
import * as ProtType from 'prop-types';
import * as ReactDom from 'react-dom';
import Radio from './radio'

export interface RadioProps {
    value?: any,
    onChange?: any,
    name?: any,
    options?: any[],
}

export default class RadioGroup extends React.Component<RadioProps, any> {
    static propTypes = {
        value: ProtType.any,                    //根据值来判断是否选中
        onChange: ProtType.any,
        name: ProtType.string,
        options: ProtType.array,
    };
    static defaultProps = {
    }
    constructor(props: RadioProps) {
        super(props)
        this.state = {
            value: void 0
        }
    }

    componentDidMount() {
        const {value} = this.props;
        this.setState({value})
    }

    render() {
        const {children, onChange, name, options} = this.props;
        const {value} = this.state;
        let cMap: any[] = [], 
            len: number = React.Children.count(children);
        if(len) {
            React.Children.map(children, (item: any, index: number) => {
                cMap.push(React.cloneElement(item, {
                    checkedVal: value,
                    handChange: (val: any) => {this.setState({value: val}, () => { onChange && onChange(this.state.value)})},
                    key: index,
                    name: name
                }))
            })
        } else if(options) {
            options.map((item: any, index: number) => {
                let val = typeof item === 'string' ? item : item.value;
                cMap.push(<Radio key={index} checkedVal={value} value={val} handChange={(val: any) => {this.setState({value: val}, () => { onChange && onChange(this.state.value)})}}>{item.label || item.value || item}</Radio>)
            })
        }
        return (
            <label>
                <label className="radio-Group">
                    {cMap }
                </label>
            </label>
        )
    }
}