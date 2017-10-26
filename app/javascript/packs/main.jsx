import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Filter from './containers/Filter';
import VisibleOutputList from './containers/VisibleOutputList'
import { Provider,connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export const REQUEST_METHOD_EXAMPLES = 'REQUEST_METHOD_EXAMPLES'
export const RECEIVE_METHOD_EXAMPLES_SUCCESS = 'RECEIVE_METHOD_EXAMPLES_SUCCESS'
export const RECEIVE_METHOD_EXAMPLES_FAILURE = 'RECEIVE_METHOD_EXAMPLES_FAILURE'
export const TOGGLE_OUTPUT_TYPE_FILTER = 'TOGGLE_OUTPUT_TYPE_FILTER'


const methodExamplesReducer = (state = {fetching: false, action: "Never fetched", items: []}, action) => {
    switch(action.type){
        case REQUEST_METHOD_EXAMPLES:
            return  { ...state,
                action: "Fetching Method Examples...",
                fetching: true }
        case RECEIVE_METHOD_EXAMPLES_SUCCESS:
            return { ...state,
                action: "Method Examples fetched",
                items: action.items,
                fetching: false }
        default:
            return state
    }
}



const visibilityFilterReducer = (state = {outputTypes: []}, action) => {
    switch(action.type){
        case TOGGLE_OUTPUT_TYPE_FILTER:
            const index = state.outputTypes.indexOf(action.filterName)
            if (index === -1){
                return {
                    ...state,
                    outputTypes: [...state.outputTypes, action.filterName]}
            } else {
                return {
                    ...state,
                    outputTypes: [...state.outputTypes.slice(0, index),
                                 ...state.outputTypes.slice(index + 1)]}
            }

        default:
            return state
    }
}

const rootReducer = (state = {}, action) => {
    return {
        methodExamples: methodExamplesReducer(state.methodExamples, action),
        visibilityFilter: visibilityFilterReducer(state.visibilityFilter, action)
    }

}

const loggerMiddleware = createLogger()

function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            )
        )

    )
}




function requestMethodExamples(){
    return {type: REQUEST_METHOD_EXAMPLES}
}

function receiveMethodExamplesSuccess(jsonMethodExamples){
    return {
        type: RECEIVE_METHOD_EXAMPLES_SUCCESS,
        items: jsonMethodExamples.methodExamples
    }
}

function fetchMethodExamples(){
    return dispatch => {
        dispatch(requestMethodExamples())
        return fetch("/api/v0/method_examples")
            .then(response => response.json())
            .then(jsonMethodExamples => dispatch(receiveMethodExamplesSuccess(jsonMethodExamples)))
    }
}



class Ui extends Component {
    constructor(props) {
        super(props)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchMethodExamples())
    }

    handleRefreshClick(e) {
        e.preventDefault()
        this.props.dispatch(fetchMethodExamples())
    }

    render(){
        const { action, fetching, items } = this.props.methodExamples
        return (
            <div className="reactApp">
                <div className="head">
                    <h3 className="input-data-first-text">Given: {fetching && " Loading..."}</h3>
                    <h1 className="input-data-value">
                        <code className="ruby-code">{ items && items[0] && items[0]["ArrayOfNumbersExample1InputData"] } </code>
                    </h1>
                    <h2 className="input-data-target-text">I WANT AN OUTPUT THAT LOOKS LIKE THIS</h2>
                </div>
                <div className="status-fetch">
                    <p className="status-fetch-message">{action}</p>
                    <button className="status-fetch-button" onClick={this.handleRefreshClick}>Fetch MethodExamples</button>
                </div>
                <VisibleOutputList />
                <aside className="filter">
                    <h3 className="filter-header">Filter Section</h3>
                    <Filter />
                </aside>
            </div>)
    }
}

function mapStateToProps(state){
    return {methodExamples: state.methodExamples}
}

const AsyncUI = connect(mapStateToProps)(Ui)


const store = configureStore()

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncUI />
            </Provider>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Root  />,
        document.body.appendChild(document.createElement('div')),
    )
})
