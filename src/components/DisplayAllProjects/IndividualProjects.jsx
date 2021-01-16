import React, { useState, useEffect } from "react";
import IndividualProjectPicData from './IndividualProjectPicData';

const IndividualProjects = ( { allProjects } ) => {

    const [projects, setProjects] = useState([]);

    if ( allProjects === undefined || allProjects.length === 0   ) {
        return (
            <>
                <div> No Projects to display... </div>
            </>
        )
    }

    console.log('individual projects updated',allProjects )
    return (
        <> 
            <div>
                 { allProjects.map( collection => {
                   return <IndividualProjectPicData singleProjectData={collection} />
                })}
            </div>
        </>
    )
}

export default IndividualProjects;