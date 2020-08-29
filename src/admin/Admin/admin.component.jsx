import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
// import axios from 'axios';
// import $ from 'jquery';

import Dashboard from '../Dashboard/dashboard.component';
import Charts from '../Charts/charts.component';
import Orders from '../Orders/orders.component';
import Website from '../Settings/website.component';

import { getAllUser } from '../../firebase/firebase.utiles';
import { getadmin, insertDates } from '../../firebase/firebase.admin'

import './admin.styles.scss';

const mql = window.matchMedia(`(min-width: 768px)`);

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            i: 0,
            userdata: [],
            admindata: [],
            date: [],
            month: [],
            year: [],
            index: [],
            accepted: [],
            cancelled: [],
            doned: [],
            users: []
        };
        
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    
    async componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
        let user = await getAllUser()
        this.setState({ userdata: user })
        let admindata = await getadmin()
        this.setState({ admindata: admindata })

        let admin = await getadmin()
        this.setState({ 
            year: admin[0].year,
            month: admin[0].month,
            date: admin[0].date
        })

        insertDates()
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    // Finish home insertion and display it on the home page
    
    render() {
        let index
        if(this.state.index.length !== 0) {
            index = this.state.index
        }

        const sidebar = (
            <div className="text-light side">
                <ul className="nav" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#charts">Charts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#orders">Orders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#website">Website</a>
                    </li>
                </ul>
            </div>
        )

        const maincontent = (
            <div className="tab-content content text-dark">
                <div id="dashboard" className="tab-pane active">
                    <Dashboard user={this.state.userdata} admin={this.state.admindata} />
                </div>
                <div id="charts" className="tab-pane">
                    <Charts user={this.state.userdata} admin={this.state.admindata} index={index} />
                </div>
                <div id="orders" className="tab-pane">
                    <Orders user={this.state.userdata} admin={this.state.admindata} />
                </div>
                <div id="website" className="tab-pane">
                    <Website />
                </div>
            </div>
        )

        var Style = {
            sidebar:{
                background: "rgb(60,60,60)",
                top: 60
            },
            content: {
                background: "rgb(60,60,60)",
                top: 60
            }
        }

        return(
            <div className="admin">
                <div className='navbar navbar-dark fixed-top navbar-expand-md'>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsible" onClick={() => this.onSetSidebarOpen(true)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a href="/admincontrol" className='navbar-brand'>Admin</a>
                </div>
                <Sidebar
                    sidebar={sidebar}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={Style}
                >
                    {
                        maincontent
                    }
                </Sidebar>
            </div>
        );

    }
}

export default Admin;