import * as React from 'react';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IDynamicAceEditorState {
    ready: boolean;
    editor?: any;
}

export default class DynamicAceEditor extends React.Component<any, IDynamicAceEditorState> {
    constructor(props, state) {
        super(props);
        this.state = { ready: false };
        this.loadEditor();
    }

    private async loadEditor(): Promise<any> {
        let aceEditor: any = await SPComponentLoader.loadScript(this.props.scriptRoot + '/react-ace.min.js', { globalExportsName: "DynamicAceEditor" });
        let element = React.createElement(aceEditor.default, this.props);
        this.setState({ editor: element, ready: true });
    }

    public render() {
        if (!this.state.ready) return null;
        return this.state.editor;
    }
}  