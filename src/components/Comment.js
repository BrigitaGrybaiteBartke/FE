import React from 'react';
import { BsDot } from 'react-icons/bs';

const Comment = ({ comment, commentAuthor }) => {
    return (
        <>
            <div className="card mb-3 border-0">
                <div className="row g-0">
                    <div className="col-md-1 d-flex justify-content-end align-items-center">
                        <img
                            src="https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png"
                            className="img-fluid rounded-start"
                            alt="..."
                            width="80px"
                        />
                    </div>
                    <div className="col-md">
                        <div className="card-body">
                            <div className='card-title'>
                                <span className='fw-semibold'>
                                    {commentAuthor.user_name}
                                </span>
                                <BsDot />
                                <span className="text-secondary">
                                    {new Date(comment.created_at).toLocaleDateString('en', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <p className="card-text">
                                {comment.commentText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;