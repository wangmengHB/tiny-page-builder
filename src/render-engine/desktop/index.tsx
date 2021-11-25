import React from 'react';
import { ComponentConfig } from '@/interface';
import { ComponentType } from '@/constants';
import WidgetWrapper from '@/components/widget-wrapper';


export default function RenderEngine({ pageConfig, registry }) {

    function renderComponent(pageConfig: ComponentConfig, depthMark: string = '0') {
        const { name, type, id, children, props } = pageConfig;
        const { Component } = registry.getComponentDefByName(name);
        // TODO: need to merge props
        if (!Component) {
            console.error('unknown component', pageConfig);
            return null;
        }
        if (type === ComponentType.Container) {
            const list = children.map((child, index: number) => {
                return renderComponent(child, `${depthMark}-${index}`)
            });
            return (
                <Component {...props} key={id}>
                    { list }
                </Component>
            );
        } else if (type === ComponentType.Widget) {
            return (
                <WidgetWrapper key={id}>
                    <Component {...props}/>
                </WidgetWrapper>
            )
        } else {
            console.error('unknown component type', pageConfig);
            return null;
        }
    }

    if (!pageConfig) {
        return null;
    }


    return (
        <div className="tiny-page-viewer">
            { renderComponent(pageConfig) }
        </div>
    )
}