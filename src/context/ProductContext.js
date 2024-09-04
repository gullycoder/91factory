import React, { useReducer, createContext, useEffect } from "react";
import { db } from "../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { query, addDoc, getDocs, collection, where, getDoc, doc, setDoc, updateDoc, writeBatch, arrayUnion, arrayRemove, serverTimestamp, deleteDoc } from "firebase/firestore";
import { UserContext } from "./UserContext";

const ProductContext = createContext();

const productsReducer = (state, action) => {
    switch (action.type) {
        case "CREATE_PRODUCT":
            return [...state, action.payload];
        case "UPDATE_PRODUCT":
            return state.map(product => {
                if (product.id === action.payload.id) {
                    return action.payload;
                } else {
                    return product;
                }
            });
        case "DELETE_PRODUCT":
            return state.filter(product => product.id !== action.payload.id);
        case "SET_PRODUCTS":
            return action.payload;
        default:
            return state;
    }
};


const ProductProvider = ({ children }) => {
    const [products, productsDispatch] = useReducer(productsReducer, []);
    const { currentUser } = React.useContext(UserContext);

    // useEffect(() => {
    //     const unsubscribe = async () => {
    //         await fetchProducts();
    //         console.log("products fetched");
    //     }
    //     unsubscribe();
    // }, []);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = querySnapshot.docs.map(doc => doc.data());
            productsDispatch({ type: "SET_PRODUCTS", payload: products });
        } catch (error) {
            console.log(error);
        }
    };

    // const createProduct = async (product) => {
    //     try {
    //         const q1 = query(collection(db, "products"), where("composition", "==", product.composition));
    //         const querySnap = await getDocs(q1);
    //         if (!querySnap.empty) {
    //             return { error: "Product already exists" };
    //         }
    //         let newProduct = {
    //             ...product,
    //             createdAt: serverTimestamp(),
    //             createdBy: currentUser.id,
    //         };
    //         const docRef = await addDoc(collection(db, "products"), newProduct);
    //         await setDoc(doc(db, "products", docRef.id), { id: docRef.id }, { merge: true });
    //         newProduct.id = docRef.id;
    //         productsDispatch({
    //             type: "CREATE_PRODUCT",
    //             payload: newProduct
    //         });
    //         return {
    //             product: newProduct
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             error: error.message
    //         };
    //     }

    // };

    // const updateProduct = async (product) => {
    //     let updatedProduct = {
    //         ...product,
    //         updatedAt: serverTimestamp(),
    //         updatedBy: currentUser.id,
    //     };
    //     try {
    //         await setDoc(doc(db, "products", updatedProduct.id), updatedProduct, { merge: true });
    //         productsDispatch({
    //             type: "UPDATE_PRODUCT",
    //             payload: updatedProduct
    //         });
    //         return {
    //             product: updatedProduct
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             error: error.message
    //         };
    //     }
    // }

    // const deleteProduct = async (product) => {
    //     try {
    //         await deleteDoc(doc(db, "products", product.id));
    //         productsDispatch({
    //             type: "DELETE_PRODUCT",
    //             payload: product
    //         });
    //         return {
    //             product: product
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             error: error.message
    //         };
    //     }
    // };

    const uploadProducts = async (products) => {
        try {
            const batch = writeBatch(db);
            products.forEach(product => {
                const productRef = doc(collection(db, "products"))
                batch.set(productRef, {
                    ...product,
                    createdAt: serverTimestamp(),
                    createdBy: currentUser.id,
                    id: productRef.id
                });
            });
            await batch.commit();
            console.log("products uploaded");
        } catch (error) {
            console.log(error);
            return {
                error: error.message
            };
        }
    }




    return (
        <ProductContext.Provider value={{ products, uploadProducts, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };