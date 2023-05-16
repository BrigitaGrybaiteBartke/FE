import { NavLink } from 'react-router-dom';
import './Post.css';
import { IoIosArrowRoundForward } from 'react-icons/io'

const Post = ({ data }) => {
    return (
        <>
            <div className="col-xs-12 col-lg-6 mb-2 mt-2 column">
                <div className="blog-card">
                    <div className="blog-card-img">
                        <div className="date">
                            {new Date(data.created_at).toLocaleDateString('en-GB', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </div>
                        <NavLink to={'/posts/' + data.id}>
                            <img src={data.image_path} alt={data.title} className="w-100" />
                        </NavLink>
                    </div>
                    <div className="blog-card-info">
                        <div className='info-title'>
                            <h5><NavLink to={'/posts/' + data.id}>{data.title}</NavLink></h5>
                        </div>
                        <div className='info-body'>
                            {(data.body).match(/[^\S\r\n]|\S/g).length >= 150
                                ? <p>{data.body.split(' ').splice(0, 15).join(' ') + ' [...]'}</p>
                                : <p>{data.body + ' [...]'}</p>
                            }
                        </div>
                        <div className="continue-reading d-flex justify-content-between">
                            <NavLink
                                to={'/posts/' + data.id}
                                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            >
                                <span>Continue reading&nbsp;<IoIosArrowRoundForward /></span>
                            </NavLink>
                            <div className='min-t'>
                                <span className='text-secondary'>{data.min_to_read}&nbsp;min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Post;










