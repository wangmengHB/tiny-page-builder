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