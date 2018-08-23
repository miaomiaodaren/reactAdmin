import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// function getFirstDayOfMonth(date: any) {
//     const temp = new Date(date.getTime());
//     temp.setDate(1);
//     return temp.getDay();
// }

export default class DateTable extends React.Component<any, any> {
    static defaultProps = {
        firstDayOfWeek: 0
    }
    constructor(props: any) {
        super(props)
        this.state = {
            tableRows: [[], [], [], [], [], []],
        }
    }

    WEEKS = () => {
        const week = this.getOffsetWeek();
        return WEEKS.slice(week).concat(WEEKS.slice(0, week));
    }

    getOffsetWeek(){
        return this.props.firstDayOfWeek % 7;
    }

    getMarkedRangeRows = () => {
        const rows = this.getRows();
    }
    
    getRows = () => {
        const {tableRows} = this.state;
        const {date} = this.props;
        const ndate = new Date(date.getTime());
        let day = getFirstDayOfMonth(ndate); // day of first day
    }

    render() {
        return (
            <Date>
                <table>
                    <tbody>
                        <tr>
                            { this.WEEKS().map((e, idx)=> <th key={idx}>{e}</th> )}
                        </tr>
                    </tbody>
                </table>
            </Date>
        )
    }
}

const Date = styled.div`
    table{
        tr{
            th{
                width: 60px;
                text-align: center;
            }
        }
    }
`