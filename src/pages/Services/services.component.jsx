import React from 'react';

import './services.styles.scss';

const Service = ({ service }) => {
    
    let len = service.s_des.length
    let count = 1
    if(len > 3) {
        let j = 3
        for(let i = 0; i < len; i++) {
            if(i === j) {
                count = count + 1
                j = j + 3
            }
        }
    } else {
        count = 1
    }
    
    let dist = []
    let k = 0
    for(let i = 0; i < count; i++) {
        let inner = []
        for(let j = 0; j < 3; j++) {
            if(k < len) {
                inner.push(service.s_des[k])
                k = k + 1
            }
        }
        dist.push(inner)
    }

    return (
        <div className="services">
            <div className="servbox" data-aos="fade-up">
                <div className="title">Services</div>
                <div id="ser" className="carousel slide" data-interval="false">
                    <ul className="carousel-indicators">
                        {
                            dist.map((res, i) => 
                                i === 0
                                ? <li data-target={'#'+i} data-slide-to={i} key={i} className='active'></li>
                                : <li data-target={'#'+i} data-slide-to={i} key={i}></li>
                            )
                        }
                    </ul>

                    <div className="carousel-inner">
                        {
                            dist.map((rec, i) => 
                                i === 0
                                ?   <div className="carousel-item active" key={i}>
                                        <div className="container-fluid">
                                            <div className="row">
                                                {
                                                    rec.map((ser, i) => 
                                                        <div className="col-md" key={i}>
                                                            <div className='outline'>
                                                                <img src={service.s_filename[i]} className="imgser" alt="Service"/>
                                                            </div>
                                                            <div className="des">
                                                                <p>{ser}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                :   <div className="carousel-item" key={i}>
                                        <div className="container-fluid">
                                            <div className="row">
                                                {
                                                    rec.map((ser, i) =>
                                                        <div className="col-md" key={i}>
                                                            <div className='outline'>
                                                                <img src={service.s_filename[i]} className="imgser" alt="Service"/>
                                                            </div>
                                                            <div className="des">
                                                                <p>{ser}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                            )
                        }
                    </div>

                    <a className="carousel-control-prev" href="#ser" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#ser" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Service;