import { FiX } from 'react-icons/fi';
import { FaMosque } from 'react-icons/fa';
import { BiShapePolygon } from 'react-icons/bi';
import { MdOutlineNumbers } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { slide as Menu } from 'react-burger-menu';
import React, { useState } from 'react';
import '../../assets/style/sideBar.scss';

export default function MasjidMenu({ showFormMasjid, handleCloseFormMasjid, handleShow }) {

    return (
        <>
            <Menu isOpen={showFormMasjid} className='sideBarForm' customBurgerIcon={false} onClose={handleCloseFormMasjid} style={{ fontFamily: 'Roboto' }}>
                <div>
                    <div className="row header-sidebar">
                        <div className="col-1 btn-side-back" onClick={handleShow}>
                            <div ><h5><GiHamburgerMenu /></h5></div>
                        </div>
                        <div className="col title-menu-sidebar" style={{ fontFamily: 'Roboto' }}>
                            <div>Pemetaan Masjid</div>
                        </div>
                        <div className="col-1 btn-side-back" onClick={handleCloseFormMasjid}>
                            <div ><h4><FiX /></h4></div>
                        </div>
                    </div>
                    <form className='formInput'>
                        <div className="form-group">
                            <label className='label-form'>Nama Masjid <span className="required-star">*</span></label>
                            <div className="inner-addon right-addon">
                                <i className="glyphicon"><FaMosque /></i>
                                <input className="form-control input-sidebar" placeholder="Masukan Nama Masjid" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='label-form'>Jumlah Jama'ah <span className="required-star">*</span></label>
                            <div className="inner-addon right-addon">
                                <i className="glyphicon"><MdOutlineNumbers /></i>
                                <input type='number' className="form-control input-sidebar" placeholder="Masukan Rata2 Jama'ah" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className='label-form'>Buat Area Masjid <span className="required-star">*</span></label>
                            <a className="btn btn-outline-success btn-area" ><BiShapePolygon /> Buat Area Masjid</a>
                            <textarea readOnly type='number' className="form-control input-sidebar-area" id='area_masjid' />
                        </div>
                    </form>
                    <div className='footer'>
                        <a className='batal'>Batal</a>
                        <button className='btn btn-success simpan-sidebar'>Simpan</button>
                    </div>
                </div>
            </Menu>
        </>
    );
}