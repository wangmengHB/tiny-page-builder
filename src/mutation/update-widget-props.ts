import { PageEditorProps } from '@/interface';
import { objects } from 'util-kit';

const { deepClone } = objects;

// page -> row -> widgets
export const updateWidgetPropsHanlder = ({ pageConfig, updatePageConfig, registry }: PageEditorProps) => (depthMark: string, props: any) => {
    const nextConfig = deepClone(pageConfig);
    // find the target widget in the component tree
    // first path is the root
    console.log('meng depthMark', depthMark);
    const paths = depthMark.split('-').slice(1).map(Number);   
    const target = paths.reduce((acc: any, current) => acc.children[current], nextConfig);
    target.props = { ...target.props, ...props };
    updatePageConfig(nextConfig);    
      
};