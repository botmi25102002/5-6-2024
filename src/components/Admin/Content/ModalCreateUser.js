import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CiSquarePlus } from "react-icons/ci";


const ModalCreateUser = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    return (
        <>
            <Button variant="primary" onClick={handleShow} >
                Launch demo modal
            </Button>

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
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;