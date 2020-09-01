import React, {Component} from 'react';
// import axios from 'axios';

import './contact-us.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import { createuser, increaseuser } from '../../firebase/firebase.utiles';

class Contactus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fname: '',
            email: '',
            mobileno: '',
            subject: '',
            message: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

		const user = {
            fname: this.state.fname,
            email: this.state.email,
            mobileno: this.state.mobileno,
            subject: this.state.subject,
            message: this.state.message
        }
        
        createuser(user)
        increaseuser()

		this.setState({
			fname: '',
            email: '',
            mobileno: '',
            subject: '',
            message: ''
		})
    }
    
    render(){
        return (
            <div className="contactus">
                <div className="conbox" data-aos="fade-up">
                    <div className="title">Contact Us</div>
                    <form className="formbox" onSubmit={this.onSubmit}>
                        <FormInput name="fname" type="text" label="Your Name" onChange={this.onChange} value={this.state.fname} required />
                        <FormInput name="email" type="email" label="Email Address" onChange={this.onChange} value={this.state.email} required />
                        <FormInput name="mobileno" type="text" label="Mobile" maxLength="10" minLength="10" onChange={this.onChange} value={this.state.mobileno} required />
                        <FormInput name="subject" type="text" label="Subject" onChange={this.onChange} value={this.state.subject} required />
                        <FormInput name="message" type="textarea" label="Message" onChange={this.onChange} value={this.state.message} required />
                        <button className="btn btn-danger button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Contactus;