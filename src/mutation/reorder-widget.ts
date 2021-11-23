import { ComponentConfig, PageEditorProps } from '@/interface';
import { objects } from 'util-kit';
import { ComponentType } from '@/constants';

const { deepClone } = objects;


export const reorderWidgetHanlder = ({ pageConfig, updatePageConfig, registry }: PageEditorProps) => () => {
    const nextConfig = deepClone(pageConfig);
    

};