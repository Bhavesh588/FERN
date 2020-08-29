import React from 'react';

import './certificate.styles.scss';

const Certificate = ({ cert }) => {
    return (
        <div className="certificate">
            <div className="cerbox" data-aos="fade-up">
                <div className="title">Certificates</div>
                <div className="row">
                    {
                        cert.map((cer, i) => 
                            <div className="col-xl" key={i}>
                                <div className='outlinecer my-3'>
                                    <img src={cer} className="imgser" alt="Service"/>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Certificate;