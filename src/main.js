import { Plugin, Notice } from 'obsidian'; // eslint-disable-line
import { VIEW_TYPE_BROWSER } from './constants';
import BrowserView from './view';

export default class BrowserPlugin extends Plugin {
    async onload() {
        this.registerView(VIEW_TYPE_BROWSER, (leaf) => new BrowserView(leaf, this));

        this.addCommand({
            id: 'browser-open-tab',
            name: 'Open new browser tab',
            callback: () => {
                this.activateView();
            },
        });
    }

    async activateView() {
        const leaf = this.app.workspace.getLeaf(true);

        await leaf.setViewState({
            type: VIEW_TYPE_BROWSER,
            active: true,
        });

        this.app.workspace.revealLeaf(leaf);
    }
}
