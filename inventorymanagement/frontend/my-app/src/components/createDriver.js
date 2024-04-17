import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./subcomponents/header";
import Footer from "./subcomponents/footer";
import Form from "./subcomponents/form";


export default function CreateDriver(){

    const navigate = useNavigate(); // Hook to get access to the navigate function

 

    return(
        <div>
            <Header/>
            <br></br>
            <Form/>
          
            <Footer/>
        </div>
    )
}