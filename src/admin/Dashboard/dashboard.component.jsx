import React from 'react';
// import axios from 'axios';
// import $ from 'jquery';

import './dashboard.styles.scss';

import { insertorderacc, insertordercan } from '../../firebase/firebase.admin'
import { deleteuser } from '../../firebase/firebase.utiles'

const Dashboard = ({ user, admin }) => {

    let users = user
    let orderaccepted = admin[12]
    let ordercancel = admin[13]
    let accepted = admin[9]
    let cancelled = admin[10]
    var d = new Date()

    async function accept(name) {
        users.map(async u => {
            if(name === u.name) {
                orderaccepted.push({ 
                    name: u.name,
                    email: u.email,
                    mobno: u.mobno,
                    subject: u.subject,
                    message: u.message
                })
                await deleteuser(u.name)
            }
        })
        let len
        let store = {}
        let month = {}
        let date = {}

        date = accepted[d.getFullYear()][d.getMonth()]
        month = accepted[d.getFullYear()]
        store = accepted

        if(accepted !== undefined) {
            accepted[d.getFullYear()][d.getMonth()][d.getDate()] = accepted[d.getFullYear()][d.getMonth()][d.getDate()] + 1
            len = accepted[d.getFullYear()][d.getMonth()][d.getDate()]
        }
        date[d.getDate()] = len
        month[d.getMonth()] = date
        store[d.getFullYear()] = month

        let ans = await insertorderacc(orderaccepted, store)
        if(ans === 'done') {
            window.location.reload()
        }
    }

    async function decline(name) {
        user.map(async u => {
            if(name === u.name) {
                ordercancel.push({ 
                    name: u.name,
                    email: u.email,
                    mobno: u.mobno,
                    subject: u.subject,
                    message: u.message
                })
                await deleteuser(u.name)
            }
        })

        let len
        let store = {}
        let month = {}
        let date = {}

        date = cancelled[d.getFullYear()][d.getMonth()]
        month = cancelled[d.getFullYear()]
        store = cancelled
        
        if(cancelled !== undefined) {
            cancelled[d.getFullYear()][d.getMonth()][d.getDate()] = cancelled[d.getFullYear()][d.getMonth()][d.getDate()] + 1
            len = cancelled[d.getFullYear()][d.getMonth()][d.getDate()]
        }
        date[d.getDate()] = len
        month[d.getMonth()] = date
        store[d.getFullYear()] = month

        let ans = await insertordercan(ordercancel, store)
        if(ans === 'done') {
            window.location.reload()
        }
    }

    return (
        <div>
            <h2 className="text-left p-3">Dashboard</h2>
            <hr className="m-0 mx-3 line" />
            <div className="orders">
                <h3 className="text-left mx-3">New Orders</h3>
                <div className="scroll">
                    <table className="table table-striped" id="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Accept / Decline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((u,i) => 
                                    <tr key={i}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.mobno}</td>
                                        <td>{u.subject}</td>
                                        <td>{u.message}</td>
                                        <td>
                                            <button className="btn border-success text-success mr-2" onClick={() => accept(u.name)}>Accept</button>
                                            <button className="btn border-danger text-danger mr-2" onClick={() => decline(u.name)}>Decline</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;