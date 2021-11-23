import React, { Ref } from 'react';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { PlusCircleFilled } from '@ant-design/icons';
import './styles.scss';





export default function AddBar({ addWidget, registry, pageConfig, depthMark }) {

    

    const defs = registry.getToolbarComponentDefs();


    const buttons = defs.map((def) => {
        // TODO: calculate valid tool bar depends on pageConfig 

        return (
            <DropdownItem key={def.name}>
                <button 
                    onClick={() => addWidget(def.name, depthMark)}
                >
                    {def.name}
                </button>
            </DropdownItem>
        );
    })


    return (
        <div className="add-bar">
            <DropdownMenu
                trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
                    <span
                        role="button"
                        className="add-btn"
                        {...providedProps}
                        ref={triggerRef as Ref<HTMLSpanElement>}
                        >
                        <a><PlusCircleFilled /></a>
                    </span>
                )}
                >
                <DropdownItemGroup>
                    { buttons }
                </DropdownItemGroup>
            </DropdownMenu>
        </div>
    )
}