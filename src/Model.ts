import { Problem } from './Problem'

export class Model
{
    retryCounts: number[] = [];
    thisProblemRetryCount: number = 0;
    problems: Problem[];
    
    constructor(problems: Problem[])
    {        
        this.problems = problems;
    }

    goToStart(): void
    {
        this.retryCounts = [];
        this.thisProblemRetryCount = 0;
    }

    retry(): void
    {
        ++this.thisProblemRetryCount;
    }

    getCurrentProblemNumber(): number
    {
        return this.retryCounts.length + 1;
    }

    getTotalProblemCount(): number
    {
        return this.problems.length;
    }

    next(): void
    {
        if (!this.isEnded())
        {
            this.retryCounts.push(this.thisProblemRetryCount);
        }
        this.thisProblemRetryCount = 0;
    }

    getCurrentProblem(): Problem
    {
        return this.problems[this.getCurrentProblemNumber() - 1];
    }

    isEnded(): boolean
    {
        return this.retryCounts.length == this.problems.length;
    }

    wasPerfect(): boolean
    {
        console.assert(this.isEnded())
        for (let c of this.retryCounts)
        {
            if (c > 0)
            {
                return false;
            }
        }
        return true;
    }
}
