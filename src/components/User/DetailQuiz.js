import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash';
import "./DetailQuiz.scss";


const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    useEffect(() => {
        fetchQuestions();
    }, [quizId]);
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('res', res);
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
                        answers.push(item.answers);
                        // console.log('answers', item.answers);
                    })
                    console.log('value', value, 'key', key);
                    // detail.questionId = key;
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            console.log('data', data);
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
                    <div className="question">
                        Question 1: What's your name?
                    </div>
                    <div className="answer">
                        <div className="a-child">A.Pham Xuan Truong</div>
                        <div className="a-child">B.pxt</div>
                        <div className="a-child">C.Kudotruong</div>
                        <div className="a-child">D.Tyet beo</div>
                    </div>
                </div>
                <div className='footer'>
                    <button className="btn btn-primary">Prev</button>
                    <button className="btn btn-secondary">Next</button>
                </div>
            </div>
            <div className="right-content">
                cout down
            </div>
        </div>
    );

}

export default DetailQuiz;