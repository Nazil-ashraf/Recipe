import React from 'react';
import './atomStyle.scss';

const Background = ({ children, className, ...props }) => {
    return (
        <div className={`background ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Background;