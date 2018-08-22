import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BasePicker from './basepicker'


export default class Picker extends BasePicker {
    static protoType = {
        seleceValue: PropTypes.object
    }
    static defaultProps = {
        seleceValue: ''
    }
    constructor(props: any) {
        super(props)
    }
}