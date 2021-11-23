
import { ComponentDef, ComponentConfig } from '@/interface';
import { ComponentType, BuiltInComponentNames } from '@/constants';
import { generateUuid } from 'util-kit';
import Page from '@/components/page';
import Row from '@/components/row';


class ComponentRegistry {

    private _map = new Map<string, ComponentDef>();

    register(def: ComponentDef) {
        const { name } = def;
        const widgetDef: ComponentDef = {
            canAddFromToobar: false,
            maxCount: 10000,
            ...def,
        };
        this._map.set(name, widgetDef);
    }

    getComponentDefByName(name: string): ComponentDef {
        return this._map.get(name);
    }


    getToolbarComponentDefs(): ComponentDef[] {
        const kvArr = Array.from(this._map);
        const res: ComponentDef[] = kvArr.filter(([name, def]) => def.canAddFromToobar).map(([name, def]) => def );
        return res;
    }


    createComponentConfig(name: string): ComponentConfig {
        const def = this._map.get(name);
        const { type } = def;
        return {
            id: generateUuid(),
            type,
            name: name,
            props: { },
            children: type === ComponentType.Container? []: undefined,
        }
    }

    createPageComponentConfig(): ComponentConfig {
        return {
            id: generateUuid(),
            type: ComponentType.Container,
            name: BuiltInComponentNames.Page,
            props: {},
            children: [ this.createRowConfig()],
        }
    }

    createRowConfig(): ComponentConfig {
        return {
            id: generateUuid(),
            type: ComponentType.Container,
            name: BuiltInComponentNames.Row,
            props: {},
            children: [],
        }
    }


}


const registry = new ComponentRegistry();


registry.register({
    Component: Page,
    type: ComponentType.Container,
    name: BuiltInComponentNames.Page,
});
registry.register({
    Component: Row,
    type: ComponentType.Container,
    name: BuiltInComponentNames.Row,
});



export default registry;

