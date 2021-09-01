import React, { useState, useEffect } from 'react';
import "./style/home.css";

export default function Home() {
    const [working, setWorking] = useState(false);

    useEffect(() => {
      async function isServerAlive() {
        const res = await fetch(`http://localhost:3000/`);
        const data = await res.json();
        setWorking(data.success === true)
      }
      isServerAlive();
    }, []);

    return (
        <div>
            <h1 className="title">Docker Notes</h1>

            <p className="isOnline" id={working?"green":"red"}>
                Backend is { working ? null: <b>not</b> } online.
            </p>
        </div>
    );
}