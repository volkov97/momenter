import React, { useState, useEffect } from 'react';

export const App = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => setCounter(counter => counter + 1), 1000);
    }, []);

    return (
        <div>{counter}</div>
    );
}