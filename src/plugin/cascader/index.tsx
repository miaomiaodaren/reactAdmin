import * as React from 'react'
import Cascader from './cascader'

class Cas extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            options: [{
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                }],
            }, {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    }],
                }],
            }]
        }
    }
    
    render() {
        const {options} = this.state;
        return (
           <div>
               <Cascader option={options} />
           </div>
        )
    }
}

export default Cas