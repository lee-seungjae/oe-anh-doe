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
        document.onkeypress = (event => {
            if (event.keyCode === 13) {
                event.stopPropagation();
                event.preventDefault();

                let len = this.windows.length;
                if (len == 0) { return; }

                // 콜백 실행 {
                // 이 안에서 this.windows가 바뀔 수 있음.
                this.windows[len - 1].onEnterKey();
                // 콜백 실행 }
            }
        });
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
