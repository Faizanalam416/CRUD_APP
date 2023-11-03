import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updateData } from './context/ContextProvider';


const Edit = () => {

    const { setUpData } = useContext(updateData);

    const navigate = useNavigate("");

    const [inputValue, setInp] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    })

    const setData = (e) => {
        const { name, value } = e.target;
        setInp((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        })
    }

    const { id } = useParams("");

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
            setInp(data);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const updateUser = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, work, add, desc } = inputValue;

        const res2 = await fetch(`https://crudappbackend-nmjh.onrender.com/updateUser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, add, desc
            })
        });

        const data2 = await res2.json();

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            navigate("/");
            setUpData(data2);
        }
    }

    return (
        <div className="container">
            <NavLink to="/" className={'active'}>Home /</NavLink><NavLink to={`/edit/${id}`} className={'active'}> Edit</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="email" value={inputValue.name} onChange={setData} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Email</label>
                        <input type="email" value={inputValue.email} onChange={setData} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Age</label>
                        <input type="number" value={inputValue.age} onChange={setData} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inputValue.mobile} onChange={setData} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" value={inputValue.work} onChange={setData} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inputValue.add} onChange={setData} name="add" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Descriptions</label>
                        <textarea name="desc" value={inputValue.desc} onChange={setData} className="form-control" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={updateUser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit