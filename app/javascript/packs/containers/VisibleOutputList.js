import OutputList from '../components/OutputList'
import { connect } from 'react-redux'

const getVisibleMethodExamples = (items, filter) => {
    switch(filter.ouputType) {
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

const VisibleOuputList = connect(mapStateToProps)(OutputList)
export default VisibleOuputList