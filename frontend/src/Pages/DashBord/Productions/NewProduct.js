import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";

import { useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";

export default function AddProduct() {
    const [Titel, setTitel] = useState("")
    const [Description, setDescription] = useState("")
    const [Image, setImage] = useState("")
    const [previewUrl, setPreviewUrl] = useState(null);

    const [accept, setAccept] = useState(false)
    const userNow = useContext(User);
    const token = userNow.auth.token;
    const nav = useNavigate();
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
    async function Submit(e) {
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if (Titel.length === 0 || Description.length === 0 || Image.length === 0 ? flag = false : flag = true);

        if (flag) {
            try {
                var form_data = new FormData();

                form_data.append('title', Titel);
                form_data.append("description", Description);
                form_data.append("image", Image);
                let res = await axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/api/product/create",
                    data: form_data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + token,
                    },
                });
                if (res.status === 200) {
                    await swal({
                        title: "SUCCESS!",
                        text: "Product Added",
                        icon: "success",
                        button: "oK",
                    })
                    nav("/dashbord/productions");
                }
            }
            catch (err) {
                swal({
                    title: "failure!",
                    text: err.response.data.message,
                    icon: "error",
                    button: "oK",
                })
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
                        <h1 className="title">Add Production</h1>

                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={Titel} onChange={(e) => setTitel(e.target.value)} />
                            <label htmlFor="" className="label">Title</label>
                        </div>
                        {Titel.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Titel is required </p>}
                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={Description} onChange={(e) => setDescription(e.target.value)} />
                            <label htmlFor="" className="label">Description</label>

                        </div>
                        {Description.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Description is required </p>}

                        <div >

                            <label style={{ fontWeight: "bold" }} >Upload Image</label>
                            <br></br>
                            <input type="file" placeholder="" onChange={(e) => setImage(e.target.files.item(0))} />

                            {previewUrl && <br /> && <br /> && <img src={previewUrl} alt="Preview" style={{ width: 300, height: 300, borderRadius: 20 }} />}


                        </div>
                        {Image.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Image is required!</p>}
                        <button type="submit" className="submitBtn">Add</button>
                    </form>
                </div>


            </div>

        </div>
    )

}