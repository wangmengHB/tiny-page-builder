import React, { Fragment } from 'react';
import AddBar from './add-bar';
import { 
    ComponentConfig, PageEditorProps
} from '@/interface';
import { ComponentType, BuiltInComponentNames } from '@/constants';
import { addWidgetHandler, updateWidgetPropsHanlder, removeWidgetHandler, reorderWidgetHanlder } from '@/mutation';
import EditableWrapper from './editable-wrapper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import WidgetWrapper from '@/components/widget-wrapper';





export default function PageEditor({ pageConfig, updatePageConfig, registry }: PageEditorProps) {

    const addWidget = addWidgetHandler({ pageConfig, updatePageConfig, registry });
    const updateWidgetProps = updateWidgetPropsHanlder({ pageConfig, updatePageConfig, registry });
    const removeWidget = removeWidgetHandler({ pageConfig, updatePageConfig, registry });
    const reorderWidget = reorderWidgetHanlder({ pageConfig, updatePageConfig, registry });

    const onDragStart = (result: any) => {
        console.log(result);
    }

    const onDragUpdate = (result: any) => {
        console.log(result);
    }

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        reorderWidget(draggableId, destination, source);
    }


    function renderComponent(pageConfig: ComponentConfig, depthMark: string = '0', parentProps = {}, index: number = 0) {
        const { name, type, children, props, id } = pageConfig;
        const { Component, Setting } = registry.getComponentDefByName(name);
        if (!Component) {
            console.error('unknown component', pageConfig);
            return null;
        }
        const currentProps = { ...parentProps, ...props };

        if (type === ComponentType.Container) {
            const list = children.map((child, subIndex: number) => {
                return renderComponent(child, `${depthMark}-${subIndex}`, currentProps, subIndex);
            })
            
            // for every row component, insert the add-bar at the bottom
            if (name === BuiltInComponentNames.Row) {
                return (
                    <Fragment key={id}>
                        <Droppable 
                            droppableId={id}
                            direction="horizontal"
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...currentProps}
                                    {...provided.droppableProps}
                                >
                                    <Component
                                        {...currentProps}
                                        {...provided.droppableProps}
                                    >
                                        { list }
                                        { provided.placeholder }
                                    </Component>
                                </div>
                            )}
                        </Droppable>
                        <AddBar
                            depthMark={depthMark} 
                            addWidget={addWidget} 
                            registry={registry}
                            pageConfig={pageConfig}
                        />
                    </Fragment>
                )
            }
            return (
                <Component {...currentProps} key={id}>
                    { list }
                </Component>
            );

        } else if (type === ComponentType.Widget) {
            return (
                <WidgetWrapper key={id}>
                    <EditableWrapper
                        id={id}
                        index={index}
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
                </WidgetWrapper>
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