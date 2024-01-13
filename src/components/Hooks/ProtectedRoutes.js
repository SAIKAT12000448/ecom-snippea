import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ Component }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsToken(true);
        } else {
            navigate('/login', { state: { from: location } });
        }
    }, [location, navigate]);

    if (isToken) {
        return <Component />;
    } else {
        return null;
    }
}

export default ProtectedRoutes;
