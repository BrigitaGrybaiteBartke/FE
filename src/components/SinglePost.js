import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { LoadingContext } from './context/LoadingContext';
import './SinglePost.css';
import Comment from './Comment';
import { BsDot } from 'react-icons/bs';
import AddCommentForm from './AddCommentForm';
import { MessagesContext } from './context/MessagesContext';

const SinglePost = () => {
    const auth = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext)
    const { setAlert } = useContext(MessagesContext)
    const { id } = useParams()
    const token = auth.getToken();
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [postAuthor, setPostAuthor] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/posts/' + id)
            .then(resp => {
                setPost(resp.data.attributes)
                setComments(resp.data.comments)
                setPostAuthor(resp.data.post_author)
            })
            .catch(err => {
                setAlert({ message: err.response.data.message, warning: true })
            })
            .finally(() => setLoading(false))
    }, [id, refresh])

    const addComment = (newComment) => {
        setLoading(true)
        axios.post(`http://127.0.0.1:8000/api/posts/${id}/comments/create`, newComment, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(resp => {
                setRefresh(!refresh)
                setAlert({ message: 'Comment added successfully!' })
            })
            .catch(err => {
                setAlert({ message: err.response.data.message, warning: true })
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className='section-single-post'>
                <div className='container'>
                    <article className="article">
                        <div className="article-title">
                            <h1 className=''>{post.title}</h1>
                            <div className='article-subtitle d-flex justify-content-center align-items-center'>
                                <div className='article-author'>
                                    By&nbsp;
                                    <span className='fw-semibold'>
                                        {postAuthor.user_name}
                                    </span>
                                </div>
                                <BsDot />
                                <div className="article-date">
                                    {new Date(post.created_at).toLocaleDateString('en', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="article-img">
                            <img
                                src={post.image_path}
                                title={post.title}
                                alt={post.title}
                            />
                        </div>
                        <div className="article-content">
                            <div className='article-content-body'>
                                <p className='lh-lg'>{post.body}</p>
                            </div>
                            <div className='article-content-comments'>
                                <div className='comment-title'>
                                    {comments.length > 0 &&
                                        <h5 className='mt-5 mb-4'>Comments</h5>
                                    }
                                </div>
                                <div className='comment-body'>
                                    {Array.isArray(comments)
                                        ? comments.map(comment => {
                                            return <Comment
                                                key={comment.attributes.id}
                                                comment={comment.attributes}
                                                commentAuthor={comment.comment_author}
                                            />
                                        }) : null
                                    }
                                    <AddCommentForm
                                        submitLabel='Post'
                                        handleSubmit={addComment}
                                        isLoggedin={auth.isLoggedin()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Link
                                to={'/posts'}
                                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            >
                                <span>Back to posts</span>
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
};

export default SinglePost;