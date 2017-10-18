import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export const REQUEST_METHOD_EXAMPLES = 'REQUEST_METHOD_EXAMPLES'
export const RECEIVE_METHOD_EXAMPLES_SUCCESS = 'RECEIVE_METHOD_EXAMPLES_SUCCESS'
export const RECEIVE_METHOD_EXAMPLES_FAILURE = 'RECEIVE_METHOD_EXAMPLES_FAILURE'

const rootReducer = (state = {methodExamples: {fetching: false, action: "Never fetched", items: []}}, action) => {
    switch(action.type){
        case REQUEST_METHOD_EXAMPLES:
            return {...state,
                methodExamples: {...state.methodExamples,
                    action: "Fetching Method Examples...",
                    fetching: true}}
        case RECEIVE_METHOD_EXAMPLES_SUCCESS:
            return {...state,
                methodExamples: {...state.methodExamples,
                    action: "Method Examples fetched",
                    items: action.items,
                    fetching: false}}
        default:
            return state
    }
}

const loggerMiddleware = createLogger()

function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
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

const OutputList = (props) => (
    <main className="output-data-items">
        {props.items.map((item, i) =>
            <ul key={i} className="output-data-item">
                <li className="output-data-value"> <pre className="ruby-code"> { item.ArrayOfNumbersExample1OutputData } </pre> </li>
                <li className="output-data-explanation"> { item.ArrayOfNumbersExample1Explanation } </li>
            </ul>
        )}
    </main>
)

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
                <OutputList items={items}/>
                <aside className="filter">
                    <h3 className="filter-header">Filter Section</h3>
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
