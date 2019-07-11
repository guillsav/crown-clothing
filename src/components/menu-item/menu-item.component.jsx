import React from 'react';
import './menu-item.style.scss'

const MenuItem = ({title, id, image, size, link}) => (
    <div style={{ backgroundImage: `url(${image})` }} className={`${size} menu-item`}>
    <div className="content">
        <h2 className="title">{title}</h2>
        <span className="subtitle">SHOP NOW</span>
    </div>
</div>
);

export default MenuItem;