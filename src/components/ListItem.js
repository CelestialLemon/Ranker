import React from 'react'
import { useState, useEffect } from 'react';
import { useClickOutside } from 'react-click-outside-hook';

import '../CSS/List.css'


const ListItem = ({itemName, index, rating, updateRating}) => {

    const [ref, hasClickedOutside] = useClickOutside();
    const [editRating, setEditRating] = useState(false);
    const [ratingBgColor, setRatingBgColor] = useState('')
    const [ratingTextColor, setRatingTextColor] = useState('black')
    
    const onClickRating = () =>
    {
        setEditRating(true);
    }

    const onChangeRating = (e) =>
    {
        rating = e.target.value;
        if(rating > 10)
        rating = 10;
        updateRating(index, rating);
    }

    useEffect(() =>
    {
        const hue = 220 * (rating / 10); //max value of hue 220 i.e blue for rating of 10
        setRatingBgColor('hsl(' + hue + ', 100%, 50%)');

        if(rating >= 9.0)
        setRatingTextColor('white')
        else
        setRatingTextColor('black')
        
    }, [rating])

    useEffect(() =>
    {
        if(hasClickedOutside)
        setEditRating(false);
    }, [hasClickedOutside])

    return (
        <div>
          <div className='item-container'>
            <h3 className='item-index'>{index + 1}</h3>
            <h3 className='item-name'>{itemName}</h3>
            <div className='rating-container' onClick={onClickRating} ref={ref} style={{ backgroundColor : ratingBgColor}}>
                {editRating ? 
                    <input 
                    className='rating-input'
                    placeholder={rating}
                    type='number'
                    min={0}
                    max={10}
                    style={{ backgroundColor : ratingBgColor, color : ratingTextColor}}
                    onChange={(e) => onChangeRating(e)}>
                    </input>: 
                    <h3 className='rating' style={{color : ratingTextColor}}>{rating}</h3>}
            </div>
        </div>
        </div>
    )
}

export default ListItem
