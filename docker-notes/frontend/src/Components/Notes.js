import React, { useEffect, useState } from 'react';
import "./style/notes.css";

export default function Notes() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://${window.location.hostname}:3000/notes`)
         .then(res => res.json())
         .then(data => {
            setNotes(data)
            setLoading(false);
         })
    }, [])

    return (
        <>
            <h1 className="noteTitle">Notes</h1>
            <div className="notes">
                {   loading ?
                    <h2 className="loading">Loading notes...</h2>
                    :
                    notes.map((note, i) => 
                        <div className="note" key={i}>
                            <h3>{note.title}</h3>
                            <p>{note.desc}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}
