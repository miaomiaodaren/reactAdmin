import * as React from 'react'

interface STATE {
    visible: Boolean,
    activeOption: string,
    selectOption: any[],
}
interface DGArray {
    children?: any[],
    label?: string,
    value?: string
}

export default class CascaderMenu extends React.Component<any, STATE> {
    constructor(props: any) {
        super(props)
        this.state = {
            visible: false,
            activeOption: '',
            selectOption: []
        }
        this.activeChange = this.activeChange.bind(this)
    }

    componentDidMount() {
        // const { options } = this.props;
        // let aa:any[] = [];
        // this.asssa(options, aa);
        // console.info(aa, 54678);
    }

    asssa = (arr: DGArray & any[], aa: any, value: string) => {
        if(arr) {
            arr.map((item: DGArray) => {
                aa.push(item.value);
                if(item.value === value) {
                    return false
                } else {
                    if(item.children) {
                        this.asssa(item.children, aa, value)
                    } else {
                        console.info('2222', aa);
                        aa.length = 0;
                        console.info('3333', aa);
                    }
                }
            })
        }
    }
    setHtml = (menu: any[]) => {
        let items: any[] = [], menus: any[];
        const { options } = this.props;
        for(let i = 0; i < menu.length; i++) {
            options.map((item: any) => {
                if(item.value === menu) {
                    if(item.children) {
                        item.children.map((c_item: any) => {
                            items.push(<li key={c_item.value} onClick={() => this.changeShow(c_item.value)}>{c_item.label}</li>)
                        })
                        // menus.push(<ul>{items}</ul>)
                    }
                }
            })           
        }
    }

    changeShow = (value: string) => {
        const { options } = this.props;
        let menus: any[]= [], items: any[]= [], menuIndex: any[] = [];
        
            options.map((item: any) => {
                items.push(<li key={item.value} onClick={() => this.changeShow(item.value)}>{item.label}</li>)
            })
            menus.push(<ul key="2">{items}</ul>)
        if(value) {
            this.asssa(options, menuIndex, value);
            if(menuIndex.length) {
                // for(let i = 0; i < menuIndex.length; i++) {
                //     this.setHtml(menuIndex[i])
                // }
                this.setHtml(menuIndex)
            }
        }
        return menus
    }

    activeChange(activeOption: any) {
        this.setState({activeOption})
    }

    render() {
        const {options} = this.props;
        const {activeOption} = this.state;
        return (
            <div>{this.changeShow(activeOption)}</div>
        )
    }
}
