import React from 'react'
import PropTypes from 'prop-types';

interface Dateinput {
    selectedValue: object
}
interface Dateinputstate {
    str: any
}

export default class DateInput extends React.Component<Dateinput, Dateinputstate>{
    static propTypes = {
        selectedValue: PropTypes.any,
    }

    constructor(props: Dateinput) {
        super(props)
        this.state = {
            str: this.props.selectedValue
        }
    }

    public dateInputInstance: Element

    saveDateInput = (dateInput: Element) => {
        this.dateInputInstance = dateInput
    }

    onInputChange = () => {
        console.info('change')
    }

    render() {
        const {str} = this.state
        return (
            <div className="data-input">
                <input ref={this.saveDateInput} className="cls-input" value={str} onChange={this.onInputChange} />
            </div>
        )
    }
}