import * as React from 'react'
import * as ProtType from 'prop-types'
import Swiper from './swiper'
import Carousel from './carousel'
import CarouselItem from './carouselItem'

export default class SwiperDemo extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                <Carousel>
                    <CarouselItem>1fufeng</CarouselItem>
                    <CarouselItem>2fufeng</CarouselItem>
                    <CarouselItem>3fufeng</CarouselItem>
                    <CarouselItem>4fufeng</CarouselItem>
                    <CarouselItem>5fufeng</CarouselItem>
                </Carousel>
            </div>
        )
    }
}