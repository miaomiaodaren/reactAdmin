import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'


interface BaseProps {
    seleceValue: any
}

export default class BasePicker extends React.Component<BaseProps>{
    static protoType = {
        seleceValue: PropTypes.object
    }
    static defaultProps = {
        seleceValue: ''
    }
    constructor(props: BaseProps) {
        super(props)
        this.state = {

        }
    }

    inputfocus = () => {
        return
    }

    render() {
        const {seleceValue} = this.props;
        return (
            <div>
                <div className="picker_warring">
                    <div className="picker_input">
                        <input type="text" value={seleceValue} onFocus={this.inputfocus}></input>
                    </div>
                </div>
            </div>
        )
    }
}