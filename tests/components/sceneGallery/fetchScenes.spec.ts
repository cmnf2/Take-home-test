import fetchMock from "jest-fetch-mock";
import { fetchScenes } from '@components/helpers/fetchScenes';
import { Scene } from '@components/sceneGallery/sceneGallery';

const testResponse = [
  {
    key: "test image",
    url: "/assets/images/test.gif",
    propCat: "random",
    keywordKeys: ["keyword1"],
  }
];

fetchMock.enableMocks();

describe('fetchScenes', () => {
    beforeEach(() => {
      fetchMock.doMock()
    });

    it('returns an array of scenes from json response', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse))

      const scenes = await fetchScenes();

      expect(scenes).toEqual(testResponse as Scene[]);
    });
});