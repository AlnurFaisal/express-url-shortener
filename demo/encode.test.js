const encode = require("./encode");
const btoa = require("btoa");

describe("encode", () => {
  let existingURLs;

  beforeEach(() => {
    existingURLs = [
      { id: "1", url: "www.google.com", hash: "MQ==" },
      { id: "2", url: "www.facebook.com", hash: "Mg==" }
    ];
  });

  it.skip("should retrieve encoded id of existing url", () => {
    const actual = encode(existingURLs[0]["url"], existingURLs);
    const expected = existingURLs[0]["hash"];
    expect(actual).toEqual(expected);
  });

  it.skip("should encode id for new/non-existing url", () => {
    const actual = encode("www.new-webpage.com", existingURLs);
    const expected = btoa(existingURLs.length + 1);

    expect(actual).toEqual(expected);
  });

  it.skip("should always get same hash for the same url", () => {
    const actual_1 = encode("www.new-webpage.com", existingURLs);
    const actual_2 = encode("www.new-webpage.com", existingURLs);
    const actual_3 = encode("www.new-webpage.com", existingURLs);
    const expected = btoa(existingURLs.length + 1);

    expect(actual_1).toEqual(expected);
    expect(actual_2).toEqual(expected);
    expect(actual_3).toEqual(expected);
  });
});
