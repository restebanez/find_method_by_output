import React from 'react'

const FilterByOuputType = ({queryCollection, queryElement, subCollection, transformCollection, transformElements, onFilterClick}) => (
    <fieldset>
        <legend>By Output Type</legend>
        <div>
            <input type="checkbox" id="queryCollection" name="outputType" value="QueryCollection"
                   checked={queryCollection} onClick={() => onFilterClick("QueryCollection")} />
            <label htmlFor="queryCollection">Query Collection</label>
        </div>
        <div>
            <input type="checkbox" id="queryElement" name="outputType" value="QueryElement"
                   checked={queryElement} onClick={() => onFilterClick("QueryElement")}/>
            <label htmlFor="queryElement">Query Element</label>
        </div>
        <div>
            <input type="checkbox" id="subCollection" name="outputType" value="SubCollection"
                   checked={subCollection} onClick={() => onFilterClick("SubCollection")}/>
            <label htmlFor="subCollection">Sub Collection</label>
        </div>
        <div>
            <input type="checkbox" id="transformCollection" name="outputType" value="TransformCollection"
                   checked={transformCollection} onClick={() => onFilterClick("TransformCollection")} />
            <label htmlFor="transformCollection">Transform Collection</label>
        </div>
        <div>
            <input type="checkbox" id="transformElements" name="outputType" value="TransformElements"
                   checked={transformElements} onClick={() => onFilterClick("TransformElements")}  />
            <label htmlFor="transformElements">TransformElements</label>
        </div>
    </fieldset>)

export default FilterByOuputType
