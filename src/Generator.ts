import { Problem } from "./Problem";

export function generateProblemList(rawData: string[], count: number): Problem[]
{
    return shuffle(rawData)
        .slice(0, count)
        .map(v => createProblem(parse(v)));
}

class Piece
{
    candidates: string[];
    onlyFirstIsCorrect: boolean;
}

function shuffle<T>(a: T[]): T[] {
    a = a.slice();
    for (let i = a.length - 1; i > 0; --i) {
        let j = randomInt(i + 1);
        let x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function parse(orig: string): Piece[]
{
    let rv: Piece[] = [];
    for (let word of orig.match(/{[^}]+}|<[^>]+>|[^{}<>]+/g))
    {
        rv.push({
            candidates: word.match(/[^{}<>|]+/g),
            onlyFirstIsCorrect: (word.charAt(0) == '{')
        })
    }
    //console.log(orig);
    //console.log(rv);
    return rv;
}

function createProblem(pieces: Piece[]): Problem
{
    let q = '';
    let a = '';
    for (let piece of pieces)
    {
        let candidates = piece.candidates;
        let selectedPiece = candidates[randomInt(candidates.length)];
        q += selectedPiece;
        a += piece.onlyFirstIsCorrect ? candidates[0] : selectedPiece;
    }
    return {
        questionText: q,
        rightAnswer: a
    }
}

// [0, n)
function randomInt(n: number)
{
    return Math.floor(Math.random() * n);
}

