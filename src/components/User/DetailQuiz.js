import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";


const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    console.log('params', params);
    useEffect(() => {
        fetchQuestions();
    }, [quizId]);
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('res', res);
    };
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    );

}

export default DetailQuiz;