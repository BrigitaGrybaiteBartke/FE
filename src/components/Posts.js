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
                // console.log(resp.data)
                setPosts(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>

            <section className='section' id='blog'>
                <div className='container'>

                    <div className="row justify-content-center">
                        {Array.isArray(posts)
                            ? posts.map(data => {
                                // return console.log(data.comments)
                                // return console.log(data.attributes)
                                return <Post
                                    key={data.id}
                                    data={data.attributes}
                                // dataComments={data.comments}
                                />
                            })
                            : null
                        }
                    </div>
                </div>
            </section>



        </>
    );
};



export default Posts;