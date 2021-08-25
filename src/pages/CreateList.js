import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { AiFillSave, AiOutlineConsoleSql } from 'react-icons/ai'
import ButtonGroupCreateList from '../components/CreateList/ButtonGroupCreateList'
import '../CSS/CreateList.css'
import ListItem from '../components/ListItem'
import List from '../components/List'
import ListItemInput from '../components/CreateList/ListItemInput'
const CreateList = () => {

    let history = useHistory();

    const [items, setItems] = useState([]);
    const [updateState, setUpdateState] = useState(0);
    const [listName, setListName] = useState('');

    const addItemToList = () =>
    {
        const index = items.length;
        const temp = items;
        temp.push({
            'itemName' : '-----',
            'rating' : 0.0
        })

        setItems(temp);
        setUpdateState(updateState + 1);
    }

    const onDataChange = (itemName, rating, index) =>
    {
        const temp = items;
        temp[index].itemName = itemName;
        temp[index].rating = rating;

        setItems(temp);
        setUpdateState(updateState + 1);
    }

    const onDragEndFuntion = (result) =>
    {
        //rearrange state
        if(result.source != null && result.destination!= null)
        {
            const replacedItem = items[result.source.index];
            const tempState = items;
    
            if(result.source.index > result.destination.index)
            {
                for(var i=result.source.index - 1; i >= result.destination.index; i--)
                {
                    tempState[i + 1] = tempState[i];
                    console.log('moving' + i + ' down');
                }

                tempState[result.destination.index] = replacedItem;

                setItems(tempState);
                setUpdateState(updateState + 1);
            }
            else if(result.source.index < result.destination.index)
            {
                for(var j=result.source.index + 1; j<=result.destination.index; j++)
                {
                    tempState[j - 1] = tempState[j];
                    console.log('moving' + j + ' up');
                }

                tempState[result.destination.index] = replacedItem;

                setItems(tempState);
                setUpdateState(updateState + 1);
            }
        }
    }

    const onSave = async () =>
    {
        try
        {
            const res = await axios.post('https://ranker-22-api.herokuapp.com/lists/create',
            {
                'listName' : listName,
                'items' : items
            },
            {
                'headers' : {'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}
            })

            console.log(res.data);

            if(res.data.msg == "list added successfully")
            {
                history.push('/');
            }
        }catch(err)
        {
            console.log(err);
        }
    }


    return (
        <div className='page-container-create-list'>
            <ButtonGroupCreateList
            onSave={onSave}></ButtonGroupCreateList>
            
            <input className='listname-input' placeholder='Enter a name for the list'
            onChange={e => setListName(e.target.value)}></input>
            
            <DragDropContext onDragEnd={onDragEndFuntion}>
                <Droppable
                    droppableId='createList'>
                        {(provided, snapshot) =>
                        (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                                {items.map((item, index) =>
                                (
                                    <Draggable draggableId={index.toString()}
                                    key={index}
                                    index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                                <ListItemInput 
                                                itemName={item.itemName} 
                                                index={index} 
                                                rating={item.rating}
                                                onDataChange={onDataChange}></ListItemInput>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            </DragDropContext>
        
            <motion.button 
            className='add-item-button'
            whileTap={{scale : 0.95}}
            onClick={addItemToList}>+ Add Item</motion.button>
        </div>
    )
}

export default CreateList
