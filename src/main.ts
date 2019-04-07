import { Model } from './Model'
import { ProblemView } from './ProblemView'
import { ResultView } from './ResultView';
import { ModalDialog } from './ModalDialog';
import { ModalWindowStack } from './ModalWindow';
import { generateProblemList } from './Generator'

let rawData = [
    '{벚|벗|벛|벋|벝|벘}{꽃|꼿|꽂|꽅|꼳|꽀} 가지를 {꼿꼿|꽂꽂|꽃꽃|꼳꼳|꽅꽅|꽀꽀}하게 {꽂|꼿|꽃|꼳|꽅|꽀}{았|앗}다.',
    '<이를 빼야|밥을 먹어야|게임을 해야|학교에 가야|히녹스를 잡아야|리퍼부터 죽여야> 하는{데|대} 말이{에|애}요.',
    '<짐승같이|괴물같이|좀비가|투명드래곤이> 울부{짖|짓|짗|짇|짙|짔}{었|엇}다.',
    '난 {했|햇}으니까 다음은 네 차{례|래|레}야.',
    '숲 한가운{데|대}{에|애} <마스터 소드가|연필이|삽이> {꽂|꼿|꽃|꽅|꼳|꽀}혀 {있|잇}{었|엇}{대|데}.',
    '거기 {갔|갓}다 온 기억이 안 나는{데|대}요.',
    '빙그{레|래} 웃으시더니 말{씀|슴}하{셨|셧}다.',
    '당장 <의자|벤치>{에|애} {앉아|안자}라.',
    '<그늘|나무 밑>{에|애} 가서 잠깐 쉴까?',
    '물고기가 펄{떡|덕}거{렸|렷}다.',
    '{옛|옜}날 <집 안|사람|서울|마을>의 모습',
    '글{씨|시}를 잘 {썼|썻}다.',
    '주말 오전에는 {게|께|개|깨}임을 하면 안 {되|돼}는 거 잘 알{잖|잔}아?',
    '내가 {왜|외} 그{래|레}야 {돼|되}?',
    '양치를 하지 {않|안}으면 너의 치아가 무사하지 못할 것이다!',
    '그러면 {안|않} {돼|되}!',
    '그걸 먹으면 안 {돼|되}!',
    '그러면 {안|않} {돼|되}요!',
    '그걸 먹으면 안 {되|돼}지.',
    '그러면 {안|않} {됩|됍}니다!',
    '그러면 {왜|외} {안|않} {돼|되}?',
    '그러지 {않|안}{았|앗}다.',
    '그러지 {않|안}기로 {했|햇}{잖|잔}아?',
    '그러지 {않|안}고는 살 수가 없{었|엇}어요.',
    '이제 너랑 같이 게임 {안|않} 할 거야!'
]

$(document).ready(() => {
    let problems = generateProblemList(rawData, 5);
    let model = new Model(problems);
    let pview = new ProblemView(model);
    let rview = new ResultView(model);
    let wstack = new ModalWindowStack();

    showProblemView();

    //-------------------------------------------------------------------------
    function showProblemView()
    {
        model.goToStart();

        pview.setUpQuestion();
        pview.resetAnswerText();
        wstack.showAndPush(pview);
        pview.enableInput(true);

        pview.onEnter = () => {
            pview.enableInput(false);
            let p = model.getCurrentProblem();
            if (pview.getAnswer() === p.rightAnswer)
            {
                return showCorrectDlg();
            }
            else
            {
                return showWrongDlg(p.rightAnswer);
            }
        }
    }

    //-------------------------------------------------------------------------
    function showCorrectDlg()
    {
        let buttonCaption = model.getCurrentProblemNumber() >= model.getTotalProblemCount()
            ? '결과 확인하기 ⏎'
            : '다음 문제 ⏎';

        let dlg = new ModalDialog('correctDlg', 'kf_popin 0.7s', buttonCaption);
        wstack.showAndPush(dlg);

        dlg.onClose = () =>
        {
            wstack.hideAndPop(dlg);
            model.next();

            if (model.isEnded())
            {
                wstack.hideAndPop(pview);
                showResultView();
            }
            else
            {
                pview.setUpQuestion();
                pview.resetAnswerText();
                pview.enableInput(true);
            }
        }
    }

    //-------------------------------------------------------------------------
    function showWrongDlg(rightAnswer: string)
    {
        let dlg = new ModalDialog('wrongDlg', 'kf_drop 0.7s', '다시 해보기 ⏎');
        dlg.findChild('#rightAnswer').text(rightAnswer);
        wstack.showAndPush(dlg);

        dlg.onClose = () =>
        {
            wstack.hideAndPop(dlg);

            model.retry();
            pview.enableInput(true);
        }
    }

    //-------------------------------------------------------------------------
    function showResultView()
    {
        rview.update();
        if (model.wasPerfect())
        {
            rview.onRetry = () => { };
        }
        else
        {
            rview.onRetry = () => {
                wstack.hideAndPop(rview);
                showProblemView();
            }                
        }

        wstack.showAndPush(rview);
    }
});

