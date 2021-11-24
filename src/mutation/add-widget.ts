
import { ComponentConfig, PageEditorProps } from '@/interface';
import { objects } from 'util-kit';

const { deepClone } = objects;

const MAX_COLUMN = 5;


// page -> row -> widgets
export const addWidgetHandler = ({ pageConfig, updatePageConfig, registry }: PageEditorProps) => (name: string, depthMark: string) => {
    const targetPage: ComponentConfig = deepClone(pageConfig);
    const widgetConfig = registry.createComponentConfig(name);

    const paths = depthMark.split('-').slice(1).map(Number);   
    const targetRow = targetPage.children[paths[0]];
    const nextRow = targetPage.children[paths[0] + 1];


    // 1. check if current row can hold, then insert into target row
    // 2. check if next row can hold, then insert into next row
    // 3. create a new row, and insert into the new row
    if (
        targetRow.children.length < MAX_COLUMN
    ) {
        targetRow.children.push(widgetConfig);
    } else if ( 
        nextRow && Array.isArray(nextRow.children) && 
        nextRow.children.length < MAX_COLUMN 
    ) {
        nextRow.children.push(widgetConfig);
    } else {
        // create a new row and insert into current target row below
        const newRow = registry.createRowConfig();
        newRow.children.push(widgetConfig);
        targetPage.children.splice(paths[0] + 1, 0, newRow);
    }
    updatePageConfig(targetPage);
}
