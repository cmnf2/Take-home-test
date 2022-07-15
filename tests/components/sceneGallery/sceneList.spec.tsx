import React from 'react';
import renderer from 'react-test-renderer';

import { Scene } from '@components/sceneGallery/sceneGallery';
import SceneList, {SceneLoaderProps} from '@components/sceneGallery/components/SceneList/sceneList';
import { Button } from '@mui/material';


const testScenes = [
  {
    key: "testImage",
    url: "/assets/images/test.gif",
    propCat: "random",
    keywordKeys: ["keyword1"],
  },
  {
    key: "testImage2",
    url: "/assets/images/test2.gif",
    propCat: "random2",
    keywordKeys: ["keyword2"],
  }
] as Scene[];

const mockProperties:SceneLoaderProps = {
  scenes: testScenes,
  numberOfPostsShown: 1,
  callback: (url:String) => jest.fn(),
}

describe('SceneList', () => {
  test('should render component properly', () => {
    const renderedSceneList = renderer.create(
      <SceneList {...mockProperties} />
    );

    expect(renderedSceneList.toJSON()).toMatchSnapshot();
  });

  test('Load more button appears if more scenes than displayed', () => {
    const renderedSceneList = renderer.create(
      <SceneList {...mockProperties} />
    );

    expect(renderedSceneList.root.findByType(Button).props.id).toBe("LoadMore");
  })

  test('Does not render load more button appears if more scenes than displayed', () => {
    const renderedSceneList = renderer.create(
      <SceneList scenes={[mockProperties.scenes[0]]} { ...mockProperties} />
    );

    expect(renderedSceneList.root.findByType(Button)).toBeFalsy;
  })

  test('Renders error message if no scenes are present', () => {
    const renderedSceneList = renderer.create(
      <SceneList 
        scenes={[]} 
        numberOfPostsShown={mockProperties.numberOfPostsShown}
        callback={mockProperties.callback}
      />
    );

    expect(renderedSceneList.root.findByType("p").props.id).toBe("ErrorMessage");
  })

  test('Renders more scenes after load more is clicked', () => {
    const renderedSceneList = renderer.create(
      <SceneList {...mockProperties} />
    );

    renderedSceneList.root.findByType(Button).props.onClick()

    expect(renderedSceneList.root.findAllByType("img")).toHaveLength(2);
  })
});