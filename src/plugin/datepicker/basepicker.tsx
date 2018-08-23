import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'


import DateTable from './data/DataTable';


interface BaseProps {
    seleceValue: any
}

export default class BasePicker extends React.Component<BaseProps, any>{
    static protoType = {
        seleceValue: PropTypes.object
    }
    static defaultProps = {
        seleceValue: ''
    }
    constructor(props: BaseProps) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    inputfocus = () => {
        console.info(22);
    }

    render() {
        const {seleceValue} = this.props;
        const {date} = this.state;
        return (
            <div>
                <div className="picker_warring">
                    <div className="picker_input">
                        <input type="text" value={seleceValue} onFocus={this.inputfocus}></input>
                    </div>
                    <div className="picker_table">
                        <DateTable value={seleceValue} data={date}/>
                    </div>
                </div>
            </div>
        )
    }
}