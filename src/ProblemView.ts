import { Model } from './Model';
import { ModalWindow } from './ModalWindow'

export class ProblemView implements ModalWindow
{
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

        this.$enterButton.click(() => this.onEnterKey());
    }

    onEnterKey(): void
    {
        if (this.getAnswer() != '')
        {
            this.onEnter();
        }
    }

    setUpQuestion(): void {
        this.$currentProblemNumber.text(this.model.getCurrentProblemNumber());
        this.$totalProblemCount.text(this.model.getTotalProblemCount());
        this.$question.text(this.model.getCurrentProblem().questionText);
        this.$answer.val('');
    }

    focusToInput(): void
    {
        this.$answer.focus();
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
