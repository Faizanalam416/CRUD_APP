import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addData } from "./context/ContextProvider";

const Register = () => {

    const { setUData } = useContext(addData);

    const navigate = useNavigate();

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

    const addInpData = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, work, add, desc } = inputValue;

        const res = await fetch("https://crudappbackend-nmjh.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, add, desc
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            alert("Fill the data / unique email");
            console.log("error ");
        } else {
            navigate("/");
            setUData(data);
        }
    }

    return (
        <div className="container">
            <NavLink to="/" className={'active'}>Home /</NavLink><NavLink to="/register" className={'active'}> Register</NavLink>
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
                    <button type="submit" onClick={addInpData} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register