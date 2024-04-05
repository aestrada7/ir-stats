import React from 'react';

const Loading = ({ kind }) => {
    return (
        <div className={`loading ${kind}`}></div>
    );
}

export default Loading;