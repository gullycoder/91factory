import React, { useReducer, useState } from 'react';
import { collection, query, where, getDocs, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";


const UserContext = React.createContext()

const usersReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return [...state, action.payload]
        default:
            return state
    }
}


const UserProvider = ({ children }) => {
    const [users, usersDispatch] = useReducer(usersReducer, []);
    const [currentUser, setCurrentUser] = useState(null);


    const fetchUserById = async (id) => {
        let user = {};
        try {
            const q = query(collection(db, "users"), where("id", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                user = { ...doc.data() };
            });
            if (user.id) {
                usersDispatch({ type: 'CREATE_USER', payload: user })
                return {
                    user
                }
            } else {
                return {
                    error: 'User not found'
                }
            }
        } catch (error) {
            return {
                error: error.message
            };
        }
    }


    const createUser = async (user) => {
        if (!user.userType) {
            return {
                error: 'You are not registered. Please contact 91factory team'
            }
        }
        let newUser = {};
        try {
            const q = query(collection(db, "users"), where("id", "==", user.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                newUser = { ...doc.data() };
            });

            if (newUser.id) {
                usersDispatch({ type: 'CREATE_USER', payload: newUser })
            } else {
                newUser = {
                    ...user,
                    createdAt: serverTimestamp(),
                }
                await setDoc(doc(db, "users", newUser.id), newUser);
                usersDispatch({ type: 'CREATE_USER', payload: newUser })
            }
            return {
                user: newUser
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    }




    return (
        <UserContext.Provider
            value={{ users, fetchUserById, currentUser, createUser, setCurrentUser }}
        >
            {children}
        </UserContext.Provider>

    )
}

export { UserContext, UserProvider };