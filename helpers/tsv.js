const delimiters = {
  line: '\r\n',
  tab: '\t'
};

const tsv = {
  toJson: (content, hasHeader) => {
    if (!content) {
      return false;
    }

    let lines = content.split(delimiters.line);
    if (!lines || lines.length == 0) {
      return false;
    }

    let headers = [];

    if (hasHeader) {
      let header = lines.splice(0, 1)[0];
      headers = header.split(delimiters.tab);
    }

    return lines.map((line) => {
      let obj = {};
      line.split(delimiters.tab).forEach((value, index) => {
        obj[headers[index] || `field${index}`] = value;
      });
      return obj;
    });
  }
};
module.exports = tsv;
