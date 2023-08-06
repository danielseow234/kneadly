import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
    const [rating, setRating] = useState(0);
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
                        />
                        <FaStar
                            className="star"
                            color={starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            size={24}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onMouseLeave={handleMouseLeave}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
