import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import "./style/post.css";


export default function Post() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        if (title && desc) {
            fetch(`http://${window.location.hostname}:3000/note`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ title, desc })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success)
                    history.push('/notes');
                else
                    alert('failed')
            })
            .catch(err => console.log(err))
            .finally(setLoading(false));
        }
        else {
            setLoading(false)
            alert("fill the form correctly")
        }
    }

    return (
        <div className="postWrapper">
            <form onSubmit={submitHandler}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" required />
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="description" required ></textarea>
                <button disabled={loading} type="submit">post</button>
            </form>
        </div>
    )
}
