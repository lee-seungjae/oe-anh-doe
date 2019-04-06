import { Problem } from './Problem'

export class Model
{
    currentProblemNumber: number;
    totalProblemCount: number;
    retryCounts: number[] = [];
    thisProblemRetryCount: number = 0;
    problems: Problem[];
    
    constructor(problems: Problem[])
    {        
        this.problems = problems;
        this.currentProblemNumber = 1;
        this.totalProblemCount = problems.length;
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

    getCurrentProblem(): Problem
    {
        return this.problems[this.currentProblemNumber - 1];
    }
}
