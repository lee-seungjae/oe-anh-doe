import { Model } from './Model';

export class ProblemView {
    // controls
    private $root: JQuery;
    private $question: JQuery;
    private $answer: JQuery;
    private $enterButton: JQuery;
    private $currentProblemNumber: JQuery;
    private $totalProblemCount: JQuery;

    // events
    onEnter: () => void;

    model: Model;
    
    constructor(model: Model) {
        this.model = model;

        this.$root = $('#problemDlg')
        this.$question = $('#problemDlg #question');
        this.$answer = $('#problemDlg #answer');
        this.$enterButton = $('#problemDlg #enterButton');
        this.$currentProblemNumber = $('#problemDlg #currentProblemNumber');
        this.$totalProblemCount = $('#problemDlg #totalProblemCount');    

        this.$answer.keypress(event => {
            if (event.originalEvent.keyCode === 13) {
                this.onEnter();
                event.stopPropagation();
            }
        });
    
        this.$enterButton.click(() => {
            this.onEnter();
        });
    }

    setUpQuestion(): void {
        this.$currentProblemNumber.text(this.model.currentProblemNumber);
        this.$totalProblemCount.text(this.model.totalProblemCount);
        this.$question.text(this.model.getCurrentProblem().questionText);
        this.$answer.val('').focus();
    }

    getAnswer(): string {
        return this.$answer.val().toString();
    }

    resetAnswerText(): void {
        this.$answer.val('');
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
