import { useState } from 'react';
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });
    async function onSubmit(event) {
        event.preventDefault();
        await doRequest();
    }

    //return a signup form with email and password
    return <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input
                value={password}
                onChange={event=>setPassword(event.target.value)}
                type="password"
                className="form-control"
            />
        </div>
        {errors}
        <button className="btn btn-primary">Sign In</button>
    </form>
};