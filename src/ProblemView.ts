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
        this.$answer.keyup(() => { this.updateQuestionText(); this.updateEnterButton(); });
    }

    onEnterKey(): void
    {
        if (this.canEnter())
        {
            this.onEnter();
        }
    }

    setUpQuestion(): void {
        this.$currentProblemNumber.text(this.model.getCurrentProblemNumber());
        this.$totalProblemCount.text(this.model.getTotalProblemCount());
        this.$answer.val('');
        this.updateQuestionText();
        this.updateEnterButton();
    }

    updateQuestionText(): void
    {
        let problem = this.model.getCurrentProblem();
        if (problem == null) { return; }
        let qtext = problem.questionText;
        let atext = this.getAnswer();
       
        this.$question.empty();
        for (let i = 0; i < qtext.length; ++i)
        {
            let qchar = qtext.charAt(i);
            let achar = atext.charAt(i);

            let chrNode = $("<span>").text(qchar);
            if (i >= atext.length) { chrNode.css('background', '#faa'); }
            else if (qchar != achar) { chrNode.css('background', 'yellow'); }

            this.$question.append(chrNode);
        }
    }

    updateEnterButton(): void
    {
        let yes = this.canEnter();
        this.$enterButton.removeClass(yes ? 'gray' : 'blue');
        this.$enterButton.addClass(yes ? 'blue' : 'gray');
    }

    canEnter(): boolean
    {
        let problem = this.model.getCurrentProblem();
        if (problem == null) { return false; }
        return problem.questionText.length == this.getAnswer().length;
    }

    getAnswer(): string
    {
        let rv = this.$answer.val().toString();
        
        // trim
        rv = rv.replace(/^\s+|\s+$/g,"");

        // 중복 공백을 하나의 공백으로
        let oldLength: number;
        do {
            oldLength = rv.length;
            rv = rv.replace(/  /g, ' ');
        } while (rv.length < oldLength)

        return rv;
    }

    resetAnswerText(): void
    {
        this.$answer.val('')
    }

    enableInput(yes: boolean): void
    {
        this.$answer.prop('disabled', !yes);
        if (yes)
        {
            this.$answer.focus();
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
