import React, { Component } from 'react';
import Switch from 'react-switch';
import { ReactSortable } from 'react-sortablejs';

import './website.styles.scss';
import { insertHome, storage, getadmin, changeDark, changeArrange, 
    insertProduct, insertService, insertAboutus, insertCertificate, insertTeam } from '../../firebase/firebase.utiles';

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            checked2: false,
            admindata: [],
            img: false,
            i: -1,
            selectedFile: null,
            productname: null,
            servicename: null,
            certificatename: null,
            teamname: null,
            titletext: '',
            destext: '',
            list: [],
            home: [],
            product: [],
            services: [],
            certificate: [],
            team: [],
            h_logo: '',
            h_title: '',
            h_moto: '',
            p_filename: [],
            p_title: [],
            p_des: [],
            p_content: [],
            s_filename: [],
            s_des: [],
            a_filename: '',
            a_des: '',
            t_filename: [],
            t_title: [],
            t_job: []
        };

        this.handleChange2 = this.handleChange2.bind(this);
        this.Changelist = this.Changelist.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onEditHome = this.onEditHome.bind(this);
        this.onEditProduct = this.onEditProduct.bind(this);
        this.onEditService = this.onEditService.bind(this);
        this.onEditAboutus = this.onEditAboutus.bind(this);
        this.onEditCertificate = this.onEditCertificate.bind(this);
        this.onEditTeam = this.onEditTeam.bind(this);
    }

    async componentDidMount() {
        let admin = await getadmin()
        this.setState({
            admindata: admin,
            h_logo: admin[2].logo,
            h_title: admin[2].title,
            h_moto: admin[2].moto,
            checked2: admin[3].dark,
            list: admin[1].arrange,
            p_filename: admin[4].p_filename,
            p_title: admin[4].p_title,
            p_des: admin[4].p_des,
            s_filename: admin[5].s_filename,
            s_des: admin[5].s_des,
            a_filename: admin[6].a_filename,
            a_des: admin[6].a_des,
            certificate: admin[7].certificate,
            t_filename: admin[8].t_filename,
            t_title: admin[8].t_title,
            t_job: admin[8].t_job
        })

        let pnames = []
        await storage.ref('product').listAll().then(result => {
            result.items.forEach(imageRef => {
                pnames.push(imageRef.name)
            });
        })
        this.setState({productname: pnames})

        let snames = []
        await storage.ref('services').listAll().then(result => {
            result.items.forEach(imageRef => {
                snames.push(imageRef.name)
            });
        })
        this.setState({servicename: snames})

        let cnames = []
        await storage.ref('certificate').listAll().then(result => {
            result.items.forEach(imageRef => {
                cnames.push(imageRef.name)
            });
        })
        this.setState({certificatename: cnames})

        let tnames = []
        await storage.ref('team').listAll().then(result => {
            result.items.forEach(imageRef => {
                tnames.push(imageRef.name)
            });
        })
        this.setState({teamname: tnames})

        // console.log(this.state.productname)
        // console.log(this.state.servicename)
        // console.log(this.state.certificatename)
        // console.log(this.state.teamname)
    }
    
    async handleChange2() {
        if(this.state.checked2 === true) {
            this.setState({ checked2: false });
        } else {
            this.setState({ checked2: true });
        }
        let ans = await changeDark(!this.state.checked2)
        if(ans === 'done') {
            window.location.reload(true)
        }
    }

    async Changelist() {
        this.state.list.map(item => {
            let ans = 'chosen' in item
            if(ans) {
                delete item['chosen']
            }
            return 0;
        })
        let ans = await changeArrange(this.state.list)
        if(ans === 'done') {
            window.location.reload()
        }
    }

    onChange(e) {
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
        if(e.target.name === 'fileab') {
            if (!allowedExtensions.exec(e.target.files[0].name)) { 
                alert('Invalid file type'); 
                e.target.value = ''; 
                return false; 
            } else {
                this.setState({ selectedFile: e.target.files[0] })
            }
        } else if(e.target.name === 'filehome') {
            if (!allowedExtensions.exec(e.target.files[0].name)) { 
                alert('Invalid file type'); 
                e.target.value = ''; 
                return false; 
            } else {
                this.setState({ selectedFile: e.target.files[0] })
            }
        } else if(e.target.name === 'filepro') {
            if (!allowedExtensions.exec(e.target.files[0].name)) { 
                alert('Invalid file type'); 
                e.target.value = ''; 
                return false; 
            } else {
                this.setState({ selectedFile: e.target.files[0] })
            }
        } else if(e.target.name === 'fileser') { 
            if (!allowedExtensions.exec(e.target.files[0].name)) { 
                alert('Invalid file type'); 
                e.target.value = ''; 
                return false; 
            } else {
                this.setState({ selectedFile: e.target.files[0] })
            }
        } else if(e.target.name === 'filecer') {
            if (!allowedExtensions.exec(e.target.files[0].name)) { 
                alert('Invalid file type'); 
                e.target.value = ''; 
                return false; 
            } else {
                this.setState({ selectedFile: e.target.files[0] })
            }
        } else if(e.target.name === 'fileteam') {
            if (!allowedExtensions.exec(e.target.files[0].name)) { 
                alert('Invalid file type'); 
                e.target.value = ''; 
                return false; 
            } else {
                this.setState({ selectedFile: e.target.files[0] })
            }
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    async onDecline(e) {
        if(e.target.name === 'product') {
            let index = e.target.id.replace('#', '')
            console.log(index)
            this.state.p_filename.splice(index, 1)
            this.state.p_title.splice(index, 1)
            this.state.p_des.splice(index, 1)

            await storage.ref(`product/${this.state.productname[index]}`).delete()
            
            let data = {
                p_filename: this.state.p_filename,
                p_title: this.state.p_title,
                p_des: this.state.p_des
            }
            let ans = await insertProduct(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else if(e.target.name === 'service') {
            let index = e.target.id
            console.log(index)
            this.state.s_filename.splice(index, 1)
            this.state.s_des.splice(index, 1)

            await storage.ref(`services/${this.state.servicename[index]}`).delete()

            let data = {
                s_filename: this.state.s_filename,
                s_des: this.state.s_des
            }
            let ans = await insertService(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else if(e.target.name === 'certificate') {
            let index = e.target.id
            this.state.certificate.splice(index, 1)
            await storage.ref(`certificate/${this.state.certificatename[index]}`).delete()
            let data = {
                certificate: this.state.certificate
            }
            let ans = await insertCertificate(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else if(e.target.name === 'team') {
            let index = e.target.id.replace('#', '')
            this.state.t_filename.splice(index, 1)
            this.state.t_title.splice(index, 1)
            this.state.t_job.splice(index, 1)
            await storage.ref(`team/${this.state.teamname[index]}`).delete()
            let data = {
                t_filename: this.state.t_filename,
                t_title: this.state.t_title,
                t_job: this.state.t_job
            }
            let ans = await insertTeam(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        }
    }

    async onEditHome(e) {
        e.preventDefault();
        let filestr
        let titlestr = this.state.h_title
        let desstr = this.state.h_moto

        if(this.state.titletext !== '') {
            titlestr = this.state.titletext
        }
        if(this.state.destext !== '') {
            desstr = this.state.destext
        }

        const {selectedFile} = this.state
        if(selectedFile === null) {
            filestr = this.state.admindata[2].logo
            let data = {
                logo: filestr,
                title: titlestr,
                moto: desstr
            }
            let ans = await insertHome(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else {
            await storage.ref('images').listAll().then(result => {
                result.items.forEach(imageRef => {
                    if(imageRef.name[0] === '1') {
                        storage.ref(`images/${imageRef.name}`).delete()
                    }
                });
            })
            const uploadTask = storage.ref(`images/${'1_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('images').child('1_'+selectedFile.name).getDownloadURL().then(async url => {
                    filestr = url
                    let data = {
                        logo: filestr,
                        title: titlestr,
                        moto: desstr
                    }
                    let ans = await insertHome(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }

    }

    async onEditProduct(e) {
        e.preventDefault();
        let index = Number(e.target.name)
        if(this.state.titletext !== '') {
            let title = this.state.p_title
            title[index] = this.state.titletext
            this.setState({p_title: title})
        } else {
            this.setState({titletext: this.state.p_title[index]})
        }
        if(this.state.destext !== '') {
            let des = this.state.p_des
            des[index] = this.state.destext
            this.setState({p_des: des})
        } else {
            this.setState({destext: this.state.p_des[index]})
        }

        const {selectedFile} = this.state
        if(selectedFile === null) {
            let data = {
                p_filename: this.state.p_filename,
                p_title: this.state.p_title,
                p_des: this.state.p_des
            }
            let ans = await insertProduct(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else {
            let name = this.state.productname[index]
            let len = Number(name[0])
            await storage.ref(`product/${this.state.productname[index]}`).delete()
            const uploadTask = storage.ref(`product/${len+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('product').child(len+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let file = this.state.p_filename
                    file[index] = url
                    this.setState({p_filename: file})
                    let data = {
                        p_filename: this.state.p_filename,
                        p_title: this.state.p_title,
                        p_des: this.state.p_des
                    }
                    let ans = await insertProduct(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }
    }
        
    async onEditService(e) {
        e.preventDefault();
        let index = Number(e.target.name)
        console.log(index)
        if(this.state.destext !== '') {
            let des = this.state.s_des
            des[index] = this.state.destext
            this.setState({s_des: des})
        } else {
            this.setState({destext: this.state.s_des[index]})
        }

        const {selectedFile} = this.state
        if(selectedFile === null) {
            let data = {
                s_filename: this.state.s_filename,
                s_des: this.state.s_des
            }
            let ans = await insertService(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else {
            let name = this.state.servicename[index]
            let len = Number(name[0])
            await storage.ref(`services/${this.state.servicename[index]}`).delete()
            const uploadTask = storage.ref(`services/${len+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('services').child(len+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let file = this.state.s_filename
                    file[index] = url
                    this.setState({s_filename: file})
                    let data = {
                        s_filename: this.state.s_filename,
                        s_des: this.state.s_des
                    }
                    let ans = await insertService(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }

    }

    async onEditAboutus(e) {
        e.preventDefault()
        let filestr
        let desstr = this.state.a_des
        if(this.state.fileab !== '') {
            filestr = this.state.fileab
        }
        if(this.state.destext !== '') {
            desstr = this.state.destext
        }

        const {selectedFile} = this.state
        if(selectedFile === null) {
            filestr = this.state.admindata[6].a_filename
            let data = {
                a_filename: filestr,
                a_des: desstr
            }
            let ans = await insertAboutus(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else {
            await storage.ref('images').listAll().then(result => {
                result.items.forEach(imageRef => {
                    if(imageRef.name[0] === '2') {
                        storage.ref(`images/${imageRef.name}`).delete()
                    }
                });
            })
            const uploadTask = storage.ref(`images/${'2_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('images').child('2_'+selectedFile.name).getDownloadURL().then(async url => {
                    filestr = url
                    let data = {
                        a_filename: filestr,
                        a_des: desstr
                    }
                    let ans = await insertAboutus(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }
    }

    async onEditCertificate(e) {
        e.preventDefault()
        let index = Number(e.target.name)

        const {selectedFile} = this.state
        if(selectedFile === null) {
            return 0;
        } else {
            let name = this.state.certificatename[index]
            let len = Number(name[0])
            await storage.ref(`certificate/${this.state.certificatename[index]}`).delete()
            const uploadTask = storage.ref(`certificate/${len+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('certificate').child(len+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let filestr = url
                    let file = this.state.certificate
                    file[index] = filestr
                    this.setState({certificate: file})

                    let data = {
                        certificate: this.state.certificate
                    }
                    let ans = await insertCertificate(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }

    }

    async onEditTeam(e) {
        e.preventDefault()
        let index = Number(e.target.name)
        if(this.state.titletext !== '') {
            let title = this.state.t_title
            title[index] = this.state.titletext
            this.setState({t_title: title})
        } else {
            this.setState({titletext: this.state.t_title[index]})
        }
        if(this.state.destext !== '') {
            let des = this.state.t_job
            des[index] = this.state.destext
            this.setState({t_job: des})
        } else {
            this.setState({destext: this.state.t_job[index]})
        }

        const {selectedFile} = this.state
        if(selectedFile === null) {
            let data = {
                t_filename: this.state.t_filename,
                t_title: this.state.t_title,
                t_job: this.state.t_job
            }
            let ans = await insertTeam(data)
            if(ans === 'done') {
                window.location.reload(true)
            }
        } else {
            let name = this.state.teamname[index]
            let len = Number(name[0])
            await storage.ref(`team/${this.state.teamname[index]}`).delete()
            const uploadTask = storage.ref(`team/${len+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('team').child(len+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let file = this.state.t_filename
                    file[index] = url
                    this.setState({
                        t_filename: file
                    })
                    let data = {
                        t_filename: this.state.t_filename,
                        t_title: this.state.t_title,
                        t_job: this.state.t_job
                    }
                    let ans = await insertTeam(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }
    }

    async onSave(e) {
        e.preventDefault()
        if(e.target.name === 'product') {
            this.setState({i: 0})
            let file = this.state.p_filename
            let title = this.state.p_title
            let des = this.state.p_des

            // let filepro = this.state.filepro
            let titletext = this.state.titletext
            let destext = this.state.destext
            let len
            if(this.state.p_filename.length === 0) {
                len = this.state.p_filename.length
            } else {
                let name = this.state.productname[this.state.productname.length - 1]
                len = Number(name[0])
            }

            const {selectedFile} = this.state
            const uploadTask = storage.ref(`product/${(len+1)+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('product').child((len+1)+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let filestr = url

                    file.push(filestr)
                    title.push(titletext)
                    des.push(destext)

                    this.setState({
                        p_filename: file,
                        p_title: title,
                        p_des: des,
                    })

                    let data = {
                        p_filename: this.state.p_filename,
                        p_title: this.state.p_title,
                        p_des: this.state.p_des
                    }
                    console.log(data)
                    let ans = await insertProduct(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })

        } else if(e.target.name === 'services') {
            this.setState({i: 0})
            let file = this.state.s_filename
            let des = this.state.s_des
            let len
            if(this.state.s_filename.length === 0) {
                len = this.state.s_filename.length
            } else {
                let name = this.state.servicename[this.state.servicename.length - 1]
                len = Number(name[0])
            }
    
            // let fileser = this.state.fileser
            let destext = this.state.destext

            const {selectedFile} = this.state
            const uploadTask = storage.ref(`services/${(len+1)+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('services').child((len+1)+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let filestr = url

                    file.push(filestr)
                    des.push(destext)

                    this.setState({
                        s_filename: file,
                        p_des: des,
                    })

                    let data = {
                        s_filename: this.state.s_filename,
                        s_des: this.state.s_des
                    }
                    console.log(data)
                    let ans = await insertService(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })

        } else if(e.target.name === 'certificate') {
            this.setState({i: 0})
            let file = this.state.certificate
            let len
            if(this.state.certificate.length === 0) {
                len = this.state.certificate.length
            } else {
                let name = this.state.certificatename[this.state.certificatename.length - 1]
                len = Number(name[0])
            }

            const {selectedFile} = this.state
            const uploadTask = storage.ref(`certificate/${(len+1)+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('certificate').child((len+1)+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let filestr = url
                    file.push(filestr)

                    this.setState({
                        certificate: file
                    })

                    let data = {
                        certificate: this.state.certificate
                    }
                    console.log(data)
                    let ans = await insertCertificate(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })

        } else if(e.target.name === 'team') {
            this.setState({i: 0})
            let file = this.state.t_filename
            let title = this.state.t_title
            let job = this.state.t_job
    
            // let fileteam = this.state.fileteam
            let titletext = this.state.titletext
            let destext = this.state.destext

            let len
            if(this.state.t_filename.length === 0) {
                len = this.state.t_filename.length
            } else {
                let name = this.state.teamname[this.state.teamname.length - 1]
                len = Number(name[0])
            }

            const {selectedFile} = this.state
            const uploadTask = storage.ref(`team/${(len+1)+'_'+selectedFile.name}`).put(selectedFile)
            uploadTask.on('state_changed', 
            (snapshot) => {
    
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await storage.ref('team').child((len+1)+'_'+selectedFile.name).getDownloadURL().then(async url => {
                    let filestr = url

                    file.push(filestr)
                    title.push(titletext)
                    job.push(destext)
            
                    this.setState({t_filename: file})
                    this.setState({t_title: title})
                    this.setState({t_job: job})
                    
                    let data = {
                        t_filename: this.state.t_filename,
                        t_title: this.state.t_title,
                        t_job: this.state.t_job
                    }
                    let ans = await insertTeam(data)
                    if(ans === 'done') {
                        window.location.reload(true)
                    }
                })
            })
        }
    }

    render() {

        if(this.state.checked2) {
            document.getElementById('dashboard').classList.add('darktheme','bg-dark')
            document.getElementById('website').classList.add('darktheme','bg-dark')
            document.getElementById('charts').classList.add('darktheme','bg-dark')
            document.getElementById('orders').classList.add('darktheme','bg-dark')
            const tab = document.getElementsByClassName("table");
            for(var i=0; i<tab.length; i++) {
                tab[i].classList.add('darktheme','bg-dark')
            }
            const navlink = document.getElementsByClassName("nav-link");
            for(var j=0; j<navlink.length; j++) {
                navlink[j].classList.add('text-light')
            }
            document.getElementById('orderaccept').classList.add('darktheme','bg-dark')
            // document.getElementById('ordercancel').classList.add('darktheme','bg-dark')
            // document.getElementById('orderdone').classList.add('darktheme','bg-dark')
            // document.getElementById('orderpending').classList.add('darktheme','bg-dark')
            const navbar = document.getElementsByClassName("navbar");
            for(var k=0; k<navbar.length; k++) {
                navbar[k].classList.add('bg-dark')
            }
            const text = document.getElementsByClassName("span6");
            for(var a=0; a<text.length; a++) {
                text[a].classList.add('bg-dark','text-light')
            }
            const inpu = document.getElementsByTagName("input");
            for(var b=0; b<inpu.length; b++) {
                inpu[b].classList.add('bg-dark','text-light')
            }
        }

        let name = []
        let idname = []
        if(this.state.p_filename.length !== 0) {
            this.state.p_title.map(tit => {
                tit = tit.replace(/ /g, '')
                idname.push(tit)
                name.push('#'+tit)
                return 0
            })
        }

        let s_name = []
        let s_idname = []
        if(this.state.s_filename.length !== 0) {
            this.state.s_des.map((tit, i) => {
                tit = 's'+i
                s_idname.push(tit)
                s_name.push('#'+tit)
                return 0
            })
        }

        let c_name = []
        let c_idname = []
        if(this.state.certificate.length !== 0) {
            this.state.certificate.map((tit, i) => {
                tit = 'c'+i
                c_idname.push(tit)
                c_name.push('#'+tit)
                return 0
            })
        }

        let t_name = []
        let t_idname = []
        if(this.state.t_title.length !== 0) {
            this.state.t_title.map(tit => {
                tit = tit.replace(/ /g, '')
                t_idname.push(tit)
                t_name.push('#'+tit)
                return 0
            })
        }

        return (
            <div className="website">
                <div className="toppart">
                    <h2 className="text-left p-3">Edit Website</h2>
                    <div className="m-3">
                        <a className="btn border-success text-success mr-2" href="https://desolate-sierra-70172.herokuapp.com/" target="_blank" rel="noopener noreferrer">Publish</a>
                    </div>
                </div>
                <hr className="m-0 mx-3 line" />

                <h3 className="text-left m-3">Dark Themes</h3>

                <div className="text-left m-3 d-flex subtit">
                    <b className="m-3">Admin Dark theme</b>
                    <Switch className="mx-3 my-1"
                        onChange={this.handleChange2} 
                        checked={this.state.checked2}
                        // onColor="#999"
                        // onHandleColor="#fff"
                        // handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0,0,0,0.6)"
                        height={15}
                        width={30} />
                </div>

                <h3 className="text-left m-3">Arrange</h3>
                <div className="m-3 subtit">
                    <ReactSortable
                        tag="ul"
                        group="group"
                        animation={200}
                        delayOnTouchOnly={true}
                        delay={2}
                        list={this.state.list}
                        setList={newState => this.setState({ list: newState })}
                    >
                        {
                            this.state.list.map((item) => (
                                <li className="dragli py-2" key={item['id']}>{item['name']}</li>
                            ))
                        }
                    </ReactSortable>
                </div>
                <div className="text-right mx-3 set">
                    <button 
                        className="btn btn-danger" 
                        onClick={this.Changelist}
                        >
                            Save
                    </button>
                </div>

                <h3 className="text-left m-3">Content Edit</h3>
                {/*Home*/}
                <div className="mx-3 text-left">
                    <h4>Home</h4>
                    <div className="imgabout m-auto">
                        {
                            this.state.h_logo === undefined
                            ? <img src={require('../../Images/Service.png')} className="imgab" alt="About us"/>
                            : <img src={this.state.h_logo} className="imgab" alt="About us"/>
                        }
                    </div>
                    <form className="formbox">
                        <ul className="navbar-nav">
                            <li className="nav-item py-3">
                                <input type="file" name="filehome" onChange={this.onChange} required />
                            </li>
                            <li className="nav-item py-2">
                                <input type="text" name="titletext" placeholder="Add Title" onChange={this.onChange} defaultValue={this.state.h_title} required />
                            </li>
                            <li className="nav-item py-2">
                                <textarea className="span6 w-100" rows="3" name="destext" placeholder="Type Moto Here" onChange={this.onChange} defaultValue={this.state.h_moto} required></textarea>
                            </li>
                            <li className="nav-item text-right">
                                <button className="btn btn-danger" name="about" onClick={this.onEditHome}>Save</button>
                            </li>
                        </ul>
                    </form>
                </div>

                {/*Product*/}
                <div className="mx-3 text-left">
                    <h4>Product</h4>
                    {/*Edit Product*/}
                    <div className="productedit my-3" id="product">
                        {
                            this.state.p_filename.length === undefined
                            ? null
                            : this.state.p_title.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>{tit}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="product" id={'#'+i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={idname[i]}>
                                            <div className="imgabout m-auto">
                                                {
                                                    this.state.p_filename.length === 0
                                                    ? null
                                                    : <img src={this.state.p_filename[i]} className="imgab" alt="Product"/>
                                                }
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="filepro" id={'#'+i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <input type="text" name="titletext" placeholder="Add Title" onChange={this.onChange} defaultValue={this.state.p_title[i]} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <textarea className="span6 w-100" rows="6" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} defaultValue={this.state.p_des[i]}></textarea>
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditProduct}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>

                    {/*Add Product*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#productadd"><span>Add Product</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="productadd">
                            <form className="formbox">
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        {/* Add required */}
                                        <input type="file" name="filepro" onChange={this.onChange} />
                                    </li>
                                    <li className="nav-item py-2">
                                        <input type="text" name="titletext" placeholder="Add Title" onChange={this.onChange} />
                                    </li>
                                    <li className="nav-item py-2">
                                        <textarea className="span6 w-100" rows="6" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} ></textarea>
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger" name="product" onClick={this.onSave}>Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>

                {/*Services*/}
                <div className="m-3 text-left">
                    <h4>Services</h4>
                    {/*Edit Services*/}
                    <div className="productedit my-3">
                        {
                            this.state.s_filename.length === 0
                            ? null
                            : this.state.s_des.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>Service {i+1}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={s_name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="service" id={i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={s_idname[i]}>
                                            <div className="imgabout m-auto">
                                                {
                                                    this.state.s_filename.length === 0
                                                    ? null
                                                    : <img src={this.state.s_filename[i]} className="imgab" alt="Product"/>
                                                }
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="fileser" id={i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <textarea className="span6 w-100" rows="6" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} defaultValue={this.state.s_des[i]}></textarea>
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditService}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>
                    
                    {/*Add Services*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#serviceadd"><span>Add Service</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="serviceadd">
                            <form className="formbox">
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        <input type="file" name="fileser" onChange={this.onChange} />
                                    </li>
                                    <li className="nav-item py-2">
                                        <textarea className="span6 w-100" rows="3" name="destext" placeholder="Add Service Description" onChange={this.onChange} ></textarea>
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger" name="services" onClick={this.onSave}>Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>

                {/*About us*/}
                <div className="mx-3 text-left">
                    <h4>About Us</h4>
                    <div className="imgabout m-auto">
                        {
                            this.state.a_filename === undefined
                            ? <img src={require('../../Images/Service.png')} className="imgab" alt="About us"/>
                            : <img src={this.state.a_filename} className="imgab" alt="About us"/>
                        }
                    </div>
                    <form className="formbox">
                        <ul className="navbar-nav">
                            <li className="nav-item py-3">
                                <input type="file" name="fileab" onChange={this.onChange} />
                            </li>
                            <li className="nav-item py-2">
                                <textarea className="span6 w-100" rows="10" name="destext" placeholder="About us Content" onChange={this.onChange} defaultValue={this.state.a_des}></textarea>
                            </li>
                            <li className="nav-item text-right">
                                <button className="btn btn-danger" name="about" onClick={this.onEditAboutus}>Save</button>
                            </li>
                        </ul>
                    </form>
                </div>
                
                {/*Certificate*/}
                <div className="m-3 text-left">
                    <h4>Certificate</h4>
                    {/*Edit Certificate*/}
                    <div className="productedit my-3">
                        {
                            this.state.certificate.length === 0
                            ? null
                            : this.state.certificate.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>Certificate {i+1}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={c_name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="certificate" id={i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={c_idname[i]}>
                                            <div className="imgcer m-auto">
                                                <img src={this.state.certificate[i]} className="img" alt="Product"/>
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="filecer" id={'##'+i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditCertificate}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>
                    
                    {/*Add Certificate*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#ceradd"><span>Add Certificate</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="ceradd">
                            <form className="formbox" name="certificate" onSubmit={this.onSave}>
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        <input type="file" name="filecer" onChange={this.onChange} required />
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger">Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>

                {/*Team*/}
                <div className="mx-3 text-left">
                    <h4>Team</h4>
                    {/*Edit Team*/}
                    <div className="productedit my-3" id="product">
                        {
                            this.state.t_title.length === 0
                            ? null
                            : this.state.t_title.map((tit,i) => 
                                    <nav className="navbar" key={i}>
                                        <b>{tit}</b>
                                        <div>
                                            <button className="navbar-toggler btn border-success text-success mr-2" type="button" data-toggle="collapse" data-target={t_name[i]}><span>Edit</span></button>
                                            <button className="btn border-danger text-danger" name="team" id={'#'+i} onClick={this.onDecline}>Decline</button>
                                        </div>
                                        <div className="collapse navbar-collapse" id={t_idname[i]}>
                                            <div className="imgabout m-auto">
                                                <img src={this.state.t_filename[i]} className="imgab" alt="Product"/>
                                            </div>
                                            <form className="formbox">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item py-3">
                                                        <input type="file" name="fileteam" id={'###'+i} onChange={this.onChange} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <input type="text" name="titletext" placeholder="Add Name" onChange={this.onChange} defaultValue={this.state.t_title[i]} />
                                                    </li>
                                                    <li className="nav-item py-2">
                                                        <input type="text" name="destext" placeholder="Add Job Title" onChange={this.onChange} defaultValue={this.state.t_job[i]} />
                                                    </li>
                                                    <li className="nav-item text-right">
                                                        <button className="btn btn-danger" name={i} onClick={this.onEditTeam}>Save</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </nav>
                                )
                        }
                    </div>

                    {/*Add Team*/}
                    <div className="text-left">
                        <div className="text-right">
                            <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#teamadd"><span>Add Team</span></button>
                        </div>
                        <div className="collapse navbar-collapse" id="teamadd">
                            <form className="formbox" name="team" onSubmit={this.onSave}>
                                <ul className="navbar-nav">
                                    <li className="nav-item py-3">
                                        <input type="file" name="fileteam" onChange={this.onChange} required />
                                    </li>
                                    <li className="nav-item py-2">
                                        <input type="text" name="titletext" placeholder="Add Name" onChange={this.onChange} required />
                                    </li>
                                    <li className="nav-item py-2">
                                        <input type="text" name="destext" placeholder="Add Job Title" onChange={this.onChange} required />
                                        {/* <textarea className="span6 w-100" rows="3" name="destext" placeholder="Add your Product discription here" onChange={this.onChange} required></textarea> */}
                                    </li>
                                    <li className="nav-item text-right">
                                        <button className="btn btn-danger">Save</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Website;