import { useState, useEffect } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz } from "../../../../services/apiServices";
import { toast } from 'react-toastify';


const Questions = () => {

    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }
            ]
        },
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }
            ]
        }
    ]
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState(
        {
            title: '',
            url: '',
        }
    )

    const handlePreViewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })

            setIsPreviewImage(true);
        }
    }
    const [questions, setQuestions] = useState(initQuestions)


    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            }
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }

    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);

        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }


    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId)
            // questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }

        }

    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    } if (type === 'INPUT') {
                        answer.description = value;
                    }

                }
                return answer;
            })

            setQuestions(questionsClone);
        }
    }
    const handleSubmitQuestionForQuiz = async () => {

        //todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please select');
            return;
        }
        //validate answers
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return;
        }



        //validate questions
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {

            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }

        }

        if (isValidQ === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return;
        }
        //submit questions
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
            }

        }
        toast.success(`Create questions and answers succeed!`);
        setQuestions(initQuestions);
    }

    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`,
                }
            })
            setListQuiz(newQuiz)
        }
    }
    return (

        <div className="questions-container container">
            <div className='title'>
                Manage Question
            </div>
            <hr />
            <div className='add-new-questions'>
                <div className="form-group col-6">
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    // className='form-control'
                    />
                </div>
                <div className='mt-3 mb-2'>

                    Add New Question:
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => { handleOnChange('QUESTION', question.id, event.target.value) }}
                                        />
                                        <label>Question {index + 1}'s Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`} className='label-upload'><LuImagePlus /> </label>
                                        <input
                                            id={`${question.id}`}
                                            type={"file"}
                                            onChange={(event) => { handleOnChangeFileQuestion(question.id, event) }}
                                            className="form-control" hidden />
                                        <span >
                                            {question.imageName ?
                                                <span
                                                    onClick={() => { handlePreViewImage(question.id) }}>
                                                    question.imageName
                                                </span>
                                                :
                                                '0 file is uploaded'}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')} >
                                            <CiCirclePlus className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <CiCircleMinus className='icon-remove' />
                                            </span>
                                        }
                                    </div>

                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className="form-check-input isCorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => {
                                                        handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)
                                                    }}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(event) => {
                                                            handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)
                                                        }}
                                                        placeholder="name@example.com" />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)} >
                                                        <CiCirclePlus className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <CiCircleMinus className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>

                                            </div>
                                        )
                                    })}



                            </div>

                        )
                    })
                }

                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            className='btn btn-warning'
                            onClick={() => { handleSubmitQuestionForQuiz() }}
                        >Save Questions</button>
                    </div>
                }
                {isPreviewImage === true && <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => { setIsPreviewImage(false) }} />}
            </div>
        </div>

    )

}
export default Questions;