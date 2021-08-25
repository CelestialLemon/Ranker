import React from 'react'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ListItemInput from './CreateList/ListItemInput'

import ListItem from './ListItem'

const List = ({items, onChange}) => {

    const pageConatinerCSS = {
        // 'width' : '100vw',
        // 'height' : '100vh',
        // 'display' : 'flex',
        // 'alignItems' : 'center',
        // 'justifyContent' : 'center',
        // 'flexDirection' : 'column'
    }

    const [updateState, setUpdateState] = useState(0);
    const [list, setList] = useState(items)
    
    const onDataChange = (itemName, rating, index) =>
    {
        const temp = items;
        temp[index].itemName = itemName;
        temp[index].rating = rating;

        setList(temp);
        setUpdateState(updateState + 1);
    }

    const onDragEndFuntion = (result) =>
    {
        //rearrange state
        if(result.source != null && result.destination!= null)
        {
            const replacedItem = list[result.source.index];
            const tempState = list;
    
            if(result.source.index > result.destination.index)
            {
                for(var i=result.source.index - 1; i >= result.destination.index; i--)
                {
                    tempState[i + 1] = tempState[i];
                    console.log('moving' + i + ' down');
                }

                tempState[result.destination.index] = replacedItem;

                setList(tempState);
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

                setList(tempState);
                setUpdateState(updateState + 1);
            }
        }
    }

    

    return (
        <div style={pageConatinerCSS}>
            <div className='list-container'>
            <DragDropContext onDragEnd={onDragEndFuntion}>
                <Droppable
                    droppableId='showsList'>
                    {(provided, snapshot) => 
                    (
                        <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef} >
                            
                            {list.map((item, index) =>  (
                                <Draggable draggableId={index.toString()}
                                    key={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                            <ListItemInput
                                            itemName={item.itemName}
                                            rating={item.rating}
                                            index={index}
                                            onDataChange={onDataChange}>

                                            </ListItemInput>
                                        </div>
                                    )}
                                </Draggable>))}
                                
                                {provided.placeholder}
                       </div> 
                    )}
                </Droppable>
            </DragDropContext>
            </div>
        </div>
        
    )
}

export default List
