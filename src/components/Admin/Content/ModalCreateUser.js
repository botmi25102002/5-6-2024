import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CiSquarePlus } from "react-icons/ci";
import { toast } from 'react-toastify';

import { postCreateNewUser } from '../../../services/apiServices'
const ModalCreateUser = (props) => {

    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUserName("");
        setRole("USER");
        setImage("");
        setPreviewImg("");
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');


    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0])
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleSubmit = async (event) => {
        //validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!password) {
            toast.error('Invalid password');
            return;
        }
        //data
        let data = await postCreateNewUser(email, password, userName, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
        } if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }
    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                id="inputState"
                                className="form-select"
                                onChange={(event) => { setRole(event.target.value) }}
                                value={role}
                            >
                                <option value="USER">USERS</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <CiSquarePlus /> Upload File Image
                            </label>
                            <input
                                type="file"
                                id="labelUpload"
                                onChange={(event) => handleUploadImg(event)}
                                hidden />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImg ?
                                <img src={previewImg} />
                                :
                                <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmit() }}  >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;