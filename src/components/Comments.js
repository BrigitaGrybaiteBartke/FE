import React from 'react';

const Comments = ({ comment }) => {
    return (
        <>




            <li className="list-group-item">

                <div className="card mb-3 border-0" max-width="240px;">
                    <div className="row g-0">
                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                            <img src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png" className="img-fluid rounded-start" alt="..." width="70px" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h6 className="card-title">Person 1</h6>
                                <span className="date">{new Date().toLocaleDateString('en', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</span>
                                <p className="card-text"> {comment.commentText}</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>


            </li>


        </>
    );
};

export default Comments;