import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCiDBSWxwy7Z3N7r-cCO3SiZZiaPIqDe2E",
    authDomain: "agriculture-535b6.firebaseapp.com",
    databaseURL: "https://agriculture-535b6.firebaseio.com",
    projectId: "agriculture-535b6",
    storageBucket: "agriculture-535b6.appspot.com",
    messagingSenderId: "786928641094",
    appId: "1:786928641094:web:5bcb6d50f01e8c7336d647"
};

var d = new Date()

export const createuser = async (user) => {
    const userRef = firestore.doc(`users/${user.fname}`)
    const snapshot = await userRef.get()
    
    if(!snapshot.exists) {
        try {
            await userRef.set({
                "name": user.fname,
                "email": user.email,
                "mobno": user.mobileno,
                "subject": user.subject,
                "message": user.message
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const getAllUser = async () => {
    const userRef = firestore.collection('users')
    let record = []
    await userRef.get()
    .then(snapshot => {
        snapshot.docs.map(doc => record.push(doc.data()))
    })
    return record
}

export const increaseuser = async () => {
    let users = {}
    let month = {}
    let date = {}

    const adminRef = firestore.collection('admin')
    await adminRef.get()
    .then(snapshot => {
        snapshot.docs.map((doc,i) => {
            if(i === 15) {
                users = doc.data().users
                month = doc.data().users[d.getFullYear()]
                date = doc.data().users[d.getFullYear()][d.getMonth()]

                let num = doc.data().users[d.getFullYear()][d.getMonth()][d.getDate()]
                num = num + 1
                date[d.getDate()] = num
                month[d.getMonth()] = date
                users[d.getFullYear()] = month
            }
            return 0
        })
    })

    const adminRefinsertu = firestore.doc('admin/users')
    await adminRefinsertu.set({
        "users": users
    })
}

export const updateuser = async (id,number) => {
    firestore.doc(`users/${id}`)
    .update({
        'mobno': number,
    })
    .then(() => {
        console.log('User updated!');
    });
}

export const deleteuser = async (id) => {
    firestore.doc(`users/${id}`)
    .delete()
    .then(() => {
        console.log('User updated!');
    });
}

export const getadmin = async () => {
    let Dates, aboutus, accepted, admindark, arrange, cancelled, certificate, doned, home, orderaccepted, ordercancel, orderdone, product, services, team, users
    const adminRef = firestore.collection('admin')
    await adminRef.get()
    .then(snapshot => {
        snapshot.docs.map((doc,i) => {
            if(i === 0) {
                Dates = doc.data()
            } else if(i === 1) {
                aboutus = doc.data()
            } else if(i === 2) {
                accepted = doc.data().accepted
            } else if(i === 3) {
                admindark = doc.data()
            } else if(i === 4) {
                arrange = doc.data()
            } else if(i === 5) {
                cancelled = doc.data().cancelled
            } else if(i === 6) {
                certificate = doc.data()
            } else if(i === 7) {
                doned = doc.data().doned
            } else if(i === 8) {
                home = doc.data()
            } else if(i === 9) {
                orderaccepted = doc.data().orderaccepted
            } else if(i === 10) {
                ordercancel = doc.data().ordercancel
            } else if(i === 11) {
                orderdone = doc.data().orderdone
            } else if(i === 12) {
                product = doc.data()
            } else if(i === 13) {
                services = doc.data()
            } else if(i === 14) {
                team = doc.data()
            } else if(i === 15) {
                users = doc.data().users
            }
            return 0;
        })
    })

    let admin = []
    admin.push(Dates)
    admin.push(arrange)
    admin.push(home)
    admin.push(admindark)
    admin.push(product)
    admin.push(services)
    admin.push(aboutus)
    admin.push(certificate)
    admin.push(team)
    admin.push(accepted)
    admin.push(cancelled)
    admin.push(doned)
    admin.push(orderaccepted)
    admin.push(ordercancel)
    admin.push(orderdone)
    admin.push(users)
    
    // console.log(admin)

    return admin
}

export const insertDates = async () => {
    const adminRef = firestore.collection('admin')
    let Dates = {}
    let month = {}
    let date = []
    let acc = {}
    let can = {}
    let don = {}
    let use = {}
    let monthacc = {}
    let dateacc = {}

    await adminRef.get()
    .then(snapshot => {
        snapshot.docs.map((doc,i) => {
            if(i === 0) {
                if(Object.keys(doc.data().Dates).length > 0) {
                    Dates = doc.data().Dates
                    month = doc.data().Dates[d.getFullYear()]
                    date = doc.data().Dates[d.getFullYear()][d.getMonth()]

                    if(!Object.keys(Dates).includes(String(d.getFullYear()))) {
                        date = [d.getDate()]
                        month[d.getMonth()] = date
                        Dates[d.getFullYear()] = month
                        console.log('you have inserted a Year')
                    } else if(!Object.keys(month).includes(String(d.getMonth()))) {
                        date = [d.getDate()]
                        month[d.getMonth()] = date
                        Dates[d.getFullYear()] = month
                        console.log('you have inserted a Month')
                    } else if(!date.includes(d.getDate())) {
                        date.push(d.getDate())
                        month[d.getMonth()] = date
                        Dates[d.getFullYear()] = month
                        console.log('you have inserted a Date')
                    }
                } else {
                    date = [d.getDate()]
                    month[d.getMonth()] = date
                    Dates[d.getFullYear()] = month
                    console.log(Dates)
                    console.log('This is new  date')
                }
            } else if(i === 2) {
                if(Object.keys(doc.data().accepted).length > 0) {
                    acc = doc.data().accepted
                    monthacc = doc.data().accepted[d.getFullYear()]
                    dateacc = doc.data().accepted[d.getFullYear()][d.getMonth()]
                    if(dateacc === undefined) {
                        dateacc = {}
                    } else if(monthacc === undefined) {
                        dateacc = {}
                        monthacc = {}
                    }

                    if(!Object.keys(acc).includes(String(d.getFullYear()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        acc[d.getFullYear()] = monthacc
                        console.log('you have inserted a Year')
                    } else if(!Object.keys(monthacc).includes(String(d.getMonth()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        acc[d.getFullYear()] = monthacc
                        console.log('you have inserted a Month')
                    } else if(!Object.keys(dateacc).includes(String(d.getDate()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        acc[d.getFullYear()] = monthacc
                        console.log('you have inserted a Date')
                    }
                } else {
                    dateacc[d.getDate()] = 0
                    monthacc[d.getMonth()] = dateacc
                    acc[d.getFullYear()] = monthacc
                    console.log('This is new  date')
                }
            } else if(i === 5) {
                if(Object.keys(doc.data().cancelled).length > 0) {
                    can = doc.data().cancelled
                    monthacc = doc.data().cancelled[d.getFullYear()]
                    dateacc = doc.data().cancelled[d.getFullYear()][d.getMonth()]
                    if(dateacc === undefined) {
                        dateacc = {}
                    } else if(monthacc === undefined) {
                        dateacc = {}
                        monthacc = {}
                    }

                    if(!Object.keys(can).includes(String(d.getFullYear()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        can[d.getFullYear()] = monthacc
                        console.log('you have inserted a Year')
                    } else if(!Object.keys(monthacc).includes(String(d.getMonth()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        can[d.getFullYear()] = monthacc
                        console.log('you have inserted a Month')
                    } else if(!Object.keys(dateacc).includes(String(d.getDate()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        can[d.getFullYear()] = monthacc
                        console.log('you have inserted a Date')
                    }
                } else {
                    dateacc[d.getDate()] = 0
                    monthacc[d.getMonth()] = dateacc
                    can[d.getFullYear()] = monthacc
                    console.log('This is new  date')
                }
            } else if(i === 7) {
                if(Object.keys(doc.data().doned).length > 0) {
                    don = doc.data().doned
                    monthacc = doc.data().doned[d.getFullYear()]
                    dateacc = doc.data().doned[d.getFullYear()][d.getMonth()]
                    if(dateacc === undefined) {
                        dateacc = {}
                    } else if(monthacc === undefined) {
                        dateacc = {}
                        monthacc = {}
                    }

                    if(!Object.keys(don).includes(String(d.getFullYear()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        don[d.getFullYear()] = monthacc
                        console.log('you have inserted a Year')
                    } else if(!Object.keys(monthacc).includes(String(d.getMonth()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        don[d.getFullYear()] = monthacc
                        console.log('you have inserted a Month')
                    } else if(!Object.keys(dateacc).includes(String(d.getDate()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        don[d.getFullYear()] = monthacc
                        console.log('you have inserted a Date')
                    }
                } else {
                    dateacc[d.getDate()] = 0
                    monthacc[d.getMonth()] = dateacc
                    don[d.getFullYear()] = monthacc
                    console.log('This is new  date')
                }
            } else if(i === 15) {
                if(Object.keys(doc.data().users).length > 0) {
                    use = doc.data().users
                    monthacc = doc.data().users[d.getFullYear()]
                    dateacc = doc.data().users[d.getFullYear()][d.getMonth()]
                    if(dateacc === undefined) {
                        dateacc = {}
                    } else if(monthacc === undefined) {
                        dateacc = {}
                        monthacc = {}
                    }

                    if(!Object.keys(use).includes(String(d.getFullYear()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        use[d.getFullYear()] = monthacc
                        console.log('you have inserted a Year')
                    } else if(!Object.keys(monthacc).includes(String(d.getMonth()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        use[d.getFullYear()] = monthacc
                        console.log('you have inserted a Month')
                    } else if(!Object.keys(dateacc).includes(String(d.getDate()))) {
                        dateacc[d.getDate()] = 0
                        monthacc[d.getMonth()] = dateacc
                        use[d.getFullYear()] = monthacc
                        console.log('you have inserted a Date')
                    }
                } else {
                    dateacc[d.getDate()] = 0
                    monthacc[d.getMonth()] = dateacc
                    use[d.getFullYear()] = monthacc
                    console.log('This is new  date')
                }
            }
            return 0;
        })
    })
    const adminRefinsert = firestore.doc('admin/Dates')
    await adminRefinsert.set({
        "Dates": Dates
    })
    const adminRefinserta = firestore.doc('admin/accepted')
    await adminRefinserta.set({
        "accepted": acc
    })
    const adminRefinsertc = firestore.doc('admin/cancelled')
    await adminRefinsertc.set({
        "cancelled": can
    })
    const adminRefinsertd = firestore.doc('admin/doned')
    await adminRefinsertd.set({
        "doned": don
    })
    const adminRefinsertu = firestore.doc('admin/users')
    await adminRefinsertu.set({
        "users": use
    })
}

export const insertHome = async (home) => {
    const adminRef = firestore.doc('admin/home')

    await adminRef.set({
        "logo": home.logo,
        "title": home.title,
        "moto": home.moto
    })

    return 'done';
}

export const changeDark = async (value) => {
    const adminRef = firestore.doc('admin/admindark')

    await adminRef.set({
        dark: value
    })

    return 'done';
}

export const changeArrange = async (value) => {
    const adminRef = firestore.doc('admin/arrange')

    await adminRef.set({
        arrange: value
    })

    return 'done';
}

export const insertProduct = async (value) => {
    const adminRef = firestore.doc('admin/product')

    await adminRef.set({
        p_filename: value.p_filename,
        p_title: value.p_title,
        p_des: value.p_des
    })

    return 'done';
}

export const insertService = async (value) => {
    const adminRef = firestore.doc('admin/services')

    await adminRef.set({
        s_filename: value.s_filename,
        s_des: value.s_des
    })

    return 'done';
}

export const insertAboutus = async (value) => {
    const adminRef = firestore.doc('admin/aboutus')

    await adminRef.set({
        "a_filename": value.a_filename,
        "a_des": value.a_des
    })

    return 'done';
}

export const insertCertificate = async (value) => {
    const adminRef = firestore.doc('admin/certificate')

    await adminRef.set({
        "certificate": value.certificate
    })

    return 'done';
}

export const insertTeam = async (value) => {
    const adminRef = firestore.doc('admin/team')

    await adminRef.set({
        't_filename': value.t_filename,
        't_title': value.t_title,
        't_job': value.t_job
    })

    return 'done';
}

export const insertorderacc = async (value, store = 0) => {
    const adminRef = firestore.doc('admin/orderaccepted')
    await adminRef.set({
        "orderaccepted": value
    })

    if(store !== 0) {
        const adminRef2 = firestore.doc('admin/accepted')
        await adminRef2.set({
            "accepted": store
        })
    }

    return 'done';
}

export const insertordercan = async (value, store = 0) => {
    const adminRef = firestore.doc('admin/ordercancel')
    await adminRef.set({
        "ordercancel": value
    })

    if(store !== 0) {
        const adminRef2 = firestore.doc('admin/cancelled')
        await adminRef2.set({
            "cancelled": store
        })
    }

    return 'done';
}

export const insertorderdon = async (value, store = 0) => {
    const adminRef = firestore.doc('admin/orderdone')
    console.log(value)
    await adminRef.set({
        "orderdone": value
    })

    console.log(store)

    const adminRef2 = firestore.doc('admin/doned')
    await adminRef2.set({
        "doned": store
    })

    return 'done';
}

try {
    firebase.initializeApp(config);
} catch (er) {
    console.log('It is already Initialize')
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();