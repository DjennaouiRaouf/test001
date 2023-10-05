import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import parse from 'html-react-parser';
import axios from "axios";
import EditPlat from "../EditPlat";


import {
    setId,
    setIdPays,
    setNom,
    setPhoto,
    setRecette,
    update_modal
} from "../../redux-toolkit/slices/EditPlatSlice";
import ExcelJS from 'exceljs';

const ListPlat = () => {
    const dispatch = useDispatch();
    const[plats,setPlats]=useState([]);
    const[continent,setContinent]=useState([]);
    const[selectedC,setSelectedC]=useState(0);
    const[selectedP,setSelectedP]=useState("");
    const[pays,setPays]=useState([]);
    const getPlats=async()=> {
        let url=`${process.env.REACT_APP_API_BASE_URL}/testapp/plat/?format=json`;


        if(selectedC > 0){
            url=url+`&pays__continent=${selectedC}`
        }else{
            url=url.replaceAll(`&pays__continent=${selectedC}`,"")
        }
        if(selectedP > 0){
            url=url+`&pays=${selectedP}`
        }else{
            url=url.replaceAll(`&pays=${selectedP}`,"")
        }


        await axios.get(url)
            .then((response) => {
                setPlats(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleContinentChange = (e) => {
        setSelectedC(e.target.value);


    }

    const  handlePaysChange = (e) => {
        setSelectedP(e.target.value);

    }
    const rmPlat=async(idpl)=>{
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/delplat/?idpl=${idpl}`)
            .then((response) => {
               setPlats(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const edit = (idpl,nom,photo,recettes,idp) => {

        dispatch(setId(idpl));
        dispatch(setNom(nom));
        dispatch(setPhoto(photo));
        dispatch(setRecette(recettes));
        dispatch(setIdPays(idp));
        dispatch(update_modal());

    }

    const getContinent = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/continent/`)
            .then((response) => {
                setContinent(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const getPays= async()=> {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/pays/`)
            .then((response) => {
                setPays(response.data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    useEffect(() => {
        getPlats();
        getContinent();
        getPays();

    },[plats]);

    const imprimer = async() => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Define your data

        let data=[];
        const tmp =plats;
        for( const obj of tmp){
            obj.pays= obj.pays.nom;
        }

        let rows=[] ;
        let columns=[] ;
        for( const e of Object.keys(tmp[0])){
            columns.push(e);
        }
        data.push(columns);
        for( const e of tmp){
            const l = Object.values(e);
            data.push(l)
        }



        data.forEach(rowData => {
            worksheet.addRow(rowData);
        });


        const blob = await workbook.xlsx.writeBuffer();
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'data.xlsx';
        a.click();
        URL.revokeObjectURL(blobUrl);


    };






    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4" />
            <div>
                <div className="card shadow mb-3">
                    <div className="card-header py-3">
                        <p className="text-center text-primary m-0 fw-bold">
                            <span style={{ color: "rgb(0, 0, 0)" }}>Filtre</span>
                        </p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-8 col-lg-8">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name_service">
                                        <strong>Continent</strong>
                                    </label>
                                    <select className="form-control mb-4" value={selectedC} onChange={handleContinentChange}>
                                        <option value={0}>Continent</option>
                                        {continent.map((c,index) => (
                                            <option key={index} value={c.id}>
                                                {c.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price_service">
                                        <strong>Pays</strong>
                                    </label>
                                    <select className="form-control mb-4" value={selectedP} onChange={handlePaysChange}>
                                        <option value={0}>Pays</option>
                                        {pays.map((p,index) => (
                                            <option key={index} value={p.id}>
                                                {p.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col">
                                    <div className="mb-3" />
                                    <button className="btn btn-primary btn-sm"
                                                     style={{ margin: 0, marginRight: 0 }}
                                                     onClick={()=>imprimer()}>
                                        <i className="fas fa-print" style={{ marginRight: 9 }} />
                                        Imprimer
                                    </button>



                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="text-end mb-3" />
            </div>
            <div className="container py-4 py-xl-5">
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {plats.map((item,index) => (
                        <div className="col" key={index}>

                            <div className="card">
                                {
                                    item.photo === null  ?
                                        <img
                                            className="card-img-top w-100 d-block fit-cover"
                                            style={{ height: 200 }}
                                            src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
                                            alt={""}
                                        />
                                        :
                                        <img
                                            className="card-img-top w-100 d-block fit-cover"
                                            height={200}
                                            src= {item.photo.file}
                                            alt={""}
                                        />
                                }

                                <div className="card-body p-4">
                                    <p className="text-primary card-text mb-0">{item.pays.nom}</p>
                                    <h4 className="card-title">{item.nom}</h4>
                                    <div className="card-text"><ul className="list-group">{parse(item.recettes.replaceAll('-','<li className="list-group-item">').replaceAll('\n','</li>'))}</ul></div>
                                    <div className="btn-group mt-4" role="group">
                                        <button className="btn btn-light" type="button" onClick={()=>rmPlat(item.id)}><i className="fas fa-minus"></i></button>
                                        <button className="btn btn-primary" type="button" onClick={()=>edit(item.id,item.nom,item.photo.file,item.recettes,item.pays.id)}><i className="fas fa-edit"></i></button>
                                    </div>

                                </div>
                            </div>
                            <EditPlat/>
                        </div>
                    ))}


                </div>

            </div>
        </div>













  );
};

export default ListPlat;
