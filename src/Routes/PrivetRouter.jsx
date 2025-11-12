import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';

const PrivetRouter = ({ children }) => {
    const { user, loader, authLoading } = useContext(ImportExportHubContext);
    const location = useLocation();

    if (authLoading || loader) {
        return <span className='loading loading-spinner text-success'></span>
    }

    else if (user) {
        return children;

    }

    return <Navigate state={location?.pathname} to="/login"></Navigate>


};

export default PrivetRouter;