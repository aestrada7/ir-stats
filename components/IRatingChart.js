import React from 'react';

import { VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryClipContainer } from 'victory'; 

class IRatingChart extends React.Component {
    render() {
        const { raceData } = this.props;

        const MAX_ENTRIES = 8;
        const DEFAULT_DOT_SIZE = 4;
        const SMALLER_DOT_SIZE = 2;

        const height = 250;
        const data = raceData.map((item, idx) => ({ x: raceData.length - idx, y: item.irating }));
        const dotSize = data.length > MAX_ENTRIES ? SMALLER_DOT_SIZE : DEFAULT_DOT_SIZE;

        const style = {
            data: {
                stroke: "var(--accent-color)"
            }
        };

        const animate = {
            duration: 100,
            onLoad: { duration: 1000 }
        };

        return (
            <div className="chart-container">
                <VictoryChart theme={VictoryTheme.material} height={height}
                              containerComponent={<VictoryVoronoiContainer />}>
                    <VictoryLine style={style} animate={animate} data={data}
                                 groupComponent={<VictoryClipContainer clipId="irating-chart"></VictoryClipContainer>} />
                    <VictoryScatter labelComponent={<VictoryTooltip/>} labels={({ datum }) => datum.y} data={data} size={dotSize} />
                </VictoryChart>
            </div>
        );
    }
}

export default IRatingChart;