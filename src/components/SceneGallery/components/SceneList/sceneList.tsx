import React from "react";
import Button from "@mui/material/Button";

import { Scene } from "@components/sceneGallery/sceneGallery";

import style from "./styles.scss"

export interface SceneLoaderProps {
  scenes: Scene[];
  callback: (string:string) => {};
  numberOfPostsShown: number;
}

function SceneList({scenes, numberOfPostsShown, callback}:SceneLoaderProps) {
  const [numberOfPostsDisplayed, setNumberOfPostsDisplayed] = React. useState(numberOfPostsShown);

  const renderMoreScenes = () => {
    setNumberOfPostsDisplayed(numberOfPostsDisplayed + numberOfPostsShown);
  }

  return(
    <>
      { scenes.length > 0 ? (
        <>
          <div className={style.SceneList}>
            {scenes.slice(0,numberOfPostsDisplayed).map((scene) => {
              return(
                <img 
                  key={scene.key}
                  className={style.Scene}
                  src={scene.url} 
                  alt={scene.propCat} 
                  loading="lazy" 
                  role="button"
                  onClick={() =>
                    scene.key == "loader" ? {} : callback(scene.url)
                  }
                />
            )})}
          </div>

          { scenes.length !== numberOfPostsDisplayed && (
            <div className={style.LoadMoreButtonContainer}>
              <Button id="LoadMore" className={style.LoadMoreButton} onClick={() => renderMoreScenes()}>load more</Button>
            </div>
          )}
        </>
      ) : (
        <p id="ErrorMessage" role="alert">
          We're sorry, something went wrong. Please try back another time.
        </p>
      )}
    </>
  );
}

export default SceneList;