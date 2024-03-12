import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password,
            });

            console.log('Login successful:', response.data.success);
            props.handleLogin();
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error('Login error:', error.response.data);
            setTimeout(() => setErrorMessage(''), 2000);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {errorMessage && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errorMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-center mb-4">Login</h3>
                                <div className="form-group mb-3">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        </div>
                                        <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
