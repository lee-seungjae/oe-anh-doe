import { Model } from './Model';

export class View {
    // controls
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

        this.$question = $('#question');
        this.$answer = $('#answer');
        this.$enterButton = $('#enterButton');
        this.$currentProblemNumber = $('#currentProblemNumber');
        this.$totalProblemCount = $('#totalProblemCount');    

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
}
