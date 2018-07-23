import React from 'react';
import styled from 'styled-components';
import propsType from 'prop-types';

export default class List extends React.Component{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <ListMain>
                <ul>
                    <li>1111</li>
                    <li>2222</li>
                    <li>3333</li>
                    <li>4444</li>
                    <li>5555</li>
                </ul>
            </ListMain>
        )
    }
}

const ListMain = styled.div`
    width: 100%;
    ul{
        margin: 20px 0; 
        background-color: #eee;
        li{
            min-height: 100px;
            margin-bottom: 20px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.06), 0 1px 5px 0 rgba(0,0,0,0.12);
        }
    }
`