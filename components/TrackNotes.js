import React from 'react';

import { replaceLineBreaks } from '../services/Common';

const TrackNotes = ({ messages }) => {
    return (
        <React.Fragment>
            <div className="message-container">
                { messages ? <div className="title">Messages</div> : '' }
                { messages.map(msg => (
                    <div className="table-item composite-field">
                        <div className={`season-indicator season-${msg.season}`}>{msg.year} S{msg.season}</div>
                        <div className="week-indicator">Week {parseInt(msg.week) + 1}</div>
                        <div className="message" dangerouslySetInnerHTML={replaceLineBreaks(msg.message)}></div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default TrackNotes;