import { Question } from './Question'

export class Model
{
    currentProblemNumber: number;
    totalProblemCount: number;

    private questions: Question[] = [
        { questionText: '외않되', rightAnswer: '왜안돼' },
        { questionText: '시럽계', rightAnswer: '실업계' },
        { questionText: '사생활치매', rightAnswer: '사생활침해' },
    ];
    
    constructor()
    {        
        this.currentProblemNumber = 1;
        this.totalProblemCount = this.questions.length;
    }

    goToStart(): void
    {
        this.currentProblemNumber = 1;
    }

    next(): boolean
    {
        if (this.currentProblemNumber < this.totalProblemCount)
        {
            ++this.currentProblemNumber;
            return true;
        }
        else
        {
            return false;
        }
    }

    getCurrentProblem(): Question
    {
        return this.questions[this.currentProblemNumber - 1];
    }
}
