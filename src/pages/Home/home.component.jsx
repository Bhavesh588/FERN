import React, { Component } from 'react';
import $ from 'jquery';
import AOS from 'aos';
// import axios from 'axios';

import Product from '../Product/product.component';
import Service from '../Services/services.component';
import Aboutus from '../About-us/about-us.component';
import Certificate from '../Certificate/certificate.component';
import Team from '../Team/team.component';
import Contactus from '../Contact-us/contact-us.component';

import { getadmin } from '../../firebase/firebase.utiles'

import './home.styles.scss';
import 'aos/dist/aos.css'

class Home extends Component {
    
    constructor() {
        super()

        this.state = {
            admin: null,
            home: null,
            arrange: [],
            navar: [],
            contentar: []
        }

        this.scrollToRef = this.scrollToRef.bind(this);

        this.home = React.createRef()
        this.product = React.createRef()
        this.services = React.createRef()
        this.aboutus = React.createRef()
        this.certificate = React.createRef()
        this.contactus = React.createRef()
        this.team = React.createRef()
    }

    async componentDidMount() {
        this.setState({admin: await getadmin()})
        let arr = []
        this.state.admin[1].arrange.map((item) => arr.push(item['name']))
        this.setState({ arrange: arr })
        // console.log(this.state.arrange)

        let { admin } = this.state
        this.setState({home: admin[2]})
        
        const Product1 = () => this.scrollToRef(this.product)
        const Services1 = () => this.scrollToRef(this.services)
        const Aboutus1 = () => this.scrollToRef(this.aboutus)
        const Certificate1 = () => this.scrollToRef(this.certificate)
        const Contactus1 = () => this.scrollToRef(this.contactus)
        const Team1 = () => this.scrollToRef(this.team)

        // let hom = []
        let pro = this.state.admin[4]
        let service = this.state.admin[5]
        let about = this.state.admin[6]
        let cert = this.state.admin[7].certificate
        let tea = this.state.admin[8]
        let navar = []
        let contentar = []

        this.state.arrange.map((an,i) => {
            switch(an) {
                case 'Product':
                    navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Product1}>Product</button></li>)
                    contentar.push(<div ref={this.product} key={i}><Product product={pro} /></div>)
                    break
                case 'Services':
                    navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Services1}>Services</button></li>)
                    contentar.push(<div ref={this.services} key={i}><Service service={service} /></div>)
                    break
                case 'Aboutus':
                    navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Aboutus1}>About Us</button></li>)
                    contentar.push(<div ref={this.aboutus} key={i}><Aboutus about={about} /></div>)
                    break
                case 'Certificate':
                    navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Certificate1}>Certificate</button></li>)
                    contentar.push(<div ref={this.certificate} key={i}><Certificate cert={cert} /></div>)
                    break
                case 'Team':
                    navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Team1}>Team</button></li>)
                    contentar.push(<div ref={this.team} key={i}><Team team={tea} /></div>)
                    break
                case 'Contactus':
                    navar.push(<li className="nav-item" key={i}><button className="nav-link btn" onClick={Contactus1}>Contact Us</button></li>)
                    contentar.push(<div ref={this.contactus} key={i}><Contactus /></div>)
                    break
                default:
                    console.log('Nothing')
            };
            return 0
        })
        this.setState({
            navar: navar,
            contentar: contentar
        })
    }

    scrollToRef(ref) {
        window.scrollTo({
            left: 0, 
            top: ref.current.offsetTop, 
            behavior: 'smooth'})
    }
    
    render() {
        $(window).scroll(function() {
            if ($(document).scrollTop() > 500) {
                $('.navbar').addClass('affix');
            } else {
                $('.navbar').removeClass('affix');
            }
        })

        const Home1 = () => this.scrollToRef(this.home)
        const Contactus1 = () => this.scrollToRef(this.contactus)
    
        AOS.init({
            duration: 1200,
        })
    
        return (
            <div>
                <div className="Home" ref={this.home}>
                    <div className='navbar navbar-dark fixed-top navbar-expand-md'>
                        <a href="true" className='navbar-brand siz'>
                            {
                                this.state.home === null
                                ?   <b>[Logo]</b>
                                :   <img src={this.state.home.logo} className="imghome" alt="Product"/>
                            }
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsible">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsible">
                            <ul className="navbar-nav nav ml-auto">
                                <li className="nav-item"><button className="nav-link btn" onClick={Home1}>Home</button></li>
                                {
                                    this.state.navar.map(n => n)
                                }
                            </ul>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div className="logo">
                            {
                                this.state.home === null
                                ?   <b>[Logo]</b>
                                :   <img src={this.state.home.logo} className="imgho" alt="Product"/>
                            }
                        </div><br/>
                        {
                            this.state.home === null
                            ?   <b>[Logo]</b>
                            : <div>
                                <div className="compname">{this.state.home.title}</div>
                                <div className="moto">{this.state.home.moto}</div>
                            </div>
                        }
                        <button className="btn btn-danger button" onClick={Contactus1}>Contact Us</button>
                    </div>
                </div>
                {
                    this.state.contentar.map(c => c)
                }
                <div className="bg-dark text-light">
                    &#169; All Copyright Reserved By Dwarkesh Enterprice
                </div>
            </div>
        );
    }
}

export default Home;