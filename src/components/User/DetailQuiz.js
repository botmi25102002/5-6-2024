import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from 'lodash';
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";


const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }
    useEffect(() => {
        fetchQuestions();
    }, [quizId]);
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;


            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let questionDescription, image = null;
                    let answers = [];
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                        // console.log('answers', item.answers);
                    })

                    // detail.questionId = key;
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            // console.log('data', data);
            setDataQuiz(data);
        }

    };
    // console.log('check dataQuiz', dataQuiz);

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);   // cloneDeep clone tất cả.
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === + questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    const handleFinish = async () => {
        console.log("check data>>>", dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {

                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(answer => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(answer.id);
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            //submit api
            let res = await postSubmitQuiz(payload);
            console.log('check>>', res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
                setIsShowModalResult(true);
            } else {
                alert('something went wrong...');
            }
        }
    };
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} :   {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    <Question
                        handleCheckbox={handleCheckbox}
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className='footer'>
                    <button
                        className="btn btn-primary"
                        onClick={() => { handlePrev() }}
                    >Prev</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => { handleNext() }}
                    >Next</button>
                    <button
                        className="btn btn-warning"
                        onClick={() => { handleFinish() }}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                cout down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );

}

export default DetailQuiz;