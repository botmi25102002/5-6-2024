import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Auth/Signup';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';

const NotFound = () => {
    return (
        <div className="alert mt-4 alert-danger container">
            404.Not found data with your current URL
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<ListQuiz />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />

                <Route path='/admin' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            // theme="light"
            // transition:Bounce
            />
        </>
    )
}
export default Layout;