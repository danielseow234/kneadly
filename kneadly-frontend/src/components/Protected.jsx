import { useAuthUser } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

const Protected = ({ allowedRoles, children }) => {
    const auth = useAuthUser();
    const userRoles = auth().role;
    
    if (allowedRoles.includes(userRoles)) {
        return children;
    } else {
        return <Navigate to="/unauthorized" replace />;
    }
};

export default Protected;
