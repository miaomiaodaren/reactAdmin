import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classList from 'classnames';


function assign(to:any, from:any) {
    for (const key in from) {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }
}

function getComputedStyle(el:any, key:any) {
    const computedStyle = window.getComputedStyle(el);
    return computedStyle[key] || '';
}

// https://github.com/xshua06/rmc-picker/blob/master/src/Picker.jsx#L218
export default class Pick extends React.Component<any, any> {
    static defaultProps = {
        prefixCls: 'rmc-picker',
        pure: true,
        disabled: false,
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool,
        pure: PropTypes.bool,
            
    }

    constructor(props: any) {
        super(props)
        this.state = {
            selectedValue: ''   //选中的值
        }
    }

    init() {
        assign(this, {
            isTracking: false,
            didDecelerationComplete: false,
            isDragging: false,
            isDecelerating: false,
            isAnimating: false,
            clientHeight: 0,
            contentHeight: 0,
            itemHeight: 0,
            scrollTop: 0,
            minScrollTop: 0,
            maxScrollTop: 0,
            scheduledTop: 0,
            lastTouchTop: 0,
            lastTouchMove: 0,
            positions: [],
            minDecelerationScrollTop: 0,
            maxDecelerationScrollTop: 0,
            decelerationVelocityY: 0,
        });
        const { indicator, component, content } = this.refs;
        this.itemHeight = parseInt(getComputedStyle(indicator, 'height'), 10);
        console.info(this, 888);
    }

    componentDidMount() {
        this.init()
        
    }

    render() {
        console.info(this, 44444);
        const { children, prefixCls } = this.props;
        const { selectedValue } = this.state;
        const itemClassName = `${prefixCls}-item`
        const selectedItemClassName = classList(itemClassName,  `${prefixCls}-item-selected`);
        const items = children.map((item: any) => {
            return(
                <div className={selectedValue === item.value ? selectedItemClassName : itemClassName}
                    key={item.value} data-value={item.vlaue}>
                    {item.label}
                </div>
            )
        })
        console.info(items, 6666);
        return (<div className={`${prefixCls}`} data-role="component" ref="component">
            <div className={`${prefixCls}-mask`} data-role="mask"/>
            <div className={`${prefixCls}-indicator`} data-role="indicator" ref="indicator"/>
            <div className={`${prefixCls}-content`} data-role="content" ref="content">
                {items}
            </div>
        </div>);
    }
}