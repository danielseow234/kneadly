import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Bookings from "./components/Bookings";
import TherapistHome from "./components/TherapistHome";
import About from "./components/About";
import Contact from "./components/Contact";
import Protected from "./components/Protected";
import BookingEditor from "./components/BookingEditor";

import Error from './components/Error';
import Unauthorized from './components/Unauthorized';


const App = () => {
    return (
        <Routes>
            {/* <CustomNavbar /> */}
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='/bookings' element={<Bookings />} />
            <Route path='/therapist/home' element={<TherapistHome />} />
            <Route path='/bookingedit' element={<BookingEditor />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default App;
