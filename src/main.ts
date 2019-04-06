import { Scoring } from './Scoring'
import { Model } from './Model'
import { ProblemView } from './ProblemView'
import { ResultView } from './ResultView';

// TODO:
// 텍스트 랜덤 처리

$(document).ready(() => {
    //return testResultView();

    let model = new Model();
    let pview = new ProblemView(model);
    let rview = new ResultView(model);

    function reset()
    {
        rview.show(false);
        model.goToStart();
        pview.setUpQuestion();
        pview.resetAnswerText();
        pview.show(true);
    }

    pview.onEnter = () => {
        let p = model.getCurrentProblem();
        if (pview.getAnswer() !== p.rightAnswer)
        {
            alert(`틀렸어요.. 😢\n\n정답은 "${p.rightAnswer}" 입니다.\n\n다시 해볼까요?`)
            model.retry();
            pview.resetAnswerText();
            return;
        }

        alert('맞았어요! 👏')
        model.next();

        if (model.getCurrentProblem())
        {
            pview.setUpQuestion();
            pview.resetAnswerText();
        }
        else
        {
            pview.show(false);
            rview.update();
            rview.show(true);
        }
    }

    rview.onRetry = () => {
        reset();
    }

    // 초기화
    reset();
});

function testResultView()
{
    let model = new Model();
    let rview = new ResultView(model);

    model.goToStart();

    model.next();

    model.retry();
    model.next();

    model.retry();
    model.retry();
    model.next();

    rview.update();
    rview.onRetry = () => alert('RETRY');
}