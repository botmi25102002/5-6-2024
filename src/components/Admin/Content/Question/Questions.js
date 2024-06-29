import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';


const Questions = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState(
        [
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
    )


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
    const handleSubmitQuestionForQuiz = () => {
        console.log('check question', questions)
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
                        options={options}
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
                                        <span>{question.imageName ? question.imageName : '0 file is uploaded'}</span>
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
            </div>
        </div>
    )
}
export default Questions;