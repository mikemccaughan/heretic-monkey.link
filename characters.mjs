/**
 * Gets the character associated with the specific code point, asynchronously.
 * @param {number} c The code point
 * @returns {Promise<string>} The string generated for c
 */
export async function getCharFromCodePoint(c) {
    return new Promise((resolve) => {
        resolve(String.fromCodePoint(c));
    });
}
/**
 * Generates a stream of characters that can be used as the first character of an XML Name.
 */
export async function* nameStartGenerator() {
  for (let char of [...':ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz']) {
    yield await Promise.resolve(char);
  }
  for (let c = "A".codePointAt(0) ?? 0; c < ("Z".codePointAt(0) ?? -1) + 1; c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = "a".codePointAt(0) ?? 0; c < ("z".codePointAt(0) ?? -1) + 1; c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("c0", 16); c < parseInt("d7", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("d8", 16); c < parseInt("f7", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("f8", 16); c < parseInt("300", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("370", 16); c < parseInt("37e", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("37f", 16); c < parseInt("2000", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("200c", 16); c < parseInt("200e", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("2070", 16); c < parseInt("218e", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("2c00", 16); c < parseInt("2ff0", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("3001", 16); c < parseInt("d800", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("f900", 16); c < parseInt("fdd0", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("fdf0", 16); c < parseInt("fffe", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("10000", 16); c < parseInt("f0000", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
}

/**
 * Generates a stream of characters that can be used as any character other than the first, of an XML Name.
 */
export async function* nameGenerator() {
  const name = [..."-.0123456789\u00B7"];
  for (let char of name) {
    yield await Promise.resolve(char); 
  }
  for (let c = parseInt("300", 16); c < parseInt("370", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
  for (let c = parseInt("203F", 16); c < parseInt("2041", 16); c++) {
    yield await getCharFromCodePoint(c);
  }
}
