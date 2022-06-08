import React, { useContext, useEffect } from 'react';

import { TableFilterContext } from '../services/TableFilterContext';

const TableFilterItem = (props) => {
    const context = useContext(TableFilterContext);
    const { property, caption, kind, min, max, isRange, rangeConn } = props;

    switch(kind) {
        case "number": {
            return(
                <div className="filter-item">
                    <div className="caption">{caption}</div>
                    <input type={kind} min={min} max={max} onChange={(e) => context.setFilter(property, kind, e.target.value, -1)}></input>
                    {isRange ? 
                        <React.Fragment>
                            <span> {rangeConn} </span>
                            <input type={kind} min={min} max={max} onChange={(e) => context.setFilter(property, kind, -1, e.target.value)}></input>
                        </React.Fragment>
                    : ''}
                </div>
            );
        }
    }
}

export default TableFilterItem;