import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../../assets/style/modalLogin.scss';
import { FcGoogle } from 'react-icons/fc';

export default function ModalLogin() {

    const [showLogin, setShowLogin] = useState(false);
    const toggleModalLogin = () => {
    setShowLogin(!showLogin);
    };
    return (
        <>
            <button className="btn btn-success login-button" style={{ fontFamily: 'Roboto' }} onClick={toggleModalLogin}>Login</button>
            <Modal show={showLogin} onHide={toggleModalLogin} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className="login-container">
                    <div className="login-form">
                        <div className="login-form-inner">
                            <img src='./src/assets/logo/logoAljabar.svg' className='image_logo'/>

                            <a href="#" className="rounded-button google-login-button">
                                <FcGoogle className='iconGoogle'/> <span> Sign in with google</span>
                            </a>

                            <div className="sign-in-seperator">
                                <span>or Sign in with Email</span>
                            </div>

                            <div className="login-form-group">
                                <label >Email <span className="required-star">*</span></label>
                                <input type="text" placeholder="email@example.com" id="email" />
                            </div>
                            <div className="login-form-group">
                                <label >Password <span className="required-star">*</span></label>
                                <input type="text" placeholder="Minimum 8 characters" id="pwd" />
                            </div>

                            <div className="login-form-group single-row">
                                <div className="custom-check">
                                </div>

                                <a href="#" className="link forgot-link">Forgot Password ?</a>
                            </div>

                            <a href="#" className="rounded-button login-cta">Login</a>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}