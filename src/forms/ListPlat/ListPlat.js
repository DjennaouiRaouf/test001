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

const ListPlat = () => {
    const dispatch = useDispatch();
    const[plats,setPlats]=useState([]);
    const getPlats=async()=> {

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/plat/?`)
            .then((response) => {
                setPlats(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

    useEffect(() => {
        getPlats();

    },[plats]);


    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4" />
            <div>
                <div className="card shadow mb-3">
                    <div className="card-header py-3">
                        <p className="text-center text-primary m-0 fw-bold">
                            <span style={{ color: "rgb(0, 0, 0)" }}>Plats</span>
                        </p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-8 col-lg-8">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name_service">
                                        <strong>Continent</strong>
                                    </label>
                                    <input
                                        id="id_name_service"
                                        className="form-control"
                                        type="text"
                                        placeholder="Name service"
                                        name="name_service"
                                        required=""
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price_service">
                                        <strong>Pays</strong>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Pays"
                                        name="price_service"
                                        required=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="mb-3" />
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    style={{ margin: 0, marginRight: 0 }}
                                >
                                    <i className="fas fa-search" style={{ marginRight: 9 }} />
                                    Recherche
                                </button>
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
                                            src= {`${process.env.REACT_APP_API_BASE_URL}`+item.photo}
                                            alt={""}
                                        />
                                }

                                <div className="card-body p-4">
                                    <p className="text-primary card-text mb-0">{item.pays.nom}</p>
                                    <h4 className="card-title">{item.nom}</h4>
                                    <div className="card-text"><ul className="list-group">{parse(item.recettes.replaceAll('-','<li className="list-group-item">').replaceAll('\n','</li>'))}</ul></div>
                                    <div className="btn-group mt-4" role="group">
                                        <button className="btn btn-light" type="button" onClick={()=>rmPlat(item.id)}><i className="fas fa-minus"></i></button>
                                        <button className="btn btn-primary" type="button" onClick={()=>edit(item.id,item.nom,item.photo,item.recettes,item.pays.id)}><i className="fas fa-edit"></i></button>
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
