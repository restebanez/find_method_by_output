import { connect } from 'react-redux'
import FilterByoutputType from '../components/FilterByoutputType'
import { toggleOutputTypeFilter } from '../actions'

const getFilters = (outputTypes) => {
    return {
        queryCollection: outputTypes.includes('QueryCollection'),
        queryElement: outputTypes.includes('QueryElement'),
        subCollection: outputTypes.includes('SubCollection'),
        transformCollection: outputTypes.includes('TransformCollection'),
        transformElements: outputTypes.includes('TransformElements')
    }
}

const mapStateToProps = state => {
    return getFilters(state.visibilityFilter.outputTypes)
}

const mapDispatchToProps = dispatch => {
    return {
        onFilterClick: filterName => {
            dispatch(toggleOutputTypeFilter(filterName))
        }
    }
}

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterByoutputType)
export default Filter
