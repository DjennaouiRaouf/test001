import React, {useEffect,  useState} from "react";
import {useDispatch} from "react-redux";
import parse from 'html-react-parser';
import axios from "axios";
import EditPlat from "../EditPlat";
import ModalImage from "react-modal-image";
import {
    setId,
    setIdPays,
    setNom,
    setPhoto,
    setRecette,
    update_modal
} from "../../redux-toolkit/slices/EditPlatSlice";
import {handleShow} from "../../redux-toolkit/slices/FormPlatSlice";

import {useNavigate} from "react-router-dom";


const ListPlat = () => {
    const dispatch = useDispatch();
    const[plats,setPlats]=useState([]);
    const[continent,setContinent]=useState([]);
    const[selectedC,setSelectedC]=useState(0);
    const[selectedP,setSelectedP]=useState("");
    const[pays,setPays]=useState([]);
    const navigate = useNavigate();
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



    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const ajouter = () => {
        dispatch(handleShow())
    }



    const preview = () => {

        navigate('/view', {state:{ data: plats }});
    }
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
                                    {
                                        /*
                                         <PDFDownloadLink className="btn btn-primary btn-sm"
                                                     style={{ margin: 0, marginRight: 0 }} document={<MyDocument />} fileName="example.pdf">
                                        <i className="fas fa-print" style={{ marginRight: 9 }} />
                                        Imprimer
                                    </PDFDownloadLink>
                                        */
                                    }
                                    <button className="btn btn-primary btn-sm"
                                            style={{ margin: 0, marginRight: 0 }} onClick={()=> preview()} >
                                        <i className="fas fa-print" style={{ marginRight: 9 }} />
                                        Imprimer</button>




                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="text-end mb-3" />
            </div>


            <div id="wrapper mb-4">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="card shadow">
                                <div className="card-header d-flex py-3">
                                    <p
                                        className="lead text-start text-primary d-xl-flex justify-content-xl-start m-0 fw-bold"
                                        style={{ width: "100%" }}
                                    >
                                        Plats&nbsp;
                                    </p>
                                    <button className="btn btn-primary btn-sm" type="button" onClick={()=>ajouter()}>
                                        Ajouter
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div
                                        id="dataTable"
                                        className="table-responsive table mt-2"
                                        role="grid"
                                        aria-describedby="dataTable_info"
                                    >
                                        <table className="table my-0">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>nom</th>
                                                <th>Pays</th>
                                                <th>photo</th>
                                                <th>Recette</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {plats.map((item,index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.nom}</td>
                                                <td>{item.pays.nom}</td>
                                                <td width={100}>
                                                    {
                                                        item.photo !== null  &&

                                                        <ModalImage
                                                            small={item.photo}
                                                            large={item.photo}
                                                            alt=""

                                                        />
                                                    }
                                                </td>
                                                <td>{parse(item.recettes.replaceAll('-','<li className="list-group-item">').replaceAll('\n','</li>'))}</td>
                                                <td>
                                                <div className="btn-group mt-4" role="group">
                                                    <button className="btn btn-light" type="button" onClick={()=>rmPlat(item.id)}><i className="fas fa-minus"></i></button>
                                                    <button className="btn btn-primary" type="button" onClick={()=>edit(item.id,item.nom,item.photo,item.recettes,item.pays.id)}><i className="fas fa-edit"></i></button>
                                                </div>
                                                </td>


                                            </tr>

                                            ))}
                                            </tbody>
                                            <tfoot>
                                            <tr />
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="bg-white sticky-footer" />
                </div>

            </div>
            <EditPlat/>
            <button onClick={scrollToTop} className="btn btn-primary pulse-grow-on-hover pulse" type="button" style={{"fontSize": "20px",

                "borderRadius": "15px",
                "position": "fixed",
                "bottom": "20px",
                "left": "30px",
                "zIndex": "99"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white"
                     className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                </svg>
            </button>


        </div>













  );
};

export default ListPlat;
