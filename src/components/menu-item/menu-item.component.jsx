import React from 'react';
import './menu-item.style.scss';

const MenuItem = ({ title, id, image, size, link }) => (
    <div className={`${size} menu-item`}>
        <div
            className="background-image"
            style={{
                backgroundImage: `url(${image})`
            }}
        />
        <div className="content">
            <h2 className="title">{title.toUpperCase()}</h2>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem;
