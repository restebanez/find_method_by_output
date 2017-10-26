import React from 'react'

const FilterByOuputType = () => (
    <fieldset>
        <legend>By Output Type</legend>
        <div>
            <input type="checkbox" id="queryCollection" name="outputType" value="QueryCollection"/>
            <label htmlFor="queryCollection">Query Collection</label>
        </div>
        <div>
            <input type="checkbox" id="queryElement" name="outputType" value="QueryElement"/>
            <label htmlFor="queryElement">Query Element</label>
        </div>
        <div>
            <input type="checkbox" id="subCollection" name="outputType" value="SubCollection"/>
            <label htmlFor="subCollection">Sub Collection</label>
        </div>
        <div>
            <input type="checkbox" id="transformCollection" name="outputType" value="TransformCollection"/>
            <label htmlFor="transformCollection">Transform Collection</label>
        </div>
        <div>
            <input type="checkbox" id="transformElements" name="outputType" value="TransformElements"/>
            <label htmlFor="transformElements">TransformElements</label>
        </div>
    </fieldset>)

export default FilterByOuputType
