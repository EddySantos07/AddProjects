import React, { useState, useEffect } from "react";
import axios from 'axios';

import IndividualProjects from './IndividualProjects';

const DisplayAllProjects = () => {

    const [projects, setProjects] = useState([]);

    useEffect( () => {

        axios.get('/GetAllProjectCollections')
        .then((data) => {
            console.log(data.data, 'response from Display All projects');

            let collectionsArr = data.data

            let filteredCollectionsArr = collectionsArr.map( collection => {
                let collectionName = collection.name;
                
                //check to see if there is a .files as the last thing in the name; // we use 6 because .files is 6 chars
                let Does_Collection_Name_Have_dotfiles = collectionName.slice(-6);

                if ( Does_Collection_Name_Have_dotfiles === '.files'  ) {

                }



            })
            
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