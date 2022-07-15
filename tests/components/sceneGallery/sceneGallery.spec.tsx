import React from 'react';
import renderer from 'react-test-renderer';
import fetchMock from "jest-fetch-mock";
import Modal from "@mui/material/Modal";

import SceneGallery from '@components/SceneGallery';
import { Scene } from '@components/sceneGallery/sceneGallery';
import SceneList from '@components/sceneGallery/components/SceneList/sceneList';

const testJsonResponse:Scene[] = [
  {
    key: "test image",
    url: "/assets/images/test.gif",
    propCat: "random",
    keywordKeys: ["keyword1"],
  },
  {
    key: "test image2",
    url: "/assets/images/test2.gif",
    propCat: "random2",
    keywordKeys: ["keywor21"],
  }
];

const testStringResponse:string = "<svg></svg>";

describe('SceneGallery', () => {
  beforeEach(async () => {
    fetchMock.mockResponses(
      [
        JSON.stringify(testJsonResponse), { status: 200, statusText: "Ok"},
      ],
      [
        JSON.stringify(testStringResponse), { status: 200, statusText: "Ok"},
      ],
    );
  });

  afterEach(() => {
    fetchMock.resetMocks()
  })


  test('should render component properly', () => {
    const renderedSceneList = renderer.create(
      <SceneGallery />
    );

    expect(renderedSceneList.toJSON()).toMatchSnapshot();
  });

  test('renders a sceneList when scenes are present', () => {
    const renderedSceneList = renderer.create(
      <SceneGallery />
    );

    expect(renderedSceneList.root.findByType(SceneList)).toBeTruthy();
  });

  test('renders loading image before scenes are loaded', () => {
    const renderedSceneList = renderer.create(
      <SceneGallery />
    );
    
    expect(renderedSceneList.root.findByType("img").props.src).toBe("/assets/images/loader.gif")
  });

  test('Modal is closed on initial load', () => {
    const renderedSceneList = renderer.create(
      <SceneGallery />
    );
    
    expect(renderedSceneList.root.findByType(Modal).props.open).toBe(false);
  });
});
