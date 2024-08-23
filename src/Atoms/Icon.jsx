import React from 'react';


export const Icon = ({ source, handleClick }) => {
    return (
        <img
            src={source}
            height="15px"
            width="15px"
            onClick={handleClick}
            className='icon'
            alt="icon"
        />
    );
};



export default Icon;
