import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext } from './context/LoadingContext';
import { AuthContext } from './context/AuthContext';
import { MessagesContext } from './context/MessagesContext';
import ImageUpload from './ImageUpload';
import { useForm } from 'react-hook-form';

const UpdatePost = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const token = auth.getToken();
    const { setLoading } = useContext(LoadingContext)
    const { setAlert } = useContext(MessagesContext)
    const { id } = useParams()
    const [postData, setPostData] = useState({
        title: '',
        excerpt: '',
        body: '',
        min_to_read: '',
        image_path: ''
    })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleError = (errors) => { console.log(errors) };

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            await axios.get(`http://127.0.0.1:8000/api/user/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => {
                    setPostData(resp.data.attributes)
                })
                .catch(err => {
                    setAlert({ message: err.response.data.message, warning: true })
                })
                .finally(() => setLoading(false))
        }
        if (token) {
            fetchData();
        }
    }, [id, token])

    const handleInputChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const handleImageSelected = (file) => {
        setPostData({ ...postData, image_path: file });
    }

    const handlePostUpdate = (data, e) => {
        setLoading(true)
        
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("excerpt", postData.excerpt);
        formData.append("body", postData.body);
        formData.append("min_to_read", postData.min_to_read);
        if (data.image_path[0]) {
            formData.append("image_path", data.image_path[0], data.image_path[0].name);
        }

        axios.post(`http://127.0.0.1:8000/api/user/posts/${id}?_method=PUT`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(resp => {
                navigate('/user/posts')
                setAlert({ message: 'Post updated successfully!' })
            })
            .catch(err => {
                setAlert({ message: err.response.data.message, warning: true })
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className='container '>
                <div className='mt-5 mb-3'>
                    <h5 className='text-center'>Update Post</h5>
                </div>
                <form onSubmit={handleSubmit(handlePostUpdate, handleError)}>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <input
                            className="form-control"
                            placeholder='PostTitle'
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            defaultValue={postData.title}
                        />
                        <label htmlFor="floatingInput">Post Title</label>
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <input
                            className="form-control"
                            placeholder='PostExcerpt'
                            type="text"
                            name="excerpt"
                            onChange={handleInputChange}
                            value={postData.excerpt}
                        />
                        <label htmlFor="floatingInput">Post Excerpt</label>
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <input
                            className="form-control"
                            type="text"
                            placeholder='MinToRead'
                            name="min_to_read"
                            onChange={handleInputChange}
                            value={postData.min_to_read}
                        />
                        <label htmlFor="floatingInput">Min to read</label>
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <textarea
                            className="form-control"
                            placeholder='PostContent'
                            name="body"
                            style={{ width: '100%', height: '150px' }}
                            onChange={handleInputChange}
                            value={postData.body}
                        />
                        <label htmlFor="floatingInput">Post Content</label>
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto">
                        <ImageUpload
                            onImageSelected={handleImageSelected}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className=' d-grid gap-2 col-8 mx-auto mb-3'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdatePost;
