interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    mozCancelAnimationFrame: any;
    mozRequestAnimationFrame: any;
    oCancelAnimationFrame: any;
    oRequestAnimationFrame: any;
    msCancelAnimationFrame: any;
    msRequestAnimationFrame: any;
}

declare module "*.png" {
    const url: string;
    export = url;
}

declare module "*.gif" {
    const url: string;
    export = url;
}

declare module "*.jpg" {
    const url: string;
    export = url;
}

declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module 'rc-cascader';

declare module 'classnames';

declare module 'redux-devtools'
declare module 'redux-devtools-log-monitor'
declare module 'redux-devtools-dock-monitor'

declare module 'qs';
declare module 'react-color';

declare module 'lodash';

declare module 'animated';


declare module 'react-cropper'