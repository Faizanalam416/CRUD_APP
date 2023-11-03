import React, { useContext, useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { addData, delData, updateData } from './context/ContextProvider';

const Home = () => {

    const [getUserData, setUserData] = useState([]);

    const { uData } = useContext(addData);
    const { upData } = useContext(updateData);
    const { dltData, setDltData } = useContext(delData);

    const getData = async () => {

        const res = await fetch("https://crudappbackend-nmjh.onrender.com/getData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setUserData(data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const deleteUser = async (id) => {
        const res2 = await fetch(`https://crudappbackend-nmjh.onrender.com/deleteUser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deleteData = await res2.json();

        if (res2.status === 422 || !deleteData) {
            console.log("Error");
        } else {
            setDltData(deleteData);
            getData();
        }
    }



    return (
        <>
            {
                uData ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{uData.name}</strong> added successfully.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                upData ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{upData.name}</strong> updated successfully.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                dltData ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltData.name}</strong> deleted successfully.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            <div className="mt-5">
                <div className="container">

                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getUserData.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteUser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home
