import React, { useState, useEffect } from "react";
import axios from "axios";

import IndividualProjects from "./IndividualProjects";

const DisplayAllProjects = () => {
  const [projects, setProjects] = useState();

  async function getImagesFromCollections(collections) {
    try {
      const collectionImgs = await axios
        .put("/GetImagesFromCollections", {
          collections: collections,
        })
        .then((data) => {
          console.log(data, "after get images from collection route");

          let collectionData = data.data;

          setProjects(collectionData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    axios
      .get("/GetAllProjectCollections")
      .then(async (data) => {
        try {
          console.log(data.data, "response from Display All projects");

          let collectionsArr = data.data;

          //do something if collectionsArr is undefined || empty

          let filteredCollectionsArr = await collectionsArr.filter(
            (collection) => {
              let collectionName = collection.name;

              //check to see if there is a .files as the last thing in the name; // we use 6 because .files is 6 chars
              let Does_Collection_Name_Have_dotfiles = collectionName.slice(-6);

              if (Does_Collection_Name_Have_dotfiles === ".files") {
                return collection;
              }
            }
          );

          let getImagesFromCollectionsRes = await getImagesFromCollections(
            filteredCollectionsArr
          );
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //stop any infinite loops https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffectÎ
  }, []);

  return <IndividualProjects allProjects={projects} />;
};

export default DisplayAllProjects;
