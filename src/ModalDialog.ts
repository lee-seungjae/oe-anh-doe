export class FeedbackDlg
{
    // controls
    private $background: JQuery;
    private $window: JQuery;
    private $closeButton: JQuery;

    // fields
    private animationStyle: string;
    private resolve: (value?: any) => void;

    constructor(nodeId: string, animationStyle: string)
    {
        this.animationStyle = animationStyle;

        this.$background = $('#modalBackground');
        this.$window = $(`#modalBackground #${nodeId}`);
        this.$closeButton = this.findChild('#closeButton');
        this.$closeButton.click((ev) => { this.endModal(); ev.preventDefault(); ev.stopPropagation(); });
    }

    findChild(selector: string): JQuery
    {
        return this.$window.find(selector);
    }

    doModal(buttonCaption: string): Promise<string>
    {
        return new Promise<any>((resolve, reject) => {
            console.assert(this.resolve === undefined);
            this.resolve = resolve;
            console.log('SET RESOLVE2', resolve);

            // UI 이벤트에서 에러핸들링하기가 마땅찮아서
            // reject는 쓰지 않는다
            this.$closeButton.text(buttonCaption);
            this.$background.show();
            this.$window.css('animation', this.animationStyle);
            this.$window.show();
            this.$closeButton.focus();
        });
    }

    endModal(): void
    {
        console.log('END MODAL2', this.resolve);
        this.$background.hide();
        this.$window.hide();

        console.assert(this.resolve !== undefined);
        let resolve = this.resolve;
        this.resolve = undefined;
        resolve();
    }
}