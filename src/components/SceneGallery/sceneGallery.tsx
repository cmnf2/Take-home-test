import React, { ReactElement, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";

import { fetchScenes } from "../helpers/fetchScenes";
import {randomizeSvgColors} from "../helpers/randomizeSVGColors";

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

  const [scenes, setScenes] = React.useState(loader);
  const [bigImage, setBigImage] = React.useState("");
  const [open, setOpen] = React.useState(false);

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
      const image = await fetch(url).then((res) => res.text());
      setBigImage(randomizeSvgColors(image));

      setOpen(true);
    } catch (e) {
      // An error ocurred, don't open the modal
      // log the error
      console.log(e);
    }
  };

  const loadScenes = async () => {
    try {
      const scenes = await fetchScenes();

      setScenes(scenes.data.sceneGroups as Scene[]);
    } catch (e) {
      // Empty loaders and display error message
      setScenes([]);
    }
  };

  return (
    <div className="sceneGallery">
      <h1 className={style.SceneGalleryHeader}>Available Scenes</h1>

      <ImageList rowHeight={"auto"} className={style.SceneList}>
        {scenes.length > 0 ? (
          scenes.map((scene) => (
            <ImageListItem
              key={scene.key}
              className={style.Scene}
              role="button"
              onClick={() =>
                scene.key == "loader" ? {} : spotlightImage(scene.url)
              }
            >
              <img src={scene.url} alt={scene.propCat} loading="lazy" />
            </ImageListItem>
          ))
        ) : (
          <p id="ErrorMessage" role="alert">
            We're sorry, something went wrong. Please try back another time.
          </p>
        )}
      </ImageList>

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
