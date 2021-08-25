import React from 'react';

class Helmet extends React.Component {
    render() {
        const { helmetColors } = this.props;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="18px">
                <g>
                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                        <path style={{fill: `#${helmetColors[1]}`}} d="M4517.8,4281.9c-860.8-116.1-1636.2-497.2-2201.3-1082L2207,3086l109.5,13.1c455.6,59.1,1399.6,74.5,1993.2,35c1143.4-76.7,1975.7-251.9,2567.1-538.8c197.1-94.2,276-146.7,396.4-265c83.3-83.2,162.1-166.5,173-186.2c17.5-35,35-32.9,214.7,39.4c240.9,94.2,597.9,199.3,1009.7,295.7l311,72.3l-98.6,124.9c-54.8,70.1-208.1,234.4-341.7,363.6c-749.1,731.6-1653.7,1152.1-2696.3,1252.9C5516.6,4325.7,4796,4319.1,4517.8,4281.9z"/>
                        <path style={{fill: `#${helmetColors[0]}`}} d="M2767.7,2672c-332.9-21.9-825.8-89.8-955-133.6c-74.5-24.1-107.3-59.1-225.6-236.6c-76.7-113.9-212.5-335.1-302.3-492.8l-162.1-284.8l2076.5-10.9c2262.7-13.1,2124.6-4.4,2398.4-146.8c302.3-157.7,514.7-457.8,565.1-795.1c32.9-203.7-8.8-442.5-113.9-652.7c-131.4-267.2-431.5-525.7-766.6-659.3c-89.8-35-1290.1-420.6-2667.9-858.6L110.8-2396.5l13.1-127c6.6-70.1,17.5-138,26.3-149c6.6-10.9,532.2-19.7,1270.4-19.7c1379.9,0,1375.5,0,1441.3-129.2c43.8-83.2,43.8-140.2,2.2-221.2c-63.5-122.7-35-120.5-1342.7-131.4L312.3-3185l81-140.2c166.5-280.4,442.5-508.1,771-635.2c357-138,245.3-133.6,3414.8-133.6h2880.3l144.6,81.1c1139,633,1947.2,1732.6,2203.5,2996.4c157.7,775.4,113.9,1524.5-133.6,2264.8c-94.2,286.9-333,808.2-392.1,856.4c-19.7,17.5-96.4,8.8-282.6-32.9c-716.2-153.3-1248.5-324.2-1452.2-464.4c-251.9-170.8-407.4-111.7-453.4,170.9c-28.5,170.8-273.8,361.4-659.3,510.3C5641.5,2593.1,4090.7,2755.2,2767.7,2672z"/>
                        <path d="M792,797C573,238.5,345.2-521.6,226.9-1082.3c-67.9-317.6-140.2-799.5-124.9-814.8c17.5-17.5,4974.3,1570.5,5110.1,1636.2c302.3,148.9,488.4,405.2,488.4,676.8c0,251.9-133.6,457.8-361.4,562.9l-109.5,52.6H3056.9H886.2L792,797z"/>
                    </g>
                </g>
            </svg>
        );
    }
}

export default Helmet;