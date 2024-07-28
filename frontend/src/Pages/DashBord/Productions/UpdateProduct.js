import { useContext, useEffect, useState } from "react";
import { User } from "../../Context/UserContext";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateProduct(){
    const id = window.location.pathname.split('/').slice(-1)[0];
    const userNow = useContext(User);
    const token = userNow.auth.token;
    const [Titel,settitle]=useState("");
    const [Description,setdescription]=useState("");
    const [Image,setiamge]=useState("");
    const [accept, setAccept] = useState(false)
    const nav = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    
    useEffect(() => {
        if (!Image) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }

        reader.readAsDataURL(Image);
    }, [Image]);

    useEffect(() => {
       axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {

        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
            .then((data) => {
                console.log(data.data[0]);
                settitle(data.data[0].title);
                setPreviewUrl(data.data[0].image);
                setdescription(data.data[0].description);
            })
    }, [id, token])
console.log("eeddd"+Titel+Description+Image);

    async function Submit(e) {
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if (Titel.length === 0 || Description.length === 0  ? flag = false : flag = true);

        if (flag) {
      
      
                const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "Save the changes",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!"
                });

                if (result.isConfirmed) {
                    try {
                        var form_data = new FormData();
                        form_data.append('title', Titel);
                        form_data.append("description", Description);
                        if(Image.length !== 0)
                       { form_data.append("image", Image);}
              
                      let res = await axios({
                            method: "post",
                            url: `http://127.0.0.1:8000/api/product/update/${id}`,
                            data: form_data,
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: "Bearer " + token,
                            },
                        });

                        if (res.status === 200) {
                            await swal({
                                title: "Update!",
                                text: "The info has been updated.",
                                icon: "success"
                            });
                            nav("/dashbord/productions");
                        }
                    } catch (err) {
                        swal({
                            title: "failure!",
                            text: err.response.data.message,
                            icon: "error",
                            button: "oK",
                        })
                    }
                }

            
           
        }
    }
    return (
        <div>
            <div>
                <br>
                </br>
                <br>
                </br>
                <div className="signupFrm">
                    <form onSubmit={Submit} className="form">
                        <h1 className="title">Update Product</h1>

                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={Titel} onChange={(e) => settitle(e.target.value)} />
                            <label htmlFor="" className="label">Title</label>
                        </div>
                        {Titel.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Titel is required </p>}
                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={Description} onChange={(e) => setdescription(e.target.value)} />
                            <label htmlFor="" className="label">Description</label>

                        </div>
                        {Description.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Description is required </p>}

                        <div >

                            <label style={{ fontWeight: "bold" }} >Upload Image</label>
                            <br></br>
                            <input type="file" placeholder="" onChange={(e) => setiamge(e.target.files.item(0))} />

                            {previewUrl && <br /> && <br /> && <img src={previewUrl} alt="Preview" style={{ width: 300, height: 300, borderRadius: 20 }} />}


                        </div>
                        {/* && accept && <p style={{ fontSize: 13, color: "red" }}>Image is required!</p>*/}
                        <button type="submit" className="submitBtn">Add</button>
                    </form>
                </div>


            </div>

        </div>
    )
    
}