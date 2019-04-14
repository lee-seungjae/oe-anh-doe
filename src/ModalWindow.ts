export interface ModalWindow
{
    show(yes: boolean): void;
    onEnterKey(): void;
}

export class ModalWindowStack
{
    windows: ModalWindow[] = [];

    constructor()
    {
    }

    showAndPush(wnd: ModalWindow)
    {
        console.assert(this.windows.findIndex(v => v == wnd) < 0);
        this.windows.push(wnd);
        wnd.show(true);
    }

    hideAndPop(wnd: ModalWindow)
    {
        let len = this.windows.length;
        console.assert(len > 0);
        console.assert(this.windows[len - 1] == wnd);
        this.windows.pop();
        wnd.show(false);
    }
}
