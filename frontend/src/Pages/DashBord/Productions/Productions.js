
import { Link } from 'react-router-dom'
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { User } from '../../Context/UserContext';
export default function Productions() {
    const [products, setdata] = useState([]);
  const [runUseEffect, setrun] = useState(0);
  const userNow = useContext(User);
  const token = userNow.auth.token;
  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/product/show", {

      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })

      .then((data) => setdata(data.data))
      .catch((err) => swal({
        title: "Failure!",
        text: err.response.data.message,
        icon: "error",
        button: "OK"
      }))
  }, [runUseEffect, token]);


  function Search() {

    var input, filter, table, tr, td1, td2, td3, i, txtValue1, txtValue2, txtValue3;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    console.log(table)
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2];
      if (td1 || td2 || td3) {
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
        if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  async function DeleteUser(id) {

    if (id !== userNow.auth.userdetails.id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
          const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
            headers: {

              Authorization: "Bearer " + token,

            },
          });

          if (res.status === 200) {
            await swal({
              title: "Deleted!",
              text: "The product has been deleted.",
              icon: "success"
            });

            setrun((prev) => prev + 1);
          }
        }
      } catch (err) {
        swal({
          title: "Failure!",
          text: err.response.data.message,
          icon: "error",
          button: "OK"
        });
        // console.log(err.response.data.message);
      }
    } else {
      swal({
        title: "Failure!",
        text: "You cannot able to delete this user because it's you",
        icon: "error",
        button: "OK"
      });
    }
  }




  return <div>


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


    <div className="search-box">
      <button className="btn-search"><i className="fa fa-search"></i></button>
      <input id="myInput" type="text" className="input-search" onKeyUp={Search} placeholder="Type to Search..." />
    </div>
    <br></br>

    <section>

      <h1 className="htitle">Products <br></br>
        <button className="btnadd">
          <Link to='addproduct' style={{ color: 'white', textDecoration: "none" }}>
            <i className="fa fa-plus">   </i>
          </Link>
        </button></h1>

      <div className="tbl-header" >

        <table cellPadding="0" cellSpacing="0" border="0" >
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Operation</th>

            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0" id="myTable">
          <tbody>
            {

              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td >

                    <button className="btnadd" title="update">
                      <Link to={`${product.id}`} style={{ color: 'white', textDecoration: "none" }}>
                        <i className="fa fa-pencil"></i>
                      </Link>
                    </button>

                    <button className="btndelete" title='delete' onClick={() => DeleteUser(product.id)} >
                      <Link style={{ color: 'white', textDecoration: "none" }}>
                        <i className="fa fa-trash"></i>
                      </Link>
                    </button>

                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>

      </div>
    </section>

  </div>
}