import { Model } from './Model';

export class ResultView {
    // controls
    private $root: JQuery;
    private $tbody: JQuery;
    private $trYesTemplate: JQuery;
    private $trNoTemplate: JQuery;
    private $retryButton: JQuery;
    private $perfect: JQuery;

    // events
    onRetry: () => void;

    model: Model;
    
    constructor(model: Model) {
        this.model = model;

        this.$root = $('#resultDlg')
        let child = (cname: string) => $(`#resultDlg ${cname}`);
        this.$tbody = child('#tbody')
        this.$trYesTemplate = child('#trYes')
        this.$trNoTemplate = child('#trNo')
        this.$retryButton = child('#retryButton')
        this.$perfect = child('#perfect')

        this.$trYesTemplate.detach();
        this.$trNoTemplate.detach();
    
        this.$retryButton.click(() => {
            this.onRetry();
        });
    }

    update(): void {
        this.$tbody.empty();

        let retryCountSum = 0;

        for (let i in this.model.problems)
        {
            let p = this.model.problems[i];
            let c = this.model.retryCounts[i];
            retryCountSum += c;

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

        if (retryCountSum > 0)
        {
            this.$retryButton.show();
            this.$perfect.hide();
        }
        else
        {
            this.$retryButton.hide();
            this.$perfect.show();
        }
    }

    show(yes: boolean): void {
        if (yes)
        {
            this.$root.show();
        }
        else
        {
            this.$root.hide();
        }
    }
}