import { Link } from 'react-router-dom';
import './Post.css';
import { IoIosArrowRoundForward } from 'react-icons/io'


const Post = ({ data }) => {

    return (
        <>
            <div className="col-xs-12 col-lg-6 mb-2 mt-2 column">
                <div className="blog">

                    {/* image */}
                    <div className="blog-img">
                        <div className="date">{new Date(data.created_at).toLocaleDateString('en', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</div>
                        <Link to={'/posts/' + data.id}>
                            <img src={data.image_path} alt={data.title} className="w-100" />
                        </Link>
                    </div>

                    <div className="blog-info">
                        <h5><Link to={'/posts/' + data.id}>{data.title}</Link></h5>
                        <p>{data.body.split(' ').splice(0, 15).join(' ') + ' [...]'}</p>
                        <div className="read">
                            <Link to={'/posts/' + data.id} className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                <span>Continue reading <IoIosArrowRoundForward /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};

export default Post;










