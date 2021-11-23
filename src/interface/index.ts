import ComponentRegistry from '@/component-registry';
import { ComponentType } from '@/constants';

type Component = React.FC<any> | React.Component<any> | React.PureComponent<any>;

// TODO: update later, every modal should have 2 props: visible, onClose
type SettingComponent = Component;



export interface ComponentDef{
    name: string;
    type: ComponentType;
    Component: Component;           
    Setting?: SettingComponent;         // setting modal
    canAddFromToobar?: boolean;
    maxCount?: number;
}

export interface ComponentConfig {
    id: string | number;
    name: string;
    type: ComponentType;
    props: any;
    children: ComponentConfig[] | undefined;
}



export interface PageEditorProps {
    pageConfig: ComponentConfig;
    updatePageConfig: (item: ComponentConfig) => void;
    registry: ComponentRegistry;
}