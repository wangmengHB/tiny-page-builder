import React from 'react';


export default function Page({ children }) {
    const childrenNodes = React.Children.map(children, (child: any) => {
        if (!React.isValidElement(child)) {
            return null;
        }
        return React.cloneElement(child, {
            ...(child as any).props,
        });
    })
    return (
        <div className="tiny-page-builder__page">{ childrenNodes }</div>
    )
}

