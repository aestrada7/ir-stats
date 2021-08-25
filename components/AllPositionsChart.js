import React from 'react';

import { VictoryChart, VictoryBar, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryClipContainer } from 'victory'; 

class AllPositionsChart extends React.Component {
    render() {
        const { positionsData } = this.props;

        const DEFAULT_DOT_SIZE = 4;

        const height = 250;
        const data = positionsData.map((item) => ({ x: item.position, y: item.track_season.length }));
        const dotSize = DEFAULT_DOT_SIZE;

        const style = {
            data: {
                fill: "var(--accent-color)"
            },
            labels: {
                fontFamily: "var(--main-font)"
            }
        };

        const animate = {
            duration: 100,
            onLoad: { duration: 1000 }
        };

        return (
            <div className="all-positions-chart">
                <div className="chart-container">
                    <VictoryChart theme={VictoryTheme.material} height={height}
                                  containerComponent={<VictoryVoronoiContainer />}>
                        <VictoryBar style={style} animate={animate} data={data}
                                    groupComponent={<VictoryClipContainer clipId="position-chart"></VictoryClipContainer>} />
                        <VictoryScatter style={style} labelComponent={<VictoryTooltip/>} labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                        data={data} size={dotSize} />
                    </VictoryChart>
                </div>
            </div>
        );
    }
}

export default AllPositionsChart;