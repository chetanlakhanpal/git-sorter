const delimiters = {
  line: '\n',
  comma: ','
};
const csv = {
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
      headers = header.split(delimiters.comma);
    }

    return lines.map((line) => {
      return line.split(delimiters.comma).map((value, index) => {
        let obj = {};
        obj[headers[index] || `field${index}`] = value;
        return obj;
      });
    });
  },
  toCsv: (json) => {
    if (!json) {
      return false;
    }
    if (Array.isArray(json)) {
      return json.map((item) => {
        return (
          Object.keys(item)
            .sort()
            .map((key) => {
              let value = item[key];
              if (Array.isArray(value)) {
                value = value.join(',');
              }
              if (value && value.length > 0) {
                value = value.replace('"', '');
              }
              return value &&
                value.length > 0 &&
                value.indexOf(delimiters.comma) != -1
                ? `"${value}"`
                : value;
            })
            .join(',') + delimiters.line
        );
      });
    } else {
      return (
        Object.keys(json)
          .sort()
          .map((key) => {
            let value = json[key];
            if (Array.isArray(value)) {
              value = value.join(',');
            }
            if (value && value.length > 0) {
              value = value.replace('"', '');
            }
            let returnValue =
              value && value.length > 0 && value.indexOf(delimiters.comma) != -1
                ? `"${value}"`
                : value;

            return returnValue;
          })
          .join(',') + delimiters.line
      );
    }
  }
};
module.exports = csv;
