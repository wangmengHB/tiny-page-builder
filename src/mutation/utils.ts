import { ComponentConfig } from '@/interface';


export function getWidgetById(id: string, pageConfig: ComponentConfig) {
    let res = null;
    if (pageConfig.id === id) {
        res = pageConfig;
        return res;
    }
    if (Array.isArray(pageConfig.children)) {
        for (let i = 0; i < pageConfig.children.length; i++) {
            res =  getWidgetById(id, pageConfig.children[i]);
            if (res) {
                return res;
            } 
        }
    }
    return res;
}

export function getParentWidget(widgetConfig: ComponentConfig, pageConfig: ComponentConfig) {
    if (pageConfig.id === widgetConfig.id) {
        return null;
    }
    if (!Array.isArray(pageConfig.children)) {
        return null
    }
    if (pageConfig.children.find((child: any) => child.id === widgetConfig.id)) {
        return pageConfig;
    }
    for (let i = 0; i < pageConfig.children.length; i++) {
        const res = getParentWidget(widgetConfig, pageConfig.children[i]);
        if (res) {
            return res;
        }
    }
    return null;
}