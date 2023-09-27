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

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/testapp/displayplat/`)
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

    });


    return (
      <div className="container py-4 py-xl-5">
        <div className="row mb-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Plats</h2>
          </div>
        </div>
        <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
          {plats.map((item,index) => (
              <div className="col" key={index}>

                <div className="card">
                  {
                    item.photo === null ?
                        <img
                            className="card-img-top w-100 d-block fit-cover"
                            style={{ height: 200 }}
                            src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
                        />
                        :
                        <img
                            className="card-img-top w-100 d-block fit-cover"
                            height={200}
                            src= {`${process.env.REACT_APP_API_BASE_URL}`+item.photo}
                        />
                  }

                  <div className="card-body p-4">
                    <p className="text-primary card-text mb-0">{item.pays.nom}</p>
                    <h4 className="card-title">{item.nom}</h4>
                    <div className="card-text"><ul className="list-group">{parse(item.recettes.replaceAll('-','<li className="list-group-item">').replaceAll('\n','</li>'))}</ul></div>
                      <div className="btn-group mt-4" role="group">
                          <button className="btn btn-light" type="button" onClick={()=>rmPlat(item.idpl)}><i className="fas fa-minus"></i></button>
                          <button className="btn btn-primary" type="button" onClick={()=>edit(item.idpl,item.nom,item.photo,item.recettes,item.pays.idp)}><i className="fas fa-edit"></i></button>
                      </div>

                  </div>
                </div>
                  <EditPlat/>
              </div>

          ))}


        </div>
      </div>

  );
};

export default ListPlat;
