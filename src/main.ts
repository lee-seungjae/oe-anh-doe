import { View } from './View'
import { Scoring } from './Scoring'
import { Model } from './Model'

// TODO:
// 한방에 다 맞히면 성공
// 텍스트 랜덤 처리


$(document).ready(() => {
    let model = new Model();
    let view = new View(model);

    model.goToStart();
    view.setUpQuestion();

    view.onEnter = () => {
        let p = model.getCurrentProblem();
        if (view.getAnswer() == p.rightAnswer)
        {
            alert('맞았어요! 👏')
            if (model.next())
            {
                view.setUpQuestion();
                view.resetAnswerText();
            }
            else
            {

            }
        }
        else
        {
            alert(`틀렸어요.. 😢\n\n정답은 "${p.rightAnswer}" 입니다.\n\n다시 해볼까요?`)
        }        
    }
});