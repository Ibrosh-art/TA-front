import React from 'react';
import "../components/NewFoot.css"
const NewFoot = () => {
  return (
    <div className='Bloli'>
        <ul>
        <li>
            <a href="#">
            <i class="fa fa-facebook" aria-hidden="true"></i>
            <span> - Facebook</span>
            </a>
        </li>
        <li>
            <a href="#">
            <i class="fa fa-twitter" aria-hidden="true"></i>
            <span> - TikTok</span>
            </a>
        </li>
        <li>
            <a href="#">
            <i class="fa fa-google-plus" aria-hidden="true"></i>
            <span> - Google</span>
            </a>
        </li>
        <li>
            <a href="#">
            <i class="fa fa-instagram" aria-hidden="true"></i>
            <span> - Instagram</span>
            </a>
        </li></ul>
    </div>
  );
};

export default NewFoot;