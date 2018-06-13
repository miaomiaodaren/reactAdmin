import * as React from 'react';
import Select from './select';
import Option from './options';
import * as PropTypes from 'prop-types';

interface optionsItem {
    value: string,
    label: string,
    disabled?: boolean
}


class SelectDemo extends React.Component<any, any> {
    static propTypes = {
        defaultValue: PropTypes.any
    }
    constructor(props: any) {
        super(props)
        this.state = {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶',
                disabled: true
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: [],
        };
    }
    
    closeModel = () => {
        this.setState({
            toggle: false
        })
    }
    selChange = (value:string) => {
        this.setState({ value })
    }
    render() {
        const {value, options} = this.state;
        return (
            <div>
                {/* <Select value={value} onChange={this.selChange}>
                    {options.map((item: optionsItem, index: number) => {
                        return <Option value={item.value} key={item.value} label={item.label} disabled={item.disabled}></Option>
                    })}
                </Select> */}
                <p></p>
                <Select value={value} onChange={this.selChange} multiple={true}>
                    {options.map((item: optionsItem, index: number) => {
                        return <Option value={item.value} key={item.value} label={item.label} disabled={item.disabled}></Option>
                    })}
                </Select>
            </div>
        )
    }
}

export default SelectDemo