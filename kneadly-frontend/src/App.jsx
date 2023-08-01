import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Bookings from "./components/Bookings";
import Protected from "./components/Protected";

import Error from './components/Error';
import Unauthorized from './components/Unauthorized';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/bookings' element={<Bookings />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default App;
