import * as React from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
import RadioGroup from './radioGroup';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
];

export default class RadioDeom extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: 2,
            value2: 3,
            value11: 'Apple',
            value22: 'Apple',
            value33: 'Apple',
        }
    }

    hanChange(val: any) {
        console.info(val, 21312)
    }
    onChange1 = (e:any) => {
        console.log('radio1 checked', e);
        this.setState({
            value11: e
        });
    }
    onChange2 = (e:any) => {
        console.log('radio2 checked', e);
        this.setState({
            value22: e
        });
    }
    onChange3 = (e:any) => {
        console.log('radio3 checked', e);
        this.setState({
            value33: e
        });
    }

    render() {
        let mmy:any = React.createElement('div', {className: 'isfufeng', dataId: 'ff'}, [<input value="333" />, 12312312])
        return (
            <div>
                <RadioGroup value={this.state.value} onChange={this.hanChange.bind(this)}>
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                </RadioGroup>
                <br />
                <RadioGroup name="GroupRadio" value={this.state.value2} onChange={this.hanChange.bind(this)}>
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                </RadioGroup>
                <br />
                <RadioGroup options={plainOptions} onChange={this.onChange1} value={this.state.value11} />
                <br />
                <RadioGroup options={options} onChange={this.onChange2} value={this.state.value22} />
                <br />
                <RadioGroup options={optionsWithDisabled} onChange={this.onChange3} value={this.state.value33} />
            </div>
        )
    }
}
