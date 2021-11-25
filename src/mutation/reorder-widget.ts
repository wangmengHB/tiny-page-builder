import { PageEditorProps } from '@/interface';
import { objects } from 'util-kit';
import { getWidgetById, getParentWidget } from './utils';
import { MAX_ROW_ITEM_COUNT } from '@/constants';

const { deepClone } = objects;


export const reorderWidgetHanlder = ({ pageConfig, updatePageConfig, registry }: PageEditorProps) => (draggableId, destination, source) => {
    const nextConfig = deepClone(pageConfig);
    // draggableId is the widget ID
    // source { droppableId, index }
    // destination { droppableId, index }
    // droppableId is the id of container, and index is the order


    const targetWidget = getWidgetById(draggableId, nextConfig);
    const sourceContainer = getWidgetById(source.droppableId, nextConfig);
    const destContainer = getWidgetById(destination.droppableId, nextConfig);
    if (
        sourceContainer !== destContainer &&
        destContainer.children.length >= MAX_ROW_ITEM_COUNT
    ) {
        alert('A row can hold 5 widgets at most.')
        return;
    }

    sourceContainer.children.splice(source.index, 1);
    destContainer.children.splice(destination.index, 0, targetWidget);

    // remove empty container
    if (sourceContainer.children.length === 0) {
        const parent = getParentWidget(sourceContainer, nextConfig);
        const index = parent.children.findIndex((child: any) => child.id === sourceContainer.id);
        parent.children.splice(index, 1);
    }

    updatePageConfig(nextConfig);

};