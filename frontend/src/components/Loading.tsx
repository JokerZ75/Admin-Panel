import React from "react";

const Loading = () => {
    return (
        <div className="loading-container" >
            <h1 className="loading-text">Loading...</h1>
            <div className="loading-spinner">
                <div className="loading-spinner-dot"></div>
                <div className="loading-spinner-dot"></div>
                <div className="loading-spinner-dot"></div>
                <div className="loading-spinner-dot"></div>
                <div className="loading-spinner-dot"></div>
                <div className="loading-spinner-dot"></div>
            </div>
        </div>
    );
};

export default Loading;