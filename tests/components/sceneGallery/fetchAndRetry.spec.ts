import fetchMock from "jest-fetch-mock";
import { fetchAndRetry } from '@components/helpers/fetchAndRetry';
import { Scene } from '@components/sceneGallery/sceneGallery';

const testJsonResponse:Scene[] = [
  {
    key: "test image",
    url: "/assets/images/test.gif",
    propCat: "random",
    keywordKeys: ["keyword1"],
  }
];

const testStringResponse:string = "<svg></svg>";

fetchMock.enableMocks();

describe('fetchScenes', () => {
    beforeEach(() => {
      fetchMock.doMock()
    });

    afterEach(() => {
      fetchMock.resetMocks()
    })

    it('returns an array of scenes from json response', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testJsonResponse))

      const scenes = await fetchAndRetry({url: "http://test.url.com", retries: 0, returnText: false});

      expect(scenes).toEqual(testJsonResponse as Scene[]);
    });

    it('returns a string from text response', async () => {
      fetchMock.mockResponse(testStringResponse)

      const scenes = await fetchAndRetry({url: "http://test.url.com", retries: 0, returnText: true});

      expect(scenes).toEqual(testStringResponse);
    });

    it('retries if call fails once', async () => {
      fetchMock.mockResponses(
        [
          JSON.stringify(testJsonResponse), { status: 500, statusText: "Test Error"},
        ],
        [
          JSON.stringify(testJsonResponse), { status: 200, statusText: "Ok"},
        ],
      );


      await fetchAndRetry({url: "http://test.url.com", retries: 1, returnText: true});

      expect(fetchMock.mock.calls.length).toEqual(2);
    });
});