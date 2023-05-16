import React, { useContext, useState } from 'react';
import { LoadingContext } from './context/LoadingContext';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessagesContext } from './context/MessagesContext';
import ImageUpload from './ImageUpload';
import { useForm } from 'react-hook-form';

const CreateNewPost = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const token = auth.getToken();
    const { setLoading } = useContext(LoadingContext)
    const { setAlert } = useContext(MessagesContext)

    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleError = (errors) => { console.log(errors) };

    const [postData, setPostData] = useState({
        title: '',
        excerpt: '',
        body: '',
        min_to_read: '',
        image_path: ''
    })

    const handleInputChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const handleImageSelected = (file) => {
        setPostData({ ...postData, image_path: file });
    }

    const handlePostCreate = (data, e) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("_method", "POST");
        formData.append("title", data.title);
        formData.append("excerpt", data.excerpt);
        formData.append("body", data.body);
        formData.append("min_to_read", data.min_to_read);
        if (data.image_path[0]) {
            formData.append("image_path", data.image_path[0], data.image_path[0].name);
        }

        axios.post('http://127.0.0.1:8000/api/user/posts', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(resp => {
                navigate('/user/posts')
                setAlert({ message: 'Post created successfully!' })
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
                    <h5 className='text-center'>Create new Post</h5>
                </div>
                <form onSubmit={handleSubmit(handlePostCreate, handleError)}>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <input
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            placeholder='PostTitle'
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            {...register('title', {
                                required: '* Title field is required'
                            })}
                        />
                        <label htmlFor="floatingInput">Post Title</label>
                        {errors.title
                            && <div className='invalid-feedback'>
                                {errors.title.message}
                            </div>
                        }
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <input
                            className={`form-control ${errors.excerpt ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder='PostExcerpt'
                            name="excerpt"
                            onChange={handleInputChange}
                            {...register('excerpt', {
                                required: '* Excerpt field is required'
                            })}
                        />
                        <label htmlFor="floatingInput">Post Excerpt</label>
                        {errors.excerpt &&
                            <div className='invalid-feedback'>
                                {errors.excerpt.message}
                            </div>
                        }
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <input
                            className={`form-control ${errors.min_to_read ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder='MinToRead'
                            name="min_to_read"
                            onChange={handleInputChange}
                            {...register('min_to_read', {
                                required: '* Minutes to read field is required',
                                min: { value: 1, message: "* Minutes to read must be at least 1 minute" },
                                max: { value: 59, message: "* Minutes to read cannot exceed 60 minutes" },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "* Field must be a number",
                                }
                            })}
                        />
                        <label htmlFor="floatingInput">Min to read</label>
                        {errors.min_to_read &&
                            <div className='invalid-feedback'>
                                {errors.min_to_read.message}
                            </div>
                        }
                    </div>
                    <div className="form-floating col-8 mb-4 mx-auto text-secondary">
                        <textarea
                            className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                            placeholder='PostContent'
                            name="body"
                            style={{ width: '100%', height: '150px' }}

                            onChange={handleInputChange}
                            {...register('body', { required: '* Post content field is required' })}
                        />
                        <label htmlFor="floatingInput">Post Content</label>
                        {errors.body &&
                            <div className='invalid-feedback'>
                                {errors.body.message}
                            </div>
                        }
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

export default CreateNewPost;