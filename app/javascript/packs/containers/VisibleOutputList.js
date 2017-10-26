import OutputList from '../components/OutputList'
import { connect } from 'react-redux'

const getVisibleMethodExamples = (items, filter) => {

    return items.filter(item => !filter.outputTypes.includes(item.outputType))
}

const mapStateToProps = state => {
    return {
        items: getVisibleMethodExamples(state.methodExamples.items, state.visibilityFilter)
    }
}

const VisibleOutputList = connect(mapStateToProps)(OutputList)
export default VisibleOutputList