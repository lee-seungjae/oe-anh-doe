import { Question } from './Question'

export class Model
{
    currentProblemNumber: number;
    totalProblemCount: number;
    retryCounts: number[] = [];
    thisProblemRetryCount: number = 0;

    problems: Question[] = [
        { questionText: '외않되', rightAnswer: '왜안돼' },
        { questionText: '시럽계', rightAnswer: '실업계' },
        { questionText: '사생활치매', rightAnswer: '사생활침해' },
    ];
    
    constructor()
    {        
        this.currentProblemNumber = 1;
        this.totalProblemCount = this.problems.length;
    }

    goToStart(): void
    {
        this.retryCounts = [];
        this.currentProblemNumber = 1;
        this.thisProblemRetryCount = 0;
    }

    retry(): void
    {
        ++this.thisProblemRetryCount;
    }

    next(): void
    {
        this.retryCounts.push(this.thisProblemRetryCount);
        this.thisProblemRetryCount = 0;
        ++this.currentProblemNumber;
    }

    getCurrentProblem(): Question
    {
        return this.problems[this.currentProblemNumber - 1];
    }
}
