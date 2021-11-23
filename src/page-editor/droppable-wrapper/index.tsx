import React from 'react';
import { Droppable } from 'react-beautiful-dnd';



export default function DroppableWrapper(
    { children, rowId, rowNum, widgetProps, removeWidget, depthMark }
) {

    return (
        <Droppable droppableId={rowId}>
            {() => {
                return (
                    <div >
                        { children }
                    </div>
                )
            }}
        </Droppable>
    )

}