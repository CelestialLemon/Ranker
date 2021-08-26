import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import ButtonGroupCreateList from '../components/CreateList/ButtonGroupCreateList'
import '../CSS/CreateList.css'
import ListItemInput from '../components/CreateList/ListItemInput'
import ImportItemsModal from '../components/CreateList/ImportItemsModal'
import styled from 'styled-components'

const DimBackground = styled.div`
    position : absolute;
    top : 0%;
    left : 0%;

    height : 100%;
    width : 100%;
    background : rgba(0, 0, 0, 0.3);
    z-index : 2;
`

const CreateList = () => {

    let history = useHistory();

    const [items, setItems] = useState([]);
    const [updateState, setUpdateState] = useState(0);
    const [listName, setListName] = useState('');
    const [canShare, setCanShare] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);


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

    const removeLastItemFromList = () =>
    {
        const temp = items;
        temp.pop();
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
                'canShare' : canShare,
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

    const onShare = (canShareInput) =>
    {
        setCanShare(canShareInput);
    }

    const onImport = () =>
    {
        setShowImportModal(!showImportModal);
    }

    const onImportSuccess = (importedItems) =>
    {
        const temp = items.concat(importedItems);
        setItems(temp);
    }

    return (
        <div className='page-container-create-list' style={{}}>
            <ButtonGroupCreateList
            onSave={onSave}
            onImport={onImport}
            onShare={onShare}
            canShare={false}></ButtonGroupCreateList>
            
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
        
            <div style={{display : 'flex'}}>
                <motion.button 
                className='add-item-button'
                whileTap={{scale : 0.95}}
                onClick={addItemToList}>+ Add Item</motion.button>

                <motion.button
                className='remove-last-item-button'
                whileTap={{scale : 0.95}}
                onClick={removeLastItemFromList}>
                    - Remove Last Item
                </motion.button>

            </div>
            {showImportModal ? <DimBackground></DimBackground> : <></>}
            {showImportModal ? <ImportItemsModal
                                onModalClose={() => setShowImportModal(false)}
                                onImportSuccess={onImportSuccess}></ImportItemsModal> : <></>}
        </div>
    )
}

export default CreateList
