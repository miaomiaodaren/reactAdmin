import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TopCompont extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="admin_top">
                大家好,我是喵喵大人
            </div>
        )
    }
}