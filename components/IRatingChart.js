import React, { useState, useContext, useEffect } from 'react';

import { VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryClipContainer } from 'victory'; 

import { TableFilterContext } from '../services/TableFilterContext';

const IRatingChart = ({ raceData }) => {
    const context = useContext(TableFilterContext);
    const [ data, setData ] = useState([]);

    const MAX_ENTRIES = 8;
    const DEFAULT_DOT_SIZE = 4;
    const SMALLER_DOT_SIZE = 2;

    const height = 250;
    const dotSize = data.length > MAX_ENTRIES ? SMALLER_DOT_SIZE : DEFAULT_DOT_SIZE;

    const style = {
        data: {
            stroke: "var(--accent-color)"
        },
        labels: {
            fontFamily: "var(--main-font)"
        }
    };

    const animate = {
        duration: 100,
        onLoad: { duration: 1000 }
    };

    useEffect(() => {
        applyFilters();
    }, [context.filter]);

    const applyFilters = () => {
        let filters = context.filter;
        let filteredData = raceData;

        for(let field in filters) {
            if(filters[field].kind === "number") {
                filteredData = filteredData.filter(item => (parseInt(filters[field].lowerBound) > 0 ? item[field] >= filters[field].lowerBound : true) &&
                                                           (parseInt(filters[field].upperBound) > 0 ? item[field] <= filters[field].upperBound : true));
            }
        }
        setData(filteredData.map((item, idx) => ({ x: filteredData.length - idx, y: item.irating })));
    }

    return (
        <div className="chart-container">
            <VictoryChart theme={VictoryTheme.material} height={height}
                          containerComponent={<VictoryVoronoiContainer />}>
                <VictoryLine style={style} data={data}
                             groupComponent={<VictoryClipContainer clipId="irating-chart"></VictoryClipContainer>} />
                <VictoryScatter style={style} labelComponent={<VictoryTooltip/>} 
                                labels={({ datum }) => datum.y} data={data} size={dotSize} />
            </VictoryChart>
        </div>
    );
}

export default IRatingChart;