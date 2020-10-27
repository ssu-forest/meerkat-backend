interface IJSON {
    key: string;
    type: string;
    required?: boolean;
    nullable?: boolean;
    children?: IJSON[]
  }

  export function checkV3(param: any, jsonArr: any ){

  }

  export function checkV2(param: any, jsonArr: IJSON[]) {
    let returnString: any = null;
    for (let v of jsonArr) {
      if (v["required"]) {
        if (!param.hasOwnProperty(v["key"])) {
          returnString = { key: v["key"], code: 404 };
          break;
        }
      }
      if (param.hasOwnProperty(v["key"])) {
        if (v["nullable"] && isNull(param[v["key"]])) {
        } else {
          let parsed: any = null;
          switch (v["type"]) {
            case "pos-int":
              if (!isPosInt(`${param[v["key"]]}`)) {
                if (
                  !(
                    v["nullable"] &&
                    (/^null$/i.test(param[v["key"]]) || param[v["key"]] == "")
                  )
                ) {
                  returnString = { key: v["key"], code: 400 };
                }
              }
              break;
            case "int":
              if (!isInt(param[v["key"]])) {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "pos-real":
              if (!/^\+?\d+\.\d+$|^\+\d+$/.test(`${param[v["key"]]}`)) {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "real":
              if (!/^(\+|\-)?\d+\.\d+$|^(\+|\-)?\d+$/.test(`${param[v["key"]]}`)) {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "date-string":
              if (!/^\d{2}\.\d{2}\.\d{2}$/.test(param[v["key"]])) {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "array-json":
              parsed = parseJSON(param[v["key"]]);
              if (parsed) {
                if (!(parsed.constructor === Array)) {
                  returnString = { key: v["key"], code: 400 };
                }
              } else {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "array":
              parsed = parseJSON(param[v["key"]]);
              if (parsed) {
                if (!(parsed.constructor === Array)) {
                  returnString = { key: v["key"], code: 400 };
                }
              } else {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "object":
              parsed = parseJSON(param[v["key"]]);
              if (parsed) {
                if (parsed.constructor === Object && v["children"]) {
                  returnString = checkV2(parseJSON(param[v["key"]]), v["children"]);
                } else {
                  returnString = { key: v["key"], code: 400 };
                }
              } else {
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "string-ck":
              parsed = parseJSON(param[v["key"]]);
              if(parsed == 'y' || parsed == 'n'){}else{
                returnString = { key: v["key"], code: 400 };
              }
              break;
            case "string":
              break;
            case "bool":
              if (typeof param[v["key"]] !== "boolean") {
                if (!/^false$|^true$/i.test(param[v["key"]])) {
                  returnString = { key: v["key"], code: 400 };
                }
              }
              break;
            default:
              break;
          }
        }
      }
    }
    return returnString;
  }
  
  
  function parseJSON(string: string) {
    try {
      const json = JSON.parse(string);
      return json;
    } catch (e) {
      return string;
    }
  }
  export function isPosInt(text: string): boolean {
    return /^\+?\d+$/.test(text);
  }
  function isInt(input: string | number): boolean {
    const type = typeof input;
    if (type === "number") {
      return true;
    } else if (type === "string") {
      return /^\+?\d+$/.test(input as string);
    } else {
      return false;
    }
  }
  function isNull(input: string | null): boolean {
    const type = typeof input;
    if (input === null) {
      return true;
    } else if (type === "string") {
      return /^null$/i.test(input as string);
    } else {
      return false;
    }
  }