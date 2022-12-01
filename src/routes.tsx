import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
// import { getItem } from './utils/storage'



// function ProtectedRoutes({ redirectTo }) {
//     const isAuthenticated = getItem('token');
//     return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
// }

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />

            {/* 
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/home" element={<Home />} />
            </Route> */}
        </Routes>

    );
}

export default MainRoutes;