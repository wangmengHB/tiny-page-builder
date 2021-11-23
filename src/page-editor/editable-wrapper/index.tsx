import React, { useState } from 'react';
import './styles.scss';
import classnames from 'classnames';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'






export default function EditableWrapper(
    { children, SettingComponent, updateWidgetProps, widgetProps, removeWidget, depthMark }
) {
    const [visible, setVisible] = useState(false)
    const [toolbarVisible, setToolbarVisible] = useState(false);


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

    const handleBlur = (event: any) => {
        
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setToolbarVisible(false);
        } else {
            // if event.relatedTarget is focused
            // check if child node is focused
            setTimeout(() => {
                if (event.relatedTarget === document.activeElement) {
                    setToolbarVisible(false);
                }
            })

            

        }
        
    }

    
    return (
        <div 
            className={classnames({"editable-wrapper": true, "toolbar-show": toolbarVisible})}
            onFocus={() => setToolbarVisible(true) }
            onBlur={handleBlur}
            draggable
            tabIndex={0}
        >
            <div className="event-prevent">
                { children }
            </div>
            { toolbarVisible && (
                <div className="widget-toolbar">
                    <div className="action-panel">
                        {
                            actionButtons.map((item: any) => (
                                <a className="btn" onClick={item.onClick}>
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
    )
}



