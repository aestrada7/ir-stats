import React from 'react';

import TableFilterItem from './TableFilterItem';

class TableFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        }
    }

    toggleFilters() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const { collapsed } = this.state;

        return (
            <div className="table-filter">
                <button onClick={() => this.toggleFilters()}>{`${collapsed ? 'Show ' : 'Hide '} Filters`}</button>
                <div className={`filter-content ${collapsed ? 'collapsed' : ''}`}>
                    <TableFilterItem property="finishing_position" caption="Finish between" kind="number" min="1" max="26" isRange="true" rangeConn="and"></TableFilterItem>
                    <TableFilterItem property="starting_position" caption="Start between" kind="number" min="1" max="26" isRange="true" rangeConn="and"></TableFilterItem>
                    <TableFilterItem property="led" caption="Laps Led between" kind="number" min="1" max="500" isRange="true" rangeConn="and"></TableFilterItem>
                </div>
            </div>
        );
    }
}

export default TableFilter;