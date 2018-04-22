import * as React from 'react';
import { connect } from "react-redux";
import { isEmptyObject } from '../../util/util'
import { testAction } from '../../model/actions/jstt'

interface PROPS {
    saveType?: {count?: number, list?: Array<any>},
    BlogList?: any,
    dispatch?: any,
}

class jsList extends React.Component<PROPS, any> {
    constructor(props: any) {
        super(props)
    }
    componentWillMount() {
        
    }
    render() {
        return (
            <div>jslist</div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    BlogList: state.saveBlogList,
    saveType: state.saveType,
    jslist: state.CssTtReducer,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
}


export default connect(mapStateToProps)(jsList)