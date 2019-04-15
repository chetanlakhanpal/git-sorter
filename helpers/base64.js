const encodings = {
  base64: 'base64',
  ascii: 'ascii'
};

const base64 = {
  encode: (content) => {
    let buffer = new Buffer(content, encodings.ascii);
    let encodedContent = buffer.toString(encodings.base64);
    return encodedContent;
  },
  decode: (content) => {
    let buffer = new Buffer(content, encodings.base64);
    let decodedContent = buffer.toString(encodings.ascii);
    return decodedContent;
  }
};

module.exports = base64;
