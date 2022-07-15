import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";

import { Scene } from "@components/sceneGallery/sceneGallery";

import style from "./styles.scss"

interface SceneLoaderProps {
  scenes: Scene[];
  callback: (string:String) => {};
}

function SceneList({scenes, callback}:SceneLoaderProps) {
  const postDisplayBatchSize:number = 50;
  const [numberOfPostsDisplayed, setNumberOfPostsDisplayed] = React. useState(postDisplayBatchSize);

  const renderMoreScenes = () => {
    setNumberOfPostsDisplayed(numberOfPostsDisplayed + postDisplayBatchSize);
  }

  return(
    <ImageList rowHeight={"auto"} className={style.SceneList}>
        {scenes.length > 0 ? (
          <>
            {scenes.slice(0,numberOfPostsDisplayed).map((scene) => {
              return(
              <ImageListItem
                key={scene.key}
                className={style.Scene}
                role="button"
                onClick={() =>
                  scene.key == "loader" ? {} : callback(scene.url)
                }
              >
                <img src={scene.url} alt={scene.propCat} loading="lazy" />
              </ImageListItem>
              )})}

          { scenes.length !== numberOfPostsDisplayed && (
              <div className={style.LoadMoreButtonContainer}>
                <Button className={style.LoadMoreButton} onClick={() => renderMoreScenes()}>load more</Button>
              </div>
            )}
          </>
        ) : (
          <p id="ErrorMessage" role="alert">
            We're sorry, something went wrong. Please try back another time.
          </p>
        )}
      </ImageList>
  );
}

export default SceneList;