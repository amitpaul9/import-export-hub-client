import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../Firebase/Firebase.config"
import { ImportExportHubContext } from './importExportHubContext';

const ImportExportHubProvider = ({ children }) => {

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [theme, setTheme] = useState('light');

    //theme toggle function is inspired by online resourses
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'synthwave' : 'light';
            return newTheme;
        });
    };


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
            setLoader(false)
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
        setLoader,
        theme,
        toggleTheme


    }





    return (

        <ImportExportHubContext.Provider value={info}>{children}</ImportExportHubContext.Provider>

    );
};

export default ImportExportHubProvider;

