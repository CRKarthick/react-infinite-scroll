import React from 'react';

const Card = ({ body }) => {
    return (
        <div className='card'>
            <div className='card-body'>{body}</div>
        </div>
    );
};

export default Card;
