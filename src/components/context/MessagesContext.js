import React, { createContext, useEffect, useState } from 'react';

export const MessagesContext = createContext()

const MessagesProvider = ({ children }) => {

    const [alert, setAlert] = useState({})

    useEffect(() => { 
        if(alert.message)
            setTimeout(() => setAlert({}), 5000)
    }, [alert])

    return (
        <MessagesContext.Provider value={{ alert, setAlert }} >
            {alert.message &&
                <div className={'text-center alert alert-' + (alert.warning ? 'danger' : 'success')}>
                    {alert.message}
                </div>
            }
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesProvider;