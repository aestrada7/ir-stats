import React, { useState } from 'react';

const WeekItem = ({ caption, value, hover }) => {
    const [ isHovering, setIsHovering ] = useState(false);

    const showItem = (item) => {
        if(item) {
            setIsHovering(true);
        }
    }

    const hideItem = () => {
        if(isHovering) {
            setIsHovering(false);
        }
    }

    return (
        <React.Fragment>
            <div className="week-item" onMouseEnter={() => showItem(hover)}
                 onMouseLeave={() => hideItem()}>
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

export default WeekItem;