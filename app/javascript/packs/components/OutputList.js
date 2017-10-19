import React, { Component } from 'react'
import PropTypes from 'prop-types'

const OutputList = ({items}) => (
    <main className="output-data-items">
        {items.map((item, i) =>
            <ul key={i} className="output-data-item">
                <li className="output-data-value"> <pre className="ruby-code"> { item.ArrayOfNumbersExample1OutputData } </pre> </li>
                <li className="output-data-explanation"> { item.ArrayOfNumbersExample1Explanation } </li>
            </ul>
        )}
    </main>
)

OutputList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            ArrayOfNumbersExample1OutputData: PropTypes.string.isRequired,
            ArrayOfNumbersExample1Explanation: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}

export default OutputList
