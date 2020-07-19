import React from 'react'
import './modal.style.scss'

const MyModal = ({title, body, footer}) =>{
    return(
        <div id="myModal" class="modal">
            <div className="modal-content">
            <div className="modal-header">
                <span className="close">&times;</span>
                <p>{title}</p>
            </div>
            <div className="modal-body">
                {body}
            </div>
            <div className="modal-footer">
                {footer}
            </div>
            </div>
        </div>
    )
};
export default MyModal