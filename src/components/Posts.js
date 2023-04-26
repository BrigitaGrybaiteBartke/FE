import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from './context/LoadingContext';
import Post from './Post';

const Posts = () => {

    const { setLoading } = useContext(LoadingContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoading(true)

        axios.get('http://127.0.0.1:8000/api/posts')
            .then(resp => {
                setPosts(resp.data)
            })
            .catch(error => {
                console.log(error)
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