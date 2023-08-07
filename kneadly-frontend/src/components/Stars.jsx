import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    const handleMouseEnter = (index) => {
        setHover(index);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleClick = (index) => {
        setRating(index);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={starValue}
                            onClick={() => handleClick(starValue)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            className="star"
                            color={starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            size={24}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onMouseLeave={handleMouseLeave}
                            style={{ margin: '0.5rem' }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
