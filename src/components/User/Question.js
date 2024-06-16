import _ from 'lodash';


const Question = (props) => {
    const { data, index, handleCheckbox } = props;
    if (_.isEmpty(data)) {
        return (<></>);
    }

    const handleCheckboxInput = (event, aid, qid) => {
        // console.log('check', event.target.checked);
        console.log(">>check props", aid, qid);
        handleCheckbox(aid, qid);
    }
    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
                :
                <div className='q-image'></div>
            }
            <div className="question">
                Question {index + 1}: {data.questionDescription}
            </div>
            <div className="answer">
                {data.answers && data.answers.length && data.answers.map((a, index) => {
                    return (
                        <div
                            key={`${index}-answers`}
                            className="a-child"
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={a.isSelected}
                                    onChange={(event) => { handleCheckboxInput(event, a.id, data.questionId) }}
                                />
                                <label className="form-check-label" >
                                    {a.description}
                                </label>
                            </div>

                        </div>
                    )
                })}
                {/* <div className="a-child">A.Pham Xuan Truong</div>
                <div className="a-child">B.pxt</div>
                <div className="a-child">C.Kudotruong</div>
                <div className="a-child">D.Tyet beo</div> */}
            </div>
        </>
    )
}

export default Question;