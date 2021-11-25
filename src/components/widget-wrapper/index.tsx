import React from 'react';
import './styles.scss';


export default function WidgetWrapper({ children }) {
    return (
        <div className="tiny-page-builder__widget-wrapper">
            { children }
        </div>
    )
}