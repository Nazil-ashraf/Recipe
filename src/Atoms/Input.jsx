import React from 'react';
import './atomStyle.scss';

const CommonInput = ({ placeholder, onChange, type, value, title, multiline }) => {
    return (
        <div className='input-container'>
            <div className='input-container--title'>
                {title}
            </div>
            {multiline ?

                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className='input-container--multiline'
                    width={'100px'}
                />

                :

                <input
                    type={type}
                    placeholder={placeholder}
                    className='input-container--input'
                    value={value}
                    onChange={onChange}
                />
            }
        </div>
    );
};



export default CommonInput;
