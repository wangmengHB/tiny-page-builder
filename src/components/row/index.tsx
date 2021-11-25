import React from 'react';
import './styles.scss';


export default function Row({ children }) {
    const itemCountInRow = React.Children.count(children);
    const childrenNodes = React.Children.map(children, (child: any) => {
        if (!React.isValidElement(child)) {
            return null;
        }
        return React.cloneElement(child, {
            ...(child as any).props,
            itemCountInRow,
            // TODO: pass row props into child
        });
    })

    return (
        <div className="tiny-page-builder__row">
            { childrenNodes }
        </div>
    )
}

