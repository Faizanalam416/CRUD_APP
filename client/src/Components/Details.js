import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Details = () => {

    const [getUserData, setUserData] = useState([]);

    const { id } = useParams("");

    const navigate = useNavigate();

    const getData = async () => {

        const res = await fetch(`https://crudappbackend-nmjh.onrender.com/getUser/${id}`, {
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
            navigate("/");
        }
    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 300 }}>Welcome {getUserData.name}</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getUserData._id}`}><button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger mx-2" onClick={() => deleteUser(getUserData._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span>{getUserData.name}</span></h3>
                            <h3 className="mt-3">Age: <span>{getUserData.age}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getUserData.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occupation: <span>{getUserData.work}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">

                            <p className="mt-5"><PhoneAndroidIcon />Mobile: <span>{getUserData.mobile}</span></p>
                            <p className="mt-3"><LocationOnIcon />Location: <span>{getUserData.add}</span></p>
                            <p className="mt-3">Description: <span>{getUserData.desc}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details