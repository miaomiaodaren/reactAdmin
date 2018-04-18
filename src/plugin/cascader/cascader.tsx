import * as React from 'react'
import CascaderMenu from './menu'
import { Manager, Target, Popper, Arrow  } from 'react-popper';

interface State {
    menu?: any,
    menuVisible: boolean,
    inputValue: any,
}

class Cas extends React.Component<any, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            menuVisible: false,             //判断弹出框是否显示的状态
            inputValue: '',                 //输入框的当前值
        }
    }
    handleClick = () => {
        const { menuVisible } = this.state
        this.setState({
            menuVisible: !menuVisible,
        })
    }

    componentDidUpdate(props: Object, state: State) {
        const { menuVisible } = this.state
    }
    showMenu = () => {
        
    }
    render() {
        const {inputValue} = this.state
        return (
            <label onClick={this.handleClick} >
                {/* <input ref="input" defaultValue={inputValue} /> */}
                {/* <CascaderMenu ref="menu" /> */}
                <Manager>
                    <Target>
                        <span>312312312312312</span>
                    </Target>
                    <Popper placement="bottom">
                        fffffffffffffffffffffffffffff
                        <Arrow className="popper__arrow" />
                    </Popper>
                </Manager>
            </label>
        )
    }
}

export default Cas

{/* <Manager>
          <Target
            style={{ width: 120, height: 120, background: '#b4da55' }}
            onClick={this.handleClick}
          >
            Click {this.state.isOpen ? 'to hide' : 'to show'} popper
          </Target>
          {this.state.isOpen && (
            <Popper className="popper">
              Popper Content for Toggleable Example
              <Arrow className="popper__arrow" />
            </Popper>
          )}
        </Manager> */}