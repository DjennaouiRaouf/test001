import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {setIdPays, setNom, setPhoto, setRecette, update_modal} from "../../redux-toolkit/slices/EditPlatSlice";

const EditPlat = () => {


    const[pays,setPays]=useState([]);
    const {modal,idpl,nom,photo,recette,idpays} = useSelector((state) => state.editplat);
    const [img,setImg]=useState(null)
    const pref=useRef(null);
    const dispatch = useDispatch();


  const handleNomPlatChange=(e)=>{
    dispatch(setNom(e.target.value));
  }
  const handleFileUpload=(e)=>{

    setImg(e.target.files[0]);

  }
  const handleSelectChange = (e) => {
    dispatch(setIdPays(e.target.value));

  }
  const  handleTextChange =(e) => {
    dispatch(setRecette(e.target.value));
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
        getPays();



    }, []);

  const toggle = async() => {
      const formData = new FormData();
      formData.append('idpl', idpl);
      formData.append('nom',nom);
      formData.append('img',img);
      formData.append('recette',recette);
      formData.append('idpays',idpays);

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/testapp/updateplat/`,formData,{
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      }).then((response) => {
          console.log('Response:', response);
      }).catch((error) => {
          console.error('Error:', error);
      });


      dispatch(update_modal());
      pref.current.value=null;

  }
  return (
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Editer le Plat</ModalHeader>
        <ModalBody>
          <div className="container" style={{ marginTop: 10 }}>
            <input className="form-control mb-4" type="text" placeholder="Nom du plat"value={nom} onChange={handleNomPlatChange} />
              {
                  photo === null ?
                      <img
                          className="mb-4 mt-4 text-center"
                          style={{ width: "100%", height: 200 }}
                          src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
                      />
                      :
                      <img
                          className="mb-4 mt-4 text-center"
                          style={{ width: "100%", height: 200 }}
                          src={`${process.env.REACT_APP_API_BASE_URL}`+photo}
                      />

              }


              <input className="form-control mb-4" type="file"ref={pref}  onChange={(e)=>handleFileUpload(e)} />
            <select className="form-control mb-4" value={idpays} onChange={handleSelectChange}>
              <option value={0}>Select an option</option>
              {pays.map((p) => (
                  <option key={p.idp} value={p.idp}>
                    {p.nom+"/"+p.capitale}
                  </option>
              ))}
            </select>
            <textarea
                className="form-control mb-4"
                style={{ width: "100%", height: 115, resize: "none" }}
                value={recette}
                onChange={handleTextChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Modifier
          </Button>

        </ModalFooter>
      </Modal>
  );
};


export default EditPlat;
