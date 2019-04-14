import { Model } from './Model';

export class ResultDlg
{
    // controls
    private $root: JQuery;
    private $tbody: JQuery;
    private $trYesTemplate: JQuery;
    private $trNoTemplate: JQuery;
    private $retryButton: JQuery;
    private $perfect: JQuery;

    // fields
    private resolve: (value?: any) => void;
    private model: Model;
    
    constructor(model: Model) {
        this.model = model;

        this.$root = $('#resultDlg')
        this.$tbody = this.$root.find('#tbody')
        this.$trYesTemplate = this.$root.find('#trYes')
        this.$trNoTemplate = this.$root.find('#trNo')
        this.$retryButton = this.$root.find('#retryButton')
        this.$perfect = this.$root.find('#perfect')

        this.$trYesTemplate.detach();
        this.$trNoTemplate.detach();
    
        this.$retryButton.click(() => this.endModal());
    }

    doModal(): Promise<string>
    {
        return new Promise<any>((resolve, reject) => {
            console.assert(this.resolve === undefined);
            this.resolve = resolve;

            // UI 이벤트에서 에러핸들링하기가 마땅찮아서
            // reject는 쓰지 않는다
            this.update();
            this.$root.show();
            this.$retryButton.focus();
        });
    }

    endModal(): void
    {
        this.$root.hide();

        console.assert(this.resolve !== undefined);
        let resolve = this.resolve;
        this.resolve = undefined;
        resolve();
    }

    update(): void {
        this.$tbody.empty();

        for (let i in this.model.problems)
        {
            let p = this.model.problems[i];
            let c = this.model.retryCounts[i];

            let tr: JQuery;
            if (c == 0)
            {
                tr = this.$trYesTemplate.clone(false, true);
            }
            else
            {
                tr = this.$trNoTemplate.clone(false, true);
                tr.find('#retryCount').text(c);
            }
            tr.find('#question').text(p.questionText);
            this.$tbody.append(tr);
        }

        if (this.model.wasPerfect())
        {
            this.$retryButton.hide();
            this.$perfect.show();
        }
        else
        {
            this.$retryButton.show();
            this.$perfect.hide();
        }
    }
}
