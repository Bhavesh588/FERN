import React from 'react';
// import axios from 'axios';

import './orders.styles.scss';

import { insertorderacc, insertordercan, insertorderdon } from '../../firebase/firebase.admin'
import { deleteuser } from '../../firebase/firebase.utiles'

const Orders = ({ user, admin }) => {
    
    let orderaccepted = admin[12]
    let ordercancel = admin[13]
    let orderdone = admin[14]
    let accepted = admin[9]
    let cancelled = admin[10]
    let doned = admin[11]
    let d = new Date()
    // Count of cancel and done should be done today
    
    async function accept(name) {
        user.map(async u => {
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

    async function done(name, i) {
        orderaccepted.map(async u => {
            if(name === u.name) {
                orderdone.push({ 
                    name: u.name,
                    email: u.email,
                    mobno: u.mobno,
                    subject: u.subject,
                    message: u.message
                })
            }
        })
        
        let len
        let store = {}
        let month = {}
        let date = {}

        date = doned[d.getFullYear()][d.getMonth()]
        month = doned[d.getFullYear()]
        store = doned
        
        if(doned !== undefined) {
            doned[d.getFullYear()][d.getMonth()][d.getDate()] = doned[d.getFullYear()][d.getMonth()][d.getDate()] + 1
            len = doned[d.getFullYear()][d.getMonth()][d.getDate()]
        }
        date[d.getDate()] = len
        month[d.getMonth()] = date
        store[d.getFullYear()] = month

        let ans = await insertorderdon(orderdone, store)
        if(orderaccepted !== undefined) {
            orderaccepted.splice(i, 1)
        }
        await insertorderacc(orderaccepted)
        if(ans === 'done') {
            window.location.reload()
        }
    }

    async function declineaccept(name, i) {
        orderaccepted.map(async u => {
            if(name === u.name) {
                ordercancel.push({ 
                    name: u.name,
                    email: u.email,
                    mobno: u.mobno,
                    subject: u.subject,
                    message: u.message
                })
            }
        })
        let ans = await insertordercan(ordercancel)
        if(orderaccepted !== undefined) {
            orderaccepted.splice(i, 1)
        }
        await insertorderacc(orderaccepted)
        if(ans === 'done') {
            window.location.reload()
        }
    }

    async function acceptcancel(name, i) {
        ordercancel.map(async u => {
            if(name === u.name) {
                orderaccepted.push({ 
                    name: u.name,
                    email: u.email,
                    mobno: u.mobno,
                    subject: u.subject,
                    message: u.message
                })
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
        if(ordercancel !== undefined) {
            ordercancel.splice(i, 1)
        }
        await insertordercan(ordercancel)
        if(ans === 'done') {
            window.location.reload()
        }
    }

    return(
        <div className="orders">
            <h3 className="text-left p-3">Orders</h3>
            <hr className="m-0 mx-3 line" />
                <ul className="nav nav-tabs nav-justified" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#neworders">New Orders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#orderaccepted">Orders Accepted</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#orderscancel">Orders Cancelled</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#ordersdone">Orders Done</a>
                    </li>
                </ul>
            <div className="scroll">
                <div className="tab-content text-dark">
                    <div id="neworders" className="tab-pane active">
                        <table className="table table-striped">
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
                                    user.length === 0
                                    ?
                                    <tr>
                                        <td colSpan='6'>No Records</td>
                                    </tr>
                                    :
                                    user.map((u,i) => 
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
                    <div id="orderaccepted" className="tab-pane">

                        {/* Put dates on the Table that can collapse
                        Counting number of records */}


                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Decline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderaccepted !== undefined
                                    ? 
                                    orderaccepted.map((a,i) => 
                                        <tr key={i}>
                                            <td>{a.name}</td>
                                            <td>{a.email}</td>
                                            <td>{a.mobno}</td>
                                            <td>{a.subject}</td>
                                            <td>{a.message}</td>
                                            <td>
                                                <button className="btn border-success text-success mr-2" onClick={() => done(a.name, i)}>Done</button>
                                                <button className="btn border-danger text-danger mr-2" onClick={() => declineaccept(a.name, i)}>Decline</button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan='6'>No Records</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div id="orderscancel" className="tab-pane">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Accept</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ordercancel !== undefined
                                    ? ordercancel.length >= 1
                                        ? ordercancel.map((a,i) => 
                                                <tr key={i}>
                                                    <td>{a.name}</td>
                                                    <td>{a.email}</td>
                                                    <td>{a.mobno}</td>
                                                    <td>{a.subject}</td>
                                                    <td>{a.message}</td>
                                                    <td>
                                                        <button className="btn border-success text-success mr-2" onClick={() => acceptcancel(a.name, i)}>Accept</button>
                                                    </td>
                                                </tr>
                                            )
                                        : <tr>
                                            <td colSpan='6'>No Records</td>
                                        </tr>
                                    : null
                                }
                            </tbody>
                        </table>
                    </div>
                    <div id="ordersdone" className="tab-pane">
                         <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderdone !== undefined
                                    ? orderdone.length >= 1
                                        ? orderdone.map((a,i) => 
                                            <tr key={i}>
                                                <td>{a.name}</td>
                                                <td>{a.email}</td>
                                                <td>{a.mobno}</td>
                                                <td>{a.subject}</td>
                                                <td>{a.message}</td>
                                                <td>
                                                    <button className="btn border-success text-success mr-2" disabled><span className="glyphicon glyphicon-ok"></span>Done</button>
                                                </td>
                                            </tr>
                                        )
                                        : <tr>
                                            <td colSpan='6'>No Records</td>
                                        </tr>
                                    : null                                    
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;