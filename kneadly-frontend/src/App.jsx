import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import AppointmentClient from "./components/AppointmentClient";
import AppointmentTherapist from "./components/AppointmentTherapist";
import NewsletterGet from "./components/NewsletterGet";
import NewsletterSend from "./components/NewsletterSend";
import Review from "./components/Review";
import About from "./components/About";
import Contact from "./components/Contact";
import Therapists from "./components/Therapists";
import Profile from "./components/Profile";
import Protected from "./components/Protected";
import Editor from "./components/Editor";

import Error from './components/Error';
import Unauthorized from './components/Unauthorized';


const App = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route path='/' element={<Landing />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/newsletter/get' element={<NewsletterGet />} />
            <Route path='/therapists' element={<Therapists />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* client routes */}
            <Route path='/appointment/client' element={
                <RequireAuth loginPath={'/login'}>
                    <Protected allowedRoles={['CLIENT']}>
                        <AppointmentClient />
                    </Protected>
                </RequireAuth>
            } />
            <Route path='/appointment/edit' element={
                <RequireAuth loginPath={'/login'}>
                    <Protected allowedRoles={['CLIENT']}>
                        <Editor />
                    </Protected>
                </RequireAuth>
            } />
            <Route path='/review' element={
                <RequireAuth loginPath={'/login'}>
                    <Protected allowedRoles={['CLIENT']}>
                        <Review />
                    </Protected>
                </RequireAuth>
            } />

            {/* therapist routes */}
            <Route path='/appointment/therapist' element={
                <RequireAuth loginPath={'/login'}>
                    <Protected allowedRoles={['THERAPIST']}>
                        <AppointmentTherapist />
                    </Protected>
                </RequireAuth>
            } />
            <Route path='/Newsletter/send' element={
                <RequireAuth loginPath={'/login'}>
                    <Protected allowedRoles={['THERAPIST']}>
                        <NewsletterSend />
                    </Protected>
                </RequireAuth>
            } />

            {/* therapist and client routes */}
            <Route path='/profile' element={
                <RequireAuth loginPath={'/login'}>
                    <Profile />
                </RequireAuth>
            } />

            {/* backup routes */}
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default App;