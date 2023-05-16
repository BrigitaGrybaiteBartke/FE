import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { LoadingContext } from './context/LoadingContext';
import { CgRemove } from 'react-icons/cg';
import { RxPencil1 } from 'react-icons/rx';
import { CgPlayListAdd } from 'react-icons/cg';


const Dashboard = () => {
    const auth = useContext(AuthContext);
    const token = auth.getToken();
    const { setLoading } = useContext(LoadingContext)
    const [posts, setPosts] = useState([])


    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            await axios.get('http://127.0.0.1:8000/api/user/posts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => {
                    setPosts(resp.data)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => setLoading(false))
        }

        if (token) {
            fetchData();
        }
    }, [token])

    const handleDelete = (id, e) => {
        axios.delete('http://127.0.0.1:8000/api/user/posts/' + id, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        })
            .then(resp => {
                if (resp.status == 200) {
                    const remaining = posts.filter((p) => p.id !== id)
                    setPosts(remaining)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className='container'>
                <div className="d-flex align-items-center justify-content-between mt-5">
                    <h4>Posts list</h4>
                    <NavLink to="/user/posts/new" className="btn btn-success">
                        <CgPlayListAdd className='icon-addnew' />
                    </NavLink>
                </div>
                <table className="table table-hover m-3 text-center align-middle">
                    <thead>
                        <tr className='text-center align-middle'>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Excerpt</th>
                            <th>Image</th>
                            <th>Created at</th>
                            <th>Modified at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {Array.isArray(posts)
                            ? posts.map(data => {
                                return <tr key={data.id} >
                                    <td className='col-2'>{data.user.user_name}</td>
                                    <td className='col-2'>{data.attributes.title}</td>
                                    <td className='col-8 text-start'>
                                        {data.attributes.body.split(' ').splice(0, 15).join(' ') + ' [...]'}
                                    </td>
                                    <td className='col text-start'>
                                        <img src={data.attributes.image_path} alt={data.attributes.title} width='50px' />
                                    </td>
                                    <td className="col-2">
                                        {new Date(data.attributes.created_at).toLocaleDateString('en-GB', {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </td>
                                    <td className="col-2">
                                        {new Date(data.attributes.updated_at).toLocaleDateString('en-GB', {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </td>
                                    <td className="col-2 align-items-center">
                                        <div className='d-flex justify-content-center'>
                                            <NavLink to={'/user/posts/update/' + data.id} className="btn btn-primary btn-sm me-3">
                                                <RxPencil1 className='icon' />
                                            </NavLink>
                                            <NavLink
                                                className="btn btn-danger btn-sm me-3"
                                                onClick={(e) => handleDelete(data.attributes.id, e)}
                                            >
                                                <CgRemove className='icon' />
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            })
                            : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Dashboard;