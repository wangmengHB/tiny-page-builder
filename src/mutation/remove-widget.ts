import { ComponentConfig, PageEditorProps } from '@/interface';
import { objects } from 'util-kit';
import { ComponentType } from '@/constants';

const { deepClone } = objects;



// TODO: this handler should be optimized
// FIXME later

// collection customization specific logic
// page -> row -> widgets
export const removeWidgetHandler = ({ pageConfig, updatePageConfig, registry }: PageEditorProps) => (depthMark: string) => {
    const targetPage = deepClone(pageConfig);
    // find the target widget in the component tree
    // first path is the root
    console.log('meng depthMark', depthMark);
    const paths = depthMark.split('-').slice(1).map(Number);
    const lastIndex = paths[paths.length - 1];
    const last2ndIndex = paths[paths.length - 2];
    let parent = targetPage;
    for (let i = 0; i < paths.length - 1; i++) {
        parent = parent.children[paths[i]];
    }

    if (!Array.isArray(parent.children)) {
        throw new Error('failed to find widget\'s parent');
    }
    parent.children.splice(lastIndex, 1);

    // if there is no widgets in a row, then delete the row too.
    if (parent.children.length === 0) {
        let parent = targetPage;
        for (let i = 0; i < paths.length - 2; i++) {
            parent = parent.children[paths[i]];
        }
        parent.children.splice(last2ndIndex, 1);
    }

    updatePageConfig(targetPage);


}