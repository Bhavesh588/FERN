import React from 'react';

import './product.styles.scss';

const Product = ({ product }) => {
    return (
        <div className="product bg-dark">
            <div className="pro" data-aos="fade-up">
                <div className="title">Product</div>
                <div id="demo" className="carousel slide" data-interval="false">
                    <ul className="carousel-indicators">
                        {
                            product.p_title.map((tit, i) => 
                                i === 0
                                ? <li data-target={'#'+tit} data-slide-to={i} key={i} className='active'></li>
                                : <li data-target={'#'+tit} data-slide-to={i} key={i}></li>
                            )
                        }
                    </ul>

                    <div className="carousel-inner">
                        {
                            product.p_title.map((tit, i) =>
                                i === 0
                                ?   <div className="carousel-item active" key={i}>
                                        <div className="protitle">{tit}</div>
                                        <div className='proimage'>
                                            <img src={product.p_filename[i]} alt="Product"/>
                                        </div>
                                        <div className="des">
                                            <strong className="tit">Product Description</strong>
                                            {
                                                product.p_des[i].split('\n').map((des,i) => <p key={i}>{des}</p>)
                                            }
                                        </div>
                                    </div>
                                :   <div className="carousel-item" key={i}>
                                        <div className="protitle">{tit}</div>
                                        <div className='proimage'>
                                            <img src={product.p_filename[i]} alt="Product"/>
                                        </div>
                                        <div className="des">
                                            <strong className="tit">Product Description</strong>
                                            {
                                                product.p_des[i].split('\n').map((des, i) => <p key={i}>{des}</p>)
                                            }
                                        </div>
                                    </div>
                            )
                        }
                    </div>

                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Product;