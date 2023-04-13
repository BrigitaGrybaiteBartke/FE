import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [loading, setLoading] = useState()

    return (
        <LoadingContext.Provider
            value={{ loading, setLoading }}>
            {children}
            {loading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

        </LoadingContext.Provider >
    );
};

export default LoadingProvider;
