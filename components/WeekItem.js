class WeekItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false
        };
    }

    showItem(item) {
        if(item) {
            this.setState({ isHovering: true });
        }
    }

    hideItem() {
        if(this.state.isHovering) {
            this.setState({ isHovering: false });
        }
    }

    render() {
        const { caption, value, hover } = this.props;
        const { isHovering } = this.state;

        return (
            <React.Fragment>
                <div className="week-item" onMouseEnter={() => this.showItem(hover)}
                     onMouseLeave={() => this.hideItem()}>
                    <div className="week-item-title">
                        {caption}
                    </div>
                    <div className="week-item-value">
                        {value}
                    </div>
                    {hover && isHovering ?
                        <div className="week-item-hover">
                            {hover}%
                        </div>
                    : ''}
                </div>
            </React.Fragment>
        );
    }
}

export default WeekItem;