import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import { LoadingContext } from './context/LoadingContext';
import './Post.css';


const SinglePost = () => {

    const { setLoading } = useContext(LoadingContext)
    const { id } = useParams()

    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])


    useEffect(() => {
        setLoading(true)

        axios.get('http://127.0.0.1:8000/api/posts/' + id)
            .then(resp => {
                // console.log(resp.data.comments)
                setPost(resp.data.attributes)
                setComments(resp.data.comments)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [id])

    return (
        <>
        
            <div className='section'>

                <div className='container'>

                    <article className="article">
                        <div className="article-title">
                            <div className="date text-secondary">{new Date(post.created_at).toLocaleDateString('en', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}</div>
                            <h1>{post.title}</h1>
                        </div>

                        <div className="article-img">
                            <img src={post.image_path} title={post.title} alt={post.title} />
                        </div>

                        <div className="article-content">
                            <p className='lh-lg'>{post.body}</p>


                            {/* comments */}
                            <div className='comment mt-5'>
                                <div className="comment-title">
                                    <h5>Comments</h5>
                                </div>
                                <div className='comment-body'>
                                    <ul class="list-group list-group-flush">
                                        {Array.isArray(comments)
                                            ? comments.map(comment => {
                                                return <Comments
                                                    key={comment.id}
                                                    comment={comment}
                                                />
                                            }) : null
                                        }
                                    </ul>
                                </div>

                                <form action='' method=''>
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="leaveComment" height="100px"></textarea>
                                        <label for="leaveComment">Leave a comment here...</label>
                                    </div>
                                </form>




                            </div>

                        </div>
                        <div className="mt-5">
                            <Link to={'/posts'} className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                <span>Back to posts</span>
                            </Link>
                        </div>
                    </article>

                </div>

            </div >

        </>
    );
};

export default SinglePost;