import _ from 'lodash';


const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return (<></>);
    }
    return (
        <>
            {data.image &&
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
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
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
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