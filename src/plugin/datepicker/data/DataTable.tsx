import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

//返回当前日期的第一天是星期几
function getFirstDayOfMonth(date: any) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
}

//返回传入的月份一共有几天(判断大小，是否润年)
const getDayCountOfMonth = function (year: number, month: number) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
  
    if (month === 1) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    }
  
    return 31;
};

//返回当前日期是在一年中的第几周
export const getWeekNumber = function (src:any) {
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

function getOffsetToWeekOrigin(day:number, offsetWeek = 0) {
    let offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
    offset = offset === 0 ? 7 : offset // if the two days collide, we force 7 days padding
    return offset
}

function deconstructDate(date:any) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      week: getWeekNumber(date)
    }
}


const DAY_DURATION = 86400000;

const getStartDateOfMonth = function (year:any, month:any, offsetWeek = 0) {
    const result = new Date(year, month, 1);
    const day = result.getDay();
  
    if (day === offsetWeek) {
      result.setTime(result.getTime() - DAY_DURATION * 7);
    } else {
      const offset = getOffsetToWeekOrigin(day, offsetWeek);
      result.setTime(result.getTime() - DAY_DURATION * offset);
    }
  
    return result;
};

const clearHours = function (time: any) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};
  

export default class DateTable extends React.Component<any, any> {
    static defaultProps = {
        firstDayOfWeek: 0,
        showWeekNumber: false,
        minDate: new Date(),
        maxDate: new Date()
    }
    constructor(props: any) {
        super(props)
        this.state = {
            tableRows: [[], [], [], [], [], []],
        }
    }

    componentDidMount() {
        this.getMarkedRangeRows()
    }

    WEEKS = () => {
        const week = this.getOffsetWeek();
        return WEEKS.slice(week).concat(WEEKS.slice(0, week));
    }


    getOffsetWeek(){
        return this.props.firstDayOfWeek % 7;
    }

    getMarkedRangeRows(): any[] {
        const {showWeekNumber, minDate, selectionMode, rangeState} = this.props
        const rows = this.getRows();
        console.info(rows, 'rows');
        return rows;
    }
    
    getRows = () => {
        const {tableRows} = this.state;
        const {date, firstDayOfWeek, showWeekNumber, minDate, maxDate} = this.props;
        const ndate = new Date(date.getTime());
        let day = getFirstDayOfMonth(ndate); // 这个月的第一天是星期几
        const dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth());
        const dateCountOfLastMonth = getDayCountOfMonth(ndate.getFullYear(), (ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1));
        const offsetDaysToWeekOrigin = getOffsetToWeekOrigin(day, firstDayOfWeek);
        const rows = tableRows;
        let count = 1;
        let firstDayPosition;
        const startDate = this.getStartDate();
        
        const now = clearHours(new Date());
        for(let i = 0; i < 6; i++) {
            let row = rows[i];
            for(let j = 0; j < 7; j++) {
                let cell: any = row[showWeekNumber ? j + 1 : j];
                if (!cell) {
                    row[showWeekNumber ? j + 1 : j]  = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
                    cell = row[showWeekNumber ? j + 1 : j]
                }
                cell.type = 'normal';
                const index = i * 7 + j;//current date offset
                const time = startDate.getTime() + DAY_DURATION * index;
                cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
                cell.start = minDate && time === clearHours(minDate);
                cell.end = maxDate && time === clearHours(maxDate);
                const isToday = time === now;
                if (isToday) {
                    cell.type = 'today';
                }
                if (i === 0) {//handle first row of date, this row only contains all or some pre-month dates
                    if (j >= offsetDaysToWeekOrigin) {
                      cell.text = count++;
                      if (count === 2) {
                        firstDayPosition = i * 7 + j;
                      }
                    } else {
                      cell.text = dateCountOfLastMonth - offsetDaysToWeekOrigin + j + 1;
                      cell.type = 'prev-month';
                    }
                } else {
                    if (count <= dateCountOfMonth) {//in current dates
                        cell.text = count++;
                        if (count === 2) {
                            firstDayPosition = i * 7 + j;
                        }
                    } else {// next month
                        cell.text = count++ - dateCountOfMonth;
                        cell.type = 'next-month';
                    }
                  }
                //   cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time), SELECTION_MODES.DAY);
            }
        }
        rows.firstDayPosition = firstDayPosition;
        return rows;
    }

    getStartDate() {
        const ds = deconstructDate(this.props.date)
        return getStartDateOfMonth(ds.year, ds.month, this.getOffsetWeek());
    }

    render() {
        return (
            <DateStyle>
                <table>
                    <tbody>
                        <tr>
                            { this.WEEKS().map((e, idx)=> <th key={idx}>{e}</th> )}
                        </tr>
                        {this.getMarkedRangeRows().map((row, idx) => {
                            return (
                                <tr key={idx} className={'el-date-table__row'}>
                                    {row.map((cell:any, idx:number) => (
                                        <td key={idx}>
                                            {cell.text}
                                        </td>))
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </DateStyle>
        )
    }
}

const DateStyle = styled.div`
    table{
        tr{
            th{
                width: 60px;
                text-align: center;
            }
            td{
                width: 60px;
                text-align: center;
            }
        }
    }
`