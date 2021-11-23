import React, { Fragment, useEffect } from 'react';
import AddBar from './add-bar';
import { 
    ComponentConfig, PageEditorProps
} from '@/interface';
import { ComponentType, BuiltInComponentNames } from '@/constants';
import { addWidgetHandler, updateWidgetPropsHanlder, removeWidgetHandler,} from '@/mutation';
import { objects } from 'util-kit';
import EditableWrapper from './editable-wrapper';
import { DragDropContext } from 'react-beautiful-dnd';





export default function PageEditor({ pageConfig, updatePageConfig, registry }: PageEditorProps) {

    const addWidget = addWidgetHandler({ pageConfig, updatePageConfig, registry });
    const updateWidgetProps = updateWidgetPropsHanlder({ pageConfig, updatePageConfig, registry });
    const removeWidget = removeWidgetHandler({ pageConfig, updatePageConfig, registry });

    const onDragStart = (result: any) => {
        console.log(result);
    }

    const onDragUpdate = (result: any) => {
        console.log(result);
    }

    const onDragEnd = (result: any) => {
        console.log(result);
    }


    function renderComponent(pageConfig: ComponentConfig, depthMark: string = '0', parentProps = {}) {
        const { name, type, children, props } = pageConfig;
        const { Component, Setting } = registry.getComponentDefByName(name);
        if (!Component) {
            console.error('unknown component', pageConfig);
            return null;
        }
        const currentProps = { ...parentProps, ...props };

        if (type === ComponentType.Container) {
            const list = children.map((child, index: number) => {
                return renderComponent(child, `${depthMark}-${index}`, currentProps);
            })
            
            const nodes = React.createElement(Component as any, {
                ...currentProps,
                key: depthMark,
                children: list,
            });

            // for every row component, insert the add-bar at the bottom
            if (name === BuiltInComponentNames.Row) {
                return (
                    <Fragment>
                        { nodes }
                        <AddBar
                            depthMark={depthMark} 
                            addWidget={addWidget} 
                            registry={registry}
                            pageConfig={pageConfig}
                        />
                    </Fragment>
                )
            }
            return nodes;

        } else if (type === ComponentType.Widget) {
            // TODO: if Setting exist add an editable
            // TODO: add an editable wrapper
            return (
                <EditableWrapper 
                    SettingComponent={Setting}
                    updateWidgetProps={updateWidgetProps}
                    removeWidget={removeWidget}
                    // props inherited from parent should not be editable
                    widgetProps={props}
                    depthMark={depthMark}
                >
                    {React.createElement(Component as any, {
                        ...currentProps,
                        key: depthMark
                    })}
                </EditableWrapper>
            )     
        } else {
            console.error('unknown component type', pageConfig);
            return null;
        }
    }

    if (!pageConfig) {
        return null;
    }

    return (
        <DragDropContext
            onDrageStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <div className="tiny-page-editor">
                { renderComponent(pageConfig) }
            </div>
        </DragDropContext>
        
    )
}