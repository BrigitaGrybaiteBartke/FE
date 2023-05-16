import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const AddCommentForm = ({ submitLabel, handleSubmit, isLoggedin }) => {

    const ref = useRef(null);
    const [newComment, setNewComment] = useState('')
    const isTextAreaDisabled = newComment.length === 0

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(ref.current.value)
        handleSubmit(newComment)
        setNewComment('')
        if (ref) {
            ref.current.value = ''
        }
    }

    const handleInputChange = (e) => {
        setNewComment({ [e.target.name]: e.target.value })
    }

    return (
        <>
            <h5 className='mt-5 mb-3'>Leave a comment</h5>
            {isLoggedin ? (
                <form
                    onSubmit={onSubmit}
                >
                    <div className="form-floating mb-3 text-secondary">
                        <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            name='commentText'
                            style={{ height: '100px', maxWidth: '600px' }}
                            ref={ref}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="commentText">Comment</label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isTextAreaDisabled}
                    >
                        {submitLabel}
                    </button>
                </form>
            ) : <>
                To leave a comment You need to &nbsp;
                <NavLink
                    to="/login"
                    className="navbar-brand text-primary">
                    login &nbsp;
                </NavLink>
                first!
            </>
            }
        </>
    );
};

export default AddCommentForm;