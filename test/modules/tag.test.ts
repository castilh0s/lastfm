/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */

import { Tag } from "../../src/modules/tag/tag.service";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Tag tests", () => {
  describe("Constructor tests", () => {
    it("Should set API_KEY", () => {
      const tagService = new Tag("SOME_NICE_API_KEY");

      expect((tagService as any).API_KEY).toEqual("SOME_NICE_API_KEY");
    });

    it("Should throws error if API_KEY is not set", () => {
      // @ts-ignore
      expect(() => new Tag()).toThrowError(new Error("API key has not set"));
    });
  });

  describe("Methods tests", () => {
    let tagService: Tag;

    beforeAll(() => {
      tagService = new Tag("SOME_NICE_API_KEY");
    });

    beforeEach(() => {
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    });

    describe("Params tests", () => {
      const defaultParams = { api_key: "SOME_NICE_API_KEY", format: "json" };

      it("Should get tag information with the right params", async () => {
        await tagService.getInfo({ tag: "disco", lang: "pt" });

        expect(mockedAxios.get).toHaveBeenCalledWith("/2.0", {
          params: {
            method: "tag.getInfo",
            tag: "disco",
            lang: "pt",
            ...defaultParams
          }
        });
      });

      it("Should get similar tags with the right params", async () => {
        await tagService.getSimilar({ tag: "disco" });

        expect(mockedAxios.get).toHaveBeenCalledWith("/2.0", {
          params: {
            method: "tag.getSimilar",
            tag: "disco",
            ...defaultParams
          }
        });
      });

      it("Should get top albums by tag with the right params", async () => {
        await tagService.getTopAlbums({ tag: "disco", limit: "5", page: 1 });

        expect(mockedAxios).toHaveBeenCalledWith("/2.0", {
          params: {
            tag: "disco",
            limit: "5",
            page: 1,
            ...defaultParams
          }
        });
      });

      it("Should get top artists by tag with the right params", async () => {
        await tagService.getTopArtists({ tag: "disco", limit: "5", page: 1 });

        expect(mockedAxios).toHaveBeenCalledWith("/2.0", {
          params: {
            tag: "disco",
            limit: "5",
            page: 1,
            ...defaultParams
          }
        });
      });

      it("Should get top tags with the right params", async () => {
        await tagService.getTopTags();

        expect(mockedAxios).toHaveBeenCalledWith("/2.0", { params: { ...defaultParams } });
      });

      it("Should get top tracks by tag with the right params", async () => {
        await tagService.getTopTracks({ tag: "disco", limit: "5", page: 1 });

        expect(mockedAxios).toHaveBeenCalledWith("/2.0", {
          params: {
            tag: "disco",
            limit: "5",
            page: 1,
            ...defaultParams
          }
        });
      });

      it("Should get weekly tag chart list with the right params", async () => {
        await tagService.getWeeklyChartList({ tag: "disco" });

        expect(mockedAxios).toHaveBeenCalledWith("/2.0", {
          params: {
            tag: "disco",
            ...defaultParams
          }
        });
      });
    });
  });
});
