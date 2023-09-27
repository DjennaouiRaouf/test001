import React, {useEffect, useRef, useState} from "react";

import axios from "axios";
import {useNavigate} from "react-router-dom";

const FormPlat = () => {
    const[nomPlat,setNomPlat]=useState("");
    const[recette,setRecette]=useState("");
    const[photo,setPhoto]=useState({});
    const[pays,setPays]=useState([]);
    const[selectedPays,setSelectedPays]=useState(0);
    const pref=useRef(null);
    const navigate = useNavigate();
    const getPays= async()=> {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/pays/`)
            .then((response) => {
                setPays(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }



    const handleNomPlatChange=(e)=>{
        setNomPlat(e.target.value);
    }
    const handleFileUpload=(e)=>{

        setPhoto(e.target.files[0]);


    }
    const handleSelectChange = (e) => {
        setSelectedPays(e.target.value);

    }
    const  handleTextChange =(e) => {
        setRecette(e.target.value);
    }
    const addPlat=async()=>{
        const formData = new FormData();
        formData.append('nomPlat', nomPlat);
        formData.append('photo', photo);
        formData.append('pays', selectedPays);
        formData.append('recette',recette);

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/testapp/ajouterplat/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
                console.log('Response:', response);
            }).catch((error) => {
                console.error('Error:', error);
            });
        setNomPlat("");
        pref.current.value=null;
        setSelectedPays(0);
        setRecette("");
        navigate("/l")


    }

    useEffect(() => {
        getPays();

    });
  return (
     <>
       <div className="container" style={{ marginTop: 52 }}>
           <h1 className="text-center mb-4">
               <strong>
                   <em>
                       <span style={{ textDecoration: "underline",display:"none" }}>Ajouter un Plat</span>
                   </em>
               </strong>
           </h1>
            <input className="form-control mb-4" type="text" placeholder="Nom du plat" value={nomPlat} onChange={handleNomPlatChange}/>
            <input className="form-control mb-4" type="file"  ref={pref}  onChange={(e)=>handleFileUpload(e)}/>
            <select className="form-control mb-4" value={selectedPays} onChange={handleSelectChange}>
               <option value={0}>Select an option</option>
               {pays.map((p) => (
                   <option key={p.idp} value={p.idp}>
                       {p.nom+"/"+p.capitale}
                   </option>
               ))}
            </select>
           <div className="container mb-4">
               <textarea
                   className="form-control"
                   style={{ width: "100%", height: 115, resize: "none" }}
                   value={recette}
                   onChange={(e)=>handleTextChange(e)}
               />
           </div>
           <div className="container">
               <div className="row">
                   <div className="col-md-6 text-center mt-4">
                       <button className="btn btn-primary" type="button" onClick={()=>addPlat()}>
                           Ajouter un Plat
                       </button>
                   </div>
               </div>
           </div>
           <div className="container mt-4 mb-4">

           </div>
       </div>

     </>
  );
};

export default FormPlat;
