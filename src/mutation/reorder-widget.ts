import { PageEditorProps } from '@/interface';
import { objects } from 'util-kit';
import { getWidgetById } from './utils';

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

    sourceContainer.children.splice(source.index, 1);
    destContainer.children.splice(destination.index, 0, targetWidget);

    updatePageConfig(nextConfig);

};