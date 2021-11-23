import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import debounce from 'lodash.debounce';


export default function Monitor({ pageConfig, updatePageConfig }) {
    const ref = useRef();
    const editorRef = useRef();
    const modelRef = useRef();

    const handleContentChange = debounce(() => {
        const text = (modelRef.current as any).getValue();
        try {
            const next = JSON.parse(text);
            updatePageConfig(next);
        } catch (err) {
            console.log(err);
        }
    }, 100);

    useEffect(() => {
        const node = ref.current;
        const editor = monaco.editor.create(node as HTMLElement, {
        value: JSON.stringify(pageConfig, null, 4),
            minimap: { enabled: false },
            lineNumbers: 'off',
            wordWrap: 'on',
            language: "typescript",
            theme: 'vs-dark',
        }) as any
        const model = editor.getModel();
        editorRef.current = editor;
        modelRef.current = model;
        model.onDidChangeContent(handleContentChange)

    }, [])

    useEffect(() => {
        if (!editorRef.current || !modelRef.current) {
            return;
        }
        const nextValue = JSON.stringify(pageConfig, null, 4);
        const editor: any = editorRef.current;
        const currentVal = editor.getValue()
        if (currentVal !== nextValue) {
          editor.setValue(nextValue)
        }
    }, [JSON.stringify(pageConfig)])


    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}></div>
    )

}

