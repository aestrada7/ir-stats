import React from 'react';

import { decode } from '../services/Common';

class TableItem extends React.Component {
    render() {
        const { val, defaultVal, columns, children, isResult, fieldToSortBy, sortingBy, order, parent, className } = this.props;
        return (
            <div className={`table-item ${isResult ? `res-${val}` : ''} col-${columns} ${className ?? ''}`}>
                {isResult ? 
                    <div className="res-field"><div>{decode(val) || defaultVal || children}</div></div>
                    :
                    <span>{decode(val) || defaultVal || children}</span>
                }
                {fieldToSortBy ?
                    <React.Fragment>
                        <button className={`sort-button descending ${sortingBy == fieldToSortBy && order == "ASC" ? 'toggled' : ''}`}
                                onClick={() => parent.sortBy(fieldToSortBy, "ASC")}></button>
                        <button className={`sort-button ascending ${sortingBy == fieldToSortBy && order == "DESC" ? 'toggled' : ''}`}
                                onClick={() => parent.sortBy(fieldToSortBy, "DESC")}></button>
                    </React.Fragment>
                    : ""
                }
            </div>
        );
    }
}

export default TableItem;