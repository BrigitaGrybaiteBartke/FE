import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from './context/LoadingContext';
import { MessagesContext } from './context/MessagesContext';
import Post from './Post';

const Posts = () => {
    const { setLoading } = useContext(LoadingContext)
    const { setAlert } = useContext(MessagesContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/posts')
            .then(resp => {
                setPosts(resp.data)
            })
            .catch(err => {
                setAlert({ message: err.response.data.message, warning: true })
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <div className='section-main'>
                <div className='container'>
                    <div className="row justify-content-center">
                        {Array.isArray(posts)
                            ? posts.map(data => {
                                return <Post
                                    key={data.id}
                                    data={data.attributes}
                                />
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;