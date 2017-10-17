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
    <div className="wrapper">
        {props.items.map((item, i) =>
            <div key={i} className="box-background-color">
                { item.ArrayOfNumbersExample1OutputData }
                <p style={{fontSize: 12}}> { item.ArrayOfNumbersExample1Explanation } </p>
            </div>
        )}
    </div>
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
            <div>
                <h3 className="introduction">Given: {fetching && " Loading..."}</h3>
                <h1 className="introduction box-background-color">
                    <code>{ items && items[0] && items[0]["ArrayOfNumbersExample1InputData"] } </code>
                </h1>
                <h2 className="introduction">I WANT AN OUTPUT THAT LOOKS LIKE THIS</h2>
                <div>
                    <p>{action}</p>
                    <button onClick={this.handleRefreshClick}>Fetch MethodExamples</button>
                    <OutputList items={items}/>
                </div>
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
