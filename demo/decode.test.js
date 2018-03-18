const decode = require("./decode");
const btoa = require("btoa");

describe("decode", () => {
  let existingURLs;

  beforeEach(() => {
    existingURLs = [
      { id: "1", url: "www.google.com", hash: "MQ==" },
      { id: "2", url: "www.facebook.com", hash: "Mg==" }
    ];
  });

  it.skip("should retrieve decoded url of existing url", () => {
    const actual = decode(existingURLs[0]["hash"], existingURLs);
    const expected = existingURLs[0]["url"];
    expect(actual).toEqual(expected);
  });

  it.skip("should throw Error for new/non-existing url", () => {
    expect(() => {
      decode("www.new-webpage.com", existingURLs);
    }).toThrow();
  });

  it.skip("should always get same url for the same has", () => {
    const actual_1 = decode(existingURLs[0]["hash"], existingURLs);
    const actual_2 = decode(existingURLs[0]["hash"], existingURLs);
    const expected = existingURLs[0]["url"];

    expect(actual_1).toEqual(expected);
    expect(actual_2).toEqual(expected);
  });
});
