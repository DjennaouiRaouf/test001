import React, {useEffect, useRef, useState} from "react";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import ListPlat from "../ListPlat";
import csrftoken from "../../utils/utils";
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from "react-redux";
import {handleClose} from "../../redux-toolkit/slices/FormPlatSlice";
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
                'X-CSRFToken': csrftoken,
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
        close();



    }

    useEffect(() => {
        getPays();

    },[]);


    const dispatch = useDispatch();
    const {toggle} = useSelector((state) => state.fplat);
    const close = () => {
      dispatch(handleClose());
    }
    return (
     <>

         <Modal
             show={toggle}
             onHide={close}
             animation={false}
         >

             <Modal.Body >
                 <div className="container-fluid">
                     <div className="d-sm-flex justify-content-between align-items-center mb-4" />
                     <div>
                         <div className="card  mb-3 " style={{border:"none"}} >
                             <div className="card-body">
                                 <div className="row" />
                                 <input className="form-control mb-4" type="text" placeholder="Nom du plat" value={nomPlat} onChange={handleNomPlatChange}/>
                                 <input className="form-control mb-4" type="file"  ref={pref}  onChange={(e)=>handleFileUpload(e)}/>
                                 <select className="form-control mb-4" value={selectedPays} onChange={handleSelectChange}>
                                     <option value={0}>Select an option</option>
                                     {pays.map((p,index) => (
                                         <option key={index} value={p.id}>
                                             {p.nom+"/"+p.capitale}
                                         </option>
                                     ))}
                                 </select>
                                 <textarea
                                     className="form-control"
                                     style={{ width: "100%", height: 115, resize: "none" }}
                                     value={recette}
                                     onChange={(e)=>handleTextChange(e)}
                                 />
                                 <div/>

                             </div>
                         </div>
                         <div className="text-end mb-3" />
                     </div>
                 </div>

             </Modal.Body>
             <Modal.Footer>
                 <div className="row mb-2">
                     <div className="col">
                         <div className="mb-3" />
                         <button
                             className="btn btn-primary btn-sm"
                             type="button"
                             style={{ margin: 0, marginRight: 0 }} onClick={()=>addPlat()}
                         >
                             <i className="fas fa-plus" style={{ marginRight: 9 }} />
                             Ajouter
                         </button>
                     </div>
                 </div>

             </Modal.Footer>
         </Modal>

         <ListPlat />

     </>
  );
};

export default FormPlat;
