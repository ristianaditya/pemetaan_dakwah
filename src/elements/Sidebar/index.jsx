import { slide as Menu } from 'react-burger-menu';
import React, { useState } from 'react';
import '../../assets/style/sideBar.scss';
import '../../assets/style/toggleSwitch.scss';
import { FiX } from 'react-icons/fi';
import { PiMosque } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import { SiGooglemaps } from 'react-icons/si';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiLineChartDown } from 'react-icons/bi';

function Sidebar({ show, handleClose, handleShowFormMasjid }) {

return (
  <>
    <Menu isOpen={show} className='sideBar' customBurgerIcon={false} onClose={handleClose} style={{ fontFamily: 'Roboto' }}>
        <div>
            <div className='row row-header'>
            <div className='col logoApps'><img src='./src/assets/logo/logoAljabar.svg' /></div>
            <div className='col col-close'>
                <div className="menu-button" onClick={handleClose}><h3><FiX /></h3></div>
            </div>
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><PiMosque color='#5f5d5d' className='iconList' /></h4> Pemetaan Masjid 
            <label className="toggle-switch peMasjid">
                <input type="checkbox" />
                <span className="switch" />
            </label>
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><TbHomeShare color='#5f5d5d' className='iconList' /></h4> Pemetaan masyarakat
            <label className="toggle-switch peMasyarakat">
                <input type="checkbox" />
                <span className="switch" />
            </label>
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><SiGooglemaps color='#5f5d5d' className='iconList' /></h4> Pemetaan Dakwah
            <label className="toggle-switch peDakwah">
                <input type="checkbox" />
                <span className="switch" />
            </label>
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><BiLineChartDown color='#5f5d5d' className='iconList' /></h4> Statistik Aktifitas Dakwah
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><BsCalendar2Date color='#5f5d5d' className='iconList' /></h4> Kalender Dakwah
            </div>
        </div>
        <div className='row row-line' />
        <div className="menu-item ">
            <div className='input-group list-menu' onClick={ handleShowFormMasjid }>
                <h4><PiMosque color='#5f5d5d' className='iconList' /></h4> Data Masjid
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><TbHomeShare color='#5f5d5d' className='iconList' /></h4> Data masyarakat
            </div>
        </div>
        <div className="menu-item ">
            <div className='input-group list-menu'>
            <h4><SiGooglemaps color='#5f5d5d' className='iconList' /></h4> Data Dakwah
            </div>
        </div>
    </Menu>
  </>
  );
}
  
export default Sidebar