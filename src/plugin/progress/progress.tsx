import * as React from 'react'
import * as classnames from 'classnames'
import * as ProtType from 'prop-types'

export interface PROPS {
    type?: 'line' | 'circle'
}


export default class progress extends React.Component<PROPS, any> {
    static propTypes = {
        type: ProtType.string
    }
    static defaultProps = {
        type: 'line'
    }
    constructor(props: any) {
        super(props)
    }

    handleChange = (v: string) => {
        console.info(v)
    }

    render() {
        const {type} = this.props;
        let csslist = classnames('progress', `progress-${type}`)
        return (
            <div className={csslist}>
                12312312
            </div>
        )
    }
}