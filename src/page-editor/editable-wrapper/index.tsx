import React, { useState, useRef, useEffect } from 'react';
import './styles.scss';
import classnames from 'classnames';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';






export default function EditableWrapper(
    { 
        children, SettingComponent, updateWidgetProps, widgetProps, removeWidget, depthMark, 
        id, index,
    }
) {
    const [visible, setVisible] = useState(false)
    const [toolbarVisible, setToolbarVisible] = useState(false);
    const wrapperRef = useRef(null);


    const actionButtons = [
        {
            label: 'Edit',
            icon: <EditOutlined />,
            onClick: () => setVisible(true),
        },
        {
            label: 'Delete',
            icon: <DeleteOutlined />,
            onClick: () => removeWidget(depthMark),
        },
    ]

    
    useEffect(() => {
        const node = wrapperRef.current;
        const handleClick = (e: Event) => {
            if (node.contains(e.target) || node === e.target ) {
                setToolbarVisible(true);
            } else {
                setToolbarVisible(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])

    
    return (
        <Draggable 
            draggableId={id} 
            index={index}
            disableInteractiveElementBlocking={false}
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="draggable-wrapper"
                >
                    <div
                        ref={wrapperRef} 
                        className={classnames({"editable-wrapper": true, "toolbar-show": toolbarVisible})}   
                    >
                        <div className="event-prevent">
                            { children }
                        </div>
                        { toolbarVisible && (
                            <div className="widget-toolbar">
                                <div className="action-panel">
                                    {
                                        actionButtons.map((item: any) => (
                                            <a key={item.label} className="btn" onClick={item.onClick}>
                                                { item.icon }
                                            </a>
                                        ))
                                    }
                                </div>
                        </div>
                        )}
                        { SettingComponent && (
                            <SettingComponent 
                                visible={visible} 
                                onClose={() => { setVisible(false)}}
                                updateWidgetProps={(nextProps) => {
                                    const mergeResult = {...widgetProps, ...nextProps};
                                    updateWidgetProps(depthMark, mergeResult);
                                }}
                                {...widgetProps}
                            />
                        )}
                    </div>

                </div>

            )}
        </Draggable>
    )
}



