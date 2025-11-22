import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../Firebase/Firebase.config"
import { ImportExportHubContext } from './importExportHubContext';

const ImportExportHubProvider = ({ children }) => {

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(null);


    const signupUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const signOutUser = () => {
        return signOut(auth);
    }

    const provider = new GoogleAuthProvider();
    const signinwithGoogle = () => {
        return signInWithPopup(auth, provider)

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false);
            setAuthLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const info = {
        signInUser,
        signupUser,
        signOutUser,
        loader,
        user,
        setUser,
        authLoading,
        signinwithGoogle,
        setLoader


    }





    return (
        <div>
            <ImportExportHubContext value={info}>{children}</ImportExportHubContext>
        </div>
    );
};

export default ImportExportHubProvider;

