import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";


const Questions = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    return (

        <div className="questions-container container">
            <div className='title'>
                Manage Question
            </div>
            <div className='add-new-questions'>
                <div className="form-group col-6">
                    <label>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    // className='form-control'
                    />
                </div>
                <div className='mt-3'>

                    Add New Question:
                </div>
                <div>
                    <div className='question-content'>
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image: </label>
                            <input type="file" className="form-control" hidden />
                            <span>0 file is upload</span>
                        </div>
                        <div className='btn-add'>
                            <span >
                                <CiCirclePlus className='icon-add' />
                            </span>
                            <span >
                                <CiCircleMinus className='icon-remove' />
                            </span>

                        </div>

                    </div>
                    <div className='answers-content'>
                        <input
                            className="form-check-input isCorrect"
                            type="checkbox"
                        // checked={a.isSelected}
                        // onChange={(event) => { handleCheckboxInput(event, a.id, data.questionId) }}
                        />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span >
                                <CiCirclePlus className='icon-add' />
                            </span>
                            <span >
                                <CiCircleMinus className='icon-remove' />
                            </span>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Questions;