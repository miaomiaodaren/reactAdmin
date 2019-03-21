import * as React from 'react'

import CountDown from './countDown'

const Cdemo = (props: any) => {
    const targetTime = new Date().getTime() + 3900000;
    return (<div>
        <CountDown target={targetTime}></CountDown>
    </div>)
}

export default Cdemo