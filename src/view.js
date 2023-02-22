import { remote } from 'electron'; // eslint-disable-line
import { ItemView } from 'obsidian'; // eslint-disable-line
import { VIEW_TYPE_BROWSER } from './constants';

export default class BrowserView extends ItemView {
    constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_BROWSER;
    }

    getDisplayText() {
        return 'Browser tab';
    }

    async onOpen() {
        this.contentEl.empty();

        const { session } = remote;
        const path = (ext) => this.app.vault.adapter.getFullPath(`.obsidian/plugins/obsidian-browser/extensions/${ext}/`);
        await session.defaultSession.loadExtension(path('ublock'));
        await session.defaultSession.loadExtension(path('minimal'));

        const { doc } = this.contentEl;
        this.webviewEl = doc.createElement('webview');
        this.webviewEl.setAttribute('allowpopups', '');
        this.webviewEl.addClass('wb-frame');
        this.contentEl.appendChild(this.webviewEl);
        this.webviewEl.src = 'https://youtube.com';
        // this.webviewEl.src = 'https://www.simplypsychology.org/research-methods.html';
    }
}
