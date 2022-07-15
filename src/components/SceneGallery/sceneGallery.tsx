"use strict";

import React, { ReactElement, useEffect } from "react";
import Modal from "@mui/material/Modal";

import { fetchAndRetry, ReturnJson } from "../helpers/fetchAndRetry";
import {randomizeSvgColors} from "../helpers/randomizeSVGColors";
import SceneList from "./components/SceneList/sceneList";

import style from "./styles.scss";
import "../../assets/images/loader.gif";

export interface Scene {
  key: string;
  url: string;
  propCat: string;
  keywordKeys: string[];
}

function SceneGallery(): ReactElement {
  const loader: Scene[] = [
    {
      key: "loader",
      url: "/assets/images/loader.gif",
      propCat: "loadinggif",
      keywordKeys: ["keyord1"],
    },
  ];

  const [scenes, setScenes] = React.useState<Scene[]>(loader);
  const [bigImage, setBigImage] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (scenes.length > 0 && scenes == loader) {
      loadScenes();
    }
  });

  const spotlightImage = async (url: string) => {
    try {
      const image = await fetchAndRetry({
        url: url, 
        returnText: true, 
        retries: 1
      });
      setBigImage(randomizeSvgColors(`${image?.data}`));

      setOpen(true);
    } catch (e) {
      // An error ocurred, don't open the modal
      // log the error
      console.log(e);
    }
  };

  const loadScenes = async () => {
    try {
      const scenes = await fetchAndRetry({
        url: "https://img.pixton.com/data/comic-scene-group-data.json", 
        returnText: false, 
        retries: 1
      });

      setScenes(scenes?.data?.sceneGroups as Scene[]);
    } catch (e) {
      // Empty loaders and display error message
      setScenes([]);
    }
  };

  return (
    <div className="sceneGallery">
      <h1 className={style.SceneGalleryHeader}>Available Scenes</h1>

      <SceneList scenes={scenes} numberOfPostsShown={50} callback={(url) => spotlightImage(url)}></SceneList>

      <Modal
        open={open}
        onClose={closeModal}
        aria-describedby="modal-modal-description"
      >
        <div className={style.Spotlight}>
          <button onClick={closeModal}>
            close
          </button>
          <div
            className={style.SpotlightImage}
            dangerouslySetInnerHTML={{ __html: bigImage }}
          ></div>
        </div>
      </Modal>
    </div>
  );
}

export default SceneGallery;
