import { useState } from 'react'
import './Signup.scss'
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleClickBtnSignup = async () => {
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!password) {
            toast.error('Invalid password');
            return;
        }
        let data = await postSignup(email, password, username);
        console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        } if (data && data.EC !== 0) {
            toast.error(data.EM);

        }
    }
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <div className='header'>
                <span>Free create account!</span>
                <button onClick={() => { navigate("/login") }}> Log in</button>
            </div>
            <div className='title col-4 mx-auto'>
                Pham Xuan Truong
            </div>
            <div className='welcome col-4 mx-auto'>
                Create a new account
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group '>
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='form-group '>
                    <label>Username</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    ></input>
                </div>
                <div className='form-group pass-group'>
                    <label>Password</label>
                    <input
                        type={isShowPassword ? "password" : "text"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <span className="eye" onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        {isShowPassword ? <FaEyeSlash /> : < FaEye />}
                    </span>
                </div>

                <div>
                    <button onClick={() => { handleClickBtnSignup() }}>Signup</button>
                </div>
                <div className="text-center">
                    <span className="back" onClick={() => { navigate("/") }}>	&#60;&#60;Go back to HomePage</span><br />
                    <span className="back" onClick={() => { navigate("/login") }}>	&#60;&#60;Go back to Login</span>
                </div>
            </div>

        </div>
    )
}
export default Signup;