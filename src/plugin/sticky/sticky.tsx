import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {debounce} from '../../util/util';

let count = 3000;

const StickyMain = styled.div`
    display: inherit;
`

export default class Sticky extends React.Component<any, any> {
    static propTypes = {
        offset: PropTypes.number,
        direction: PropTypes.string,
    }

    static defaultProps = {
        offset: 0,          //距离多少的时候停下
        direction: 'top'
    }

    constructor(props: any) {
        super(props)
        this.state = {
            position: '',
            martop: 0,
            domwidth: '',
            domheight: ''
        }
    }

    public active: boolean = false

    componentWillMount() {

    }

    changestyle = (edit: boolean) => {
        this.setState({
            position: edit ? 'fixed' : 'static',
            top: edit ? this.props.offset : 0,
            domwidth: (this.refs.sticky as HTMLElement).getBoundingClientRect().width,
            domheight: (this.refs.sticky as HTMLElement).getBoundingClientRect().height,
        })
    }

    componentDidMount() {
        const domtop = (this.refs.sticky as HTMLElement).getBoundingClientRect().top;
        const oldscrtop = document.documentElement.scrollTop;
        document.addEventListener('scroll', debounce(() => {
            const scrtop = document.documentElement.scrollTop;
            if(scrtop > (domtop + oldscrtop) - this.props.offset) {
                this.changestyle(true);
                return false
            } else {
                this.changestyle(false)
            }
        }, 10, true))
    }

    render() {
        const {position, martop, domwidth, domheight} = this.state;
        return (
            <div ref='sticky' style={{'position': position, 'top': martop, 'width': domwidth, 'height': domheight, 'zIndex': count}}>
                {this.props.children}
            </div>
        )
    }
}