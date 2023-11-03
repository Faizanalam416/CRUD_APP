import React, { createContext, useState } from "react";

export const addData = createContext("");
export const updateData = createContext("");
export const delData = createContext("");

const ContextProvider = ({ children }) => {

    const [uData, setUData] = useState("");
    const [upData, setUpData] = useState("");
    const [dltData, setDltData] = useState("");

    return (
        <addData.Provider value={{ uData, setUData }}>
            <updateData.Provider value={{ upData, setUpData }}>
                <delData.Provider value={{ dltData, setDltData }}>
                    {children}
                </delData.Provider>
            </updateData.Provider>
        </addData.Provider>
    )
}

export default ContextProvider;