import * as React from 'react';
import * as PropTypes from 'prop-types';

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
    }

    componentDidMount() {
        console.info(this.props.children);
        // document.documentElement.addEventListener('scroll', () => {
        //     const scrtop = document.documentElement.scrollTop;
        // })
    }

    getref = () => {
        const {children} = this.props;
        return React.cloneElement(children, {ref: 'sticky'})
    }

    render() {
        return (
            <React.Fragment>
                {this.getref()}    
            </React.Fragment>
        )
    }
}