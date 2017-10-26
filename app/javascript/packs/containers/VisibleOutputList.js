import OutputList from '../components/OutputList'
import { connect } from 'react-redux'

const getVisibleMethodExamples = (items, filter) => {
    switch(filter.outputType) {
        case 'Any':
            return items
        default:
            return items

    }
}

const mapStateToProps = state => {
    return {
        items: getVisibleMethodExamples(state.methodExamples.items, state.visibilityFilter)
    }
}

const VisibleOutputList = connect(mapStateToProps)(OutputList)
export default VisibleOutputList