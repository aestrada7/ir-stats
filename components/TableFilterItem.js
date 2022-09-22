import React, { useContext } from 'react';

import { TableFilterContext } from '../services/TableFilterContext';

const TableFilterItem = (props) => {
    const context = useContext(TableFilterContext);
    const { property, caption, kind, min, max, isRange, rangeConn } = props;

    const buildFilter = (field, kind, lowerBound, upperBound) => {
        let currentFilters = context.filter;
        if(currentFilters == {} || currentFilters[field] == null) {
            currentFilters[field] = {};
        }
        if(lowerBound > -1) currentFilters[field].lowerBound = lowerBound;
        if(upperBound > -1) currentFilters[field].upperBound = upperBound;
        if(kind) currentFilters[field].kind = kind;

        context.setFilter({...currentFilters});
    }

    switch(kind) {
        case "number": {
            return(
                <div className="filter-item">
                    <div className="caption">{caption}</div>
                    <input type={kind} min={min} max={max} onChange={(e) => buildFilter(property, kind, e.target.value, -1)}></input>
                    {isRange ? 
                        <React.Fragment>
                            <span> {rangeConn} </span>
                            <input type={kind} min={min} max={max} onChange={(e) => buildFilter(property, kind, -1, e.target.value)}></input>
                        </React.Fragment>
                    : ''}
                </div>
            );
        }
    }
}

export default TableFilterItem;