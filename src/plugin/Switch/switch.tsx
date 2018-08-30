import React, {Component, ReactElement} from 'react'
import PropTypes from 'prop-types'

type SwitchProp = {
    defaultChecked?: boolean,
    disabled?: boolean,
    checked?: boolean,
    onChange?: (check: boolean) => void
}

type SwitchState = {
    swt_check: boolean
}


export default class Switch extends Component<SwitchProp, SwitchState> {
    static propType = {
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        onChange: PropTypes.func
    }

    static defaultProp = {
        defaultChecked: false,
        disabled: false,
        checked: false
    }

    private switch: HTMLDivElement

    constructor(props: SwitchProp) {
        super(props)

        let swt_check = false;
        swt_check = props.checked || props.defaultChecked ? true : false
        this.state = { swt_check }
    }

    hasChange = () => {

    }

    componentWillReceiveProps(nextProps: SwitchProp) {
        console.log(1111)
    }

    toggleactive = (value?: boolean) => {
        console.info(this)
        const {disabled, onChange, checked} = this.props;
        if(!disabled) {
            if(checked) {
                this.setState({swt_check: checked});
                return false
            }
            this.setState((proState: SwitchState) => {
                return {swt_check: value != void 0 ? value : !proState.swt_check}
            }, () => {
                onChange && onChange(this.state.swt_check)
            })
        }
    }

    selkey= (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === 37) { // Left
            this.toggleactive(false);
          } else if (event.keyCode === 39) { // Right
            this.toggleactive(true);
          } else if (event.keyCode === 32 || event.keyCode === 13) { // Space, Enter
            this.toggleactive();
          }
    }

    addnode = (node: HTMLDivElement) => {
        this.switch = node
    }

    render() {
        const {checked, disabled, defaultChecked} = this.props;
        const {swt_check} = this.state
        return (
            <div className="switch_main">
                 <div className={`switch ${(swt_check) ? 'active' : ''} ${disabled ? 'disabled' : ''}`} 
                    onKeyDown={this.selkey}
                    onClick={() => this.toggleactive()}>
                    ref={this.addnode}
                    <div className={`switch_active`}></div>
                 </div>
            </div>
        )
    }
}