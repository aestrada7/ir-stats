class DriverCompareWins extends React.Component {
    constructor(props) {
        super(props);
    }

    totalWins(thisDriver) {
        const { compareData } = this.props;
        let selectedW = 0;
        let driverW = 0;
        compareData.selectedDriverData && compareData.selectedDriverData.map((raceItem, idx) => (
            selectedW = selectedW + (raceItem.finishing_position < compareData.myDriverData[idx].finishing_position ? 1 : 0),
            driverW = driverW + (raceItem.finishing_position > compareData.myDriverData[idx].finishing_position ? 1 : 0)
        ));

        return thisDriver ? driverW : selectedW;
    }

    render() {
        const { thisDriver } = this.props;
        return (
            <span> ({this.totalWins(thisDriver)})</span>
        )
    }
}

export default DriverCompareWins;