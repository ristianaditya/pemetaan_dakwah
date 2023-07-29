import React, { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import '../../assets/style/modalLogin.scss';
import { LuLogIn } from 'react-icons/lu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoIcon from '../../assets/logo/logo.svg';
import { useHistory, useLocation } from 'react-router-dom';

export default function ModalLogin() {

    const loginRef = useRef(null)
    const history = useHistory(); 
    const location = useLocation(); 
    const [showLogin, setShowLogin] = useState(false);
    const toggleModalLogin = () => {
        setShowLogin(!showLogin);
    };
    const token = localStorage.getItem('access_token') != "" && localStorage.getItem('access_token') ? true : false
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        const input = e.target;
        if (input.id == "email") {
            setEmail(input.value);
        } else {
            setPassword(input.value)
        }
    }

    const toggleGoDashboard = () => {
        history.push(location.pathname + '/admin');
    }

    const handleKeyLogin = (e) => {
        if(e.key === 'Enter'){
            loginRef.current.click();
        }
    }

    const loginFunc = () => {
        const loginBody = {
            "email" : email,
            "password": password
        }

        axios.post(`https://api.petadakwah.site/api/login`, loginBody
        )
        .then(res => {
            if (res.status == 200) {
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('user', JSON.stringify(res.data.user))

                history.push(location.pathname + '/admin');

                toast.success('Berhasil Hapus Data', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
            }
        })
        .catch(error => {
            if (error.response.status == 401) {
                toast.error('Username Atau Password Yang Anda Masukan Salah !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
            }
        })

    }
    return (
        <>
            {token ?
                <button className="btn btn-success login-button" style={{ fontFamily: 'Roboto' }} onClick={toggleGoDashboard}>Dashboard</button>
            : 
                <button className="btn btn-success login-button" style={{ fontFamily: 'Roboto' }} onClick={toggleModalLogin}><LuLogIn /> Login</button>
            }


            <Modal show={showLogin} onHide={toggleModalLogin} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className="login-container">
                    <div className="login-form">
                        <div className="login-form-inner">
                            <img src={ logoIcon } className='image_logo' style={{ height:' 65px' }}/>
                            <div className="sign-in-seperator pb-4">
                            </div>
                            <div className="login-form-group">
                                <label >Email <span className="required-star">*</span></label>
                                <input type="text" placeholder="email@example.com" id="email" onChange={handleChange} onKeyDown={handleKeyLogin}/>
                            </div>
                            <div className="login-form-group">
                                <label >Password <span className="required-star">*</span></label>
                                <input type="password" placeholder="Minimum 8 characters" id="password" onChange={handleChange} onKeyDown={handleKeyLogin}/>
                            </div>

                            <div className="login-form-group single-row">
                                <div className="custom-check">
                                </div>

                                <a href="#" className="link forgot-link">Forgot Password ?</a>
                            </div>

                            <button className="rounded-button login-cta" ref={loginRef} onClick={loginFunc}>Login</button>
                        </div>

                    </div>
                </div>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}