import {injectGlobal, css} from 'styled-components'

const px2rem = (pxValue: any) => {
    return 1 / 75 + 'rem';
}
  
injectGlobal`
    .fufeng{
        width: 200px;
    }
`