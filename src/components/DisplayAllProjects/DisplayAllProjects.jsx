import React, { useState, useEffect } from "react";
import axios from 'axios';

import IndividualProjects from './IndividualProjects';

const DisplayAllProjects = () => {

    const [projects, setProjects] = useState([]);

    useEffect( () => {

        axios.get('/GetAllProjects')
        .then((data) => {
            console.log(data);
            
        })
        .catch((err) => {
            console.log(err);
        })
    })

    return (
        <div className="DisplayAllProjectsContainer"> 
            <IndividualProjects />
        </div>
    )
}

export default DisplayAllProjects;