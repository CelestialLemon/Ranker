import React from 'react'
import { useState, useEffect } from 'react';
import { useClickOutside } from 'react-click-outside-hook';
import '../../CSS/List.css'
const ListItemInput = ({itemName, index, rating, onDataChange}) => {

    const [nameRef, hasClickedOutsideName] = useClickOutside();
    const [ratingRef, hasClickedOutsideRating] = useClickOutside();
    
    const [editRating, setEditRating] = useState(false);
    const [editName, setEditName] = useState(false)
    
    const [ratingBgColor, setRatingBgColor] = useState('')
    const [ratingTextColor, setRatingTextColor] = useState('black')
    
   
    const onDataChangeLocal = (updatedItemName, updatedRating) =>
    {
        rating = updatedRating;
        if(rating > 10)
        rating = 10;

        itemName = updatedItemName;
        if(itemName == '')
        itemName = '-----';
        onDataChange(itemName, rating, index);
    }

    const onClickName = () =>
    {
        setEditName(true);
    }

    const onClickRating = () =>
    {
        setEditRating(true);
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
        if(hasClickedOutsideName)
        setEditName(false);

        console.log('has clicked outside')
    }, [hasClickedOutsideName])

    useEffect(() =>
    {
        if(hasClickedOutsideRating)
        setEditRating(false);
    }, [hasClickedOutsideRating]);


    return (
        <div className='item-container' style={{padding : '15px 15px'}}>
            <div className='item-index'>{index + 1}</div>
            <div className='item-name' onClick={onClickName} ref={nameRef}>
                {
                editName ? 
                <input type='text' placeholder={itemName} onChange={(e) => onDataChangeLocal(e.target.value, rating)}></input>
                : itemName
                }
            </div>

            <div className='rating-container' onClick={onClickRating} ref={ratingRef} style={{ backgroundColor : ratingBgColor}}>
                {editRating ? 
                    <input 
                    className='rating-input'
                    placeholder={rating}
                    type='number'
                    min={0}
                    max={10}
                    style={{ backgroundColor : ratingBgColor, color : ratingTextColor}}
                    onChange={(e) => onDataChangeLocal(itemName, e.target.value)}>
                    </input>: 
                    <h3 className='rating' style={{color : ratingTextColor}}>{rating}</h3>}
            </div>
        </div>
    )
}

export default ListItemInput
