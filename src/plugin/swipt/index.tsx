import * as React from 'react'
import * as ProtType from 'prop-types'
import Swiper from './swiper'

export default class SwiperDemo extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                <Swiper>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7<span>8888</span></div>
                    <div>hellowordfdsa</div>
                </Swiper>
            </div>
        )
    }
}