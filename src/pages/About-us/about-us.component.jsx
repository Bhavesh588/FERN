import React from 'react';

import './about-us.styles.scss';

const Aboutus = ({ about }) => {
    return (
        <div className="aboutus bg-dark">
            <div className="about" data-aos="fade-up">
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <div className="aboutimage">
                                {
                                    about.a_filename === ""
                                    ? null
                                    :   <img src={about.a_filename} className="imgabout" alt="Product"/>
                                }
                            </div>
                        </div>
                        <div className="col-md det">
                            <div className="title">About Us</div>
                            <hr className="linehr"/>
                            <div>
                                {
                                    about.a_des.split('\n').map((des, i) => <p key={i}>{des}</p>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;