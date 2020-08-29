import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
// import Switch from 'react-switch';

import { getadmin } from '../../firebase/firebase.admin'
import { getAllUser } from '../../firebase/firebase.utiles'

import './charts.styles.scss';

class Charts extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            admin: [],
            month: '',
            monthnumber: 0,
            years: 0,
            ctx2: null,
            ctx5: null,
            allmonth: null,
            mon: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novembor', 'December']
        };
        
        this.onChange = this.onChange.bind(this);
    }
    
    async componentDidMount() {
        var d = new Date()
        if(this.state.month === '') {
            let dat = d.getMonth()
            var month = [0,1,2,3,4,5,6,7,8,9,10,11]
            let monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            this.setState({month: monthname[dat]})
            this.setState({monthnumber: Number(month[dat])})
            this.setState({years: d.getUTCFullYear()})
            $('#month').find('option').each(function(i,e) {
                if(Number($(e).val()) === month[dat]) {
                    $('#month').prop('selectedIndex', i);
                }
            })
            this.setState({year: d.getFullYear()})
            $('#year').find('option').each(function(i,e) {
                if(Number($(e).val()) === this.state.year) {
                    $('#year').prop('selectedIndex', i);
                }
            })
        }
        let admin = await getadmin()
        let users = await getAllUser()
        this.setState({
            admin: admin,
            users: users
        })
        this.setState({ctx2: document.getElementById('Chart3')})
        this.setState({ctx5: document.getElementById('Chart5')})
        
        let accepted = admin[9]
        let monthno = Object.keys(accepted[d.getFullYear()])
        this.setState({ allmonth: monthno })
    }
    
    onChange(e) {
        if(e.target.name === 'month') {
            let monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let mon = monthname[e.target.value]
            this.setState({[e.target.name]: mon, monthnumber: Number(e.target.value)})
        } else if(e.target.id === 'year') {
            this.setState({years: Number(e.target.value)})
        }
    }

    render() {
        let index = this.props.index
        let total, totalmonth, totaltoday
        let graphdates = []
        let done = []
        let ut = 0
        let at = 0
        let ct = 0
        let dt = 0
        let year
        let notpresent = true
        let d = new Date()

        
        const { admin } = this.state
        if(admin.length >= 1) {
            let accepted = admin[9]
            let cancelled = admin[10]
            let doned = admin[11]
            let users = admin[15]
            totaltoday = accepted[d.getFullYear()][d.getMonth()][d.getUTCDate()] + cancelled[d.getFullYear()][d.getMonth()][d.getUTCDate()]
             + doned[d.getFullYear()][d.getMonth()][d.getUTCDate()] + users[d.getFullYear()][d.getMonth()][d.getUTCDate()]

            year = accepted
            year = Object.keys(year)
            for(let ac in accepted) {
                for(let mo in accepted[ac]) {
                    for(let da in accepted[ac][mo]) {
                        at = at + accepted[ac][mo][da]
                        ct = ct + cancelled[ac][mo][da]
                        dt = dt + doned[ac][mo][da]
                        ut = ut + users[ac][mo][da]
                    }
                }
            }
            total = at + ct + dt + ut

            // Graph Display 

            let monthtotal = admin[9][d.getFullYear()][d.getMonth()]
            totalmonth = 0
            for(let mon in monthtotal) {
                totalmonth = totalmonth + accepted[d.getFullYear()][d.getMonth()][mon] + cancelled[d.getFullYear()][d.getMonth()][mon]
                + doned[d.getFullYear()][d.getMonth()][mon] + users[d.getFullYear()][d.getMonth()][mon]
                done.push(accepted[d.getFullYear()][d.getMonth()][mon])
            }
            let graph = Object.keys(accepted[d.getFullYear()][d.getMonth()])
            let monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            graph.map(g => 
                graphdates.push(g + ' ' + monthname[this.state.monthnumber])
            )
            notpresent = Object.keys(accepted[d.getFullYear()]).includes(String(this.state.monthnumber))

            // console.log(this.state.monthnumber)
            // console.log(admin[9][this.state.years][this.state.monthnumber])
            // if(this.state.monthnumber !== undefined) {
            // }
            // notpresent = Object.keys(accepted[d.getFullYear()]).includes(String(this.state.monthnumber))
            // if(year[d.getMonth()]) {
                
            // } else {
            //     notpresent = true
            // }
            // console.log(accepted)
            // console.log(cancelled)
            // console.log(doned)

            if((typeof index) !== 'undefined') {
                
            //     if((typeof accepted) === 'undefined') {
            //         let accepted = admin[0].accepted[index[0]][index[1]]
            //         let cancelled = admin[0].cancelled[index[0]][index[1]]
            //         let doned = admin[0].doned[index[0]][index[1]]
            //         let users = admin[0].users[index[0]][index[1]]
            //         totaltoday = accepted + cancelled + doned + users

            //         console.log(admin[0].Dates.date[index[0]][index[1]] + ' July ' + accepted)
            //     } else {
            //         year = admin[0].Dates.year
                    
            //         let accepted = admin[0].accepted[index[0]][index[1]][index[2]]
            //         let cancelled = admin[0].cancelled[index[0]][index[1]][index[2]]
            //         let doned = admin[0].doned[index[0]][index[1]][index[2]]
            //         let users = admin[0].users[index[0]][index[1]][index[2]]
            //         totaltoday = accepted + cancelled + doned + users
                    
            //         let d = new Date()

            //         if(year.includes(this.state.year)) {
            //             index[0] = year.indexOf(this.state.year)
            //         } else {
            //             notpresent = true
            //         }
                    
            //         if(!admin[0].Dates.month[index[0]].includes(this.state.monthnumber)) {
            //             notpresent = true
            //         } else { 
            //             index[1] = admin[0].Dates.month[index[0]].indexOf(this.state.monthnumber)
            //             index[2] = admin[0].Dates.date[index[0]][index[1]].indexOf(d.getDate())
            //             done = admin[0].doned[index[0]][index[1]]
            //             admin[0].Dates.date[index[0]][index[1]].map(dt => graphdates.push(dt + ' ' + this.state.month))
            //         }
            //     }

            //     let am = admin[0].accepted[index[0]][index[1]]
            //     if((typeof am) === 'object'){
            //         // let gtotal = 0
            //         // for(var i=0; i<year.length; i++) {
            //         //     index[1] = i
            //         //     let gm = admin[0].accepted[index[0]][index[1]]
            //         //     let gt = 0
            //         //     gm.map(a => gt = gt + a)
            //         //     gtotal = gt + gtotal
            //         //     console.log(gtotal);
            //         // }
            //         let at = 0
            //         am.map(a => at = at + a)
    
            //         let cm = admin[0].cancelled[index[0]][index[1]]
            //         ct = 0
            //         cm.map(c => ct = ct + c)
                    
            //         let dm = admin[0].doned[index[0]][index[1]]
            //         dt = 0
            //         dm.map(d => dt = dt + d)
                    
            //         let um = admin[0].users[index[0]][index[1]]
            //         ut = 0
            //         um.map(u => ut = ut + u)
            //         totalmonth = at + ct + dt + ut
            //     } else {
            //         am = [am]
            //         at = 0
            //         am.map(a => at = at + a)
    
            //         let cm = [admin[0].cancelled[index[0]][index[1]]]
            //         ct = 0
            //         cm.map(c => ct = ct + c)
    
            //         let dm = [admin[0].doned[index[0]][index[1]]]
            //         dt = 0
            //         dm.map(d => dt = dt + d)
    
            //         let um = [admin[0].users[index[0]][index[1]]]
            //         ut = 0
            //         um.map(u => ut = ut + u)
            //         totalmonth = at + ct + dt + ut
            //     }
            }

            // total = admin[0].orderaccept.length + admin[0].ordercancel.length + admin[0].orderdone.length + user.length
        }

        let { ctx2, ctx5 } = this.state
        $(document).ready(function() {
            if(notpresent) {
                if(ctx2 !== null) {
                    new Chart(ctx2, {
                        type: 'bar',
                        data: {
                            labels: graphdates,
                            datasets: [{
                                label: 'Daily Orders',
                                data: done,
                                backgroundColor: '#dc3545',
                                borderColor: '#dc3545',
                                borderWidth: 1,
                                // fill: false
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        fontSize: 15
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Orders Done',
                                fontSize: 25
                            }
                        }
                    });
                }
            } else {
                document.getElementById('orderaccept').innerHTML = '<h4 id="order">No Records</h4>';
            }
            
            if(ctx5 !== null) {
                let ratio, ctper, dtper
                ratio = ct + dt
                ctper = ct*100/ratio
                dtper = dt*100/ratio
                if(ratio !== 0) {
                    new Chart(ctx5, {
                        type: 'pie',
                        data: {
                            labels: ['Cancelled '+ctper+'%', 'Done '+dtper+'%'],
                            datasets: [{
                                label: 'Percentage',
                                data: [ctper,dtper],
                                backgroundColor: ['#dc3545', 'rgb(0,123,255)'],
                                borderColor: ['#dc3545', 'rgb(0,123,255)'],
                                // fill: false
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Ratio of Order Cancelled and Done',
                                fontSize: 20
                            }
                        }
                    });
                } else {
                    document.getElementById('no').innerHTML = '<h4>No Records of Cancel and Done</h4>';
                }
            }
        })

        return (
            <div className="charts">
                <h3 className="text-left p-3">Charts</h3>
                <hr className="m-0 mx-3 line" />
    
                <h3 className="text-left m-3">Orders</h3>
                <div className="viewbox px-3 my-4">
                    <div className="totalview m-auto p-2">
                        <h3>{total}</h3>
                        <h4>Total Orders</h4>
                    </div>
                    <div className="monthlyview m-auto p-2">
                        <h3>{totalmonth}</h3>
                        <h4>Monthly Orders</h4>
                    </div>
                    <div className="todayview m-auto p-2">
                        <h3>{totaltoday}</h3>
                        <h4>Today Orders</h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <div className="tab-content text-dark">
                                <select name="month" id="month" onChange={this.onChange}>
                                    {
                                        this.state.allmonth !== null
                                        ? this.state.allmonth.map((d,i) => <option value={d} key={i}>{this.state.mon[Number(d)]}</option>)
                                        : null
                                    }
                                </select>
                                <select name="year" id="year" onChange={this.onChange}>
                                    {
                                        (typeof year) === 'undefined'
                                        ? false
                                        : year.map((y,i) => <option key={i} name={i} value={y}>{y}</option>)
                                    }
                                </select>
                                <div id="orderaccept">
                                    <canvas id="Chart3" width="200"></canvas>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
    
                <h3 className="text-left m-3">Analysis</h3>
                <div className="analysis">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div id="no"><canvas id="Chart5" width="50" height="50"></canvas></div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Charts;