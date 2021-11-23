import React from 'react';
import { ComponentConfig } from '@/interface';
import { ComponentType } from '@/constants';










export default function RenderEngine({ pageConfig, registry }) {

    function renderComponent(pageConfig: ComponentConfig, depthMark: string = '0') {
        const { name, type, children, props } = pageConfig;
        const { Component, Setting } = registry.getComponentDefByName(name);
        if (!Component) {
            console.error('unknown component', pageConfig);
            return null;
        }
        if (type === ComponentType.Container) {

            const list = children.map((child, index: number) => {
                return renderComponent(child, `${depthMark}-${index}`)
            })
                
            return React.createElement(Component, {
                ...props,
                key: depthMark,
                children: list,
            });

        } else if (type === ComponentType.Widget) {
            // TODO: if Setting exist add an editable
            // TODO: add an editable wrapper
            return React.createElement(Component, {
                ...props,
                key: depthMark
            });
        } else {
            console.error('unknown component type', pageConfig);
            return null;
        }
    }

    if (!pageConfig) {
        return null;
    }


    return (
        <div className="page-viewer">
            { renderComponent(pageConfig) }
        </div>
    )
}