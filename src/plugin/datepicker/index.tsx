import React, {Component} from 'react'
import Picker from './picker'
import ProtoType from 'prop-types'
import errors from '../../components/404';

export default class DatePick extends Component {
    render() {
        return (
            <div>
                <Picker />
            </div>
        )
    }
}
