import React from 'react';
import renderer from 'react-test-renderer';
import fetchMock from "jest-fetch-mock";

import SceneGallery from '@components/SceneGallery';

const testResponse = [
  {
    key: "testImage",
    url: "/assets/images/test.gif",
    propCat: "random",
    keywordKeys: ["keyword1"],
  }
];

fetchMock.enableMocks();
let scenesGallery: any;

describe('SceneGallery', () => {
  // beforeAll(async () => {
  //   fetchMock.doMock()
  //   fetchMock.mockResponseOnce(JSON.stringify(testResponse));

  //   scenesGallery = await renderer.create(<SceneGallery />);
  // });

  // Load sceneList
  // Modal present
  // Load loading image before scenes are loaded
  // On state change adds scenes to scenes
  // Opens Modal
  // Closes Modal
  // Modal contains image
});
