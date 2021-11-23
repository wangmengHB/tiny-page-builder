import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import PageEditor from './page-editor';
import RenderEngine from './render-engine/desktop';
import Monitor from './monitor';
import registry from './component-registry';
import { ComponentType } from '@/constants';
import TestWidget from './components/test-widget';
import TestWidgetSetting from './components/test-widget-setting';




// register the definition of components
registry.register({
    Component: TestWidget,
    Setting: TestWidgetSetting,
    type: ComponentType.Widget,
    name: 'collection.test-widget',
    canAddFromToobar: true,
    maxCount: 1000,
});



const App = () => {
    const [ pageConfig, setPageConfig ] = useState(null);

    useEffect(() => {
        // TODO fetch pageConfig from api
        if (!pageConfig) {
            const config = registry.createPageComponentConfig();
            setPageConfig(config);
        }
    }, [])

    return (
        <div className="workbench">
            <div className="workbench-components-panel">
                <div className="workbench-title">Components used in this page builder</div>
                { /*  TODO: here list the components used in this page builder */ }
            </div>
            <div className="workbench-workspace">
                <div className="workbench-main">
                    <div className="workbench-title">Page Editor</div>
                    <PageEditor 
                        pageConfig={pageConfig}
                        updatePageConfig={setPageConfig}
                        registry={registry}
                    />
                </div>
                <div className="workbench-main">
                    <div className="workbench-title" >Page Render Engine</div>
                    <RenderEngine 
                        pageConfig={pageConfig}
                        registry={registry}
                    />
                </div>
                <div className="workbench-side">
                    <div className="workbench-title" >Page Config</div>
                    <Monitor 
                        pageConfig={pageConfig} 
                        updatePageConfig={setPageConfig}
                    />
                </div>
            </div>
        </div>

    )
}



const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App/>, root);