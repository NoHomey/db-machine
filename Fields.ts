var possible: any = {
  Article: {
      name: "varchar",
      published_on: "date",
      price: "currecy",
      created_on: "date",
      url: "string",
      content: "long string",
      visible: "boolean",
      password: "string"
  },
  Category: {
      name: "varchar",
      description: "long text",
      date_created_on: "date",
      priority: "double",
      created_by: "string"
  },
  User: {
      name: "varchar",
      password: "varchar",
      created_on: "date",
      age: "integer",
      income: "float",
      picture_url: "string",
      description: "long text",
      twitter: "varchar",
      gender: "varchar(6)"
  },
  Tag: {
      name: "varchar",
      priority: "int",
      description: "varchar",
      hash: "varchar(16)",
      second_priority: "float"
  }
};


class Fields {
    constructor() {}
    
    field(table: string, name: string): string {
        if(name.match("_id")) {
            return "integer"
        }
        if(table.match("Article")) {
         return possible.Article[name]; 
        }
        return possible[table][name];
    }
    
    type(field: string): string {
        if((field === "date") || (field === "boolean")) {
            return field;
        }
        if(["float", "double", "currecy"].indexOf(field) !== -1) {
            return "number";
        }
        if(field.match("int")) {
            return "integer";
        }
        return "string";
    }
    
    sql(field: string): string {
        var value: string;
        switch(field) {
            case "varchar": {
                value = "varchar(125)";
                break;
            }
            case "date": {
                value = "date";
                break;
            }
            case "currecy": {
                value = "numeric(15,2)";
                break;
            }
            case "string": {
                value = "varchar(125)";
                break;
            }
            case "long string": {
                value = "varchar(255)";
                break;
            }
            case "boolean": {
                value = "tinyint(1)";
                break;
            }
            case "longtext": {
                value = "longtext";
                break;
            }
            case "double": {
                value = "double(15, 28)";
                break;
            }
            case "integer": {
                value = "integer";
                break;
            }
            case "float": {
                value = "float(15, 14)";
                break;
            }
            case "varchar(6)": {
                value = "varchar(6)";
                break;
            }
            case "varchar(16)": {
                value = "varchar(16)";
                break;
            }
            case "int": {
                value = "integer";
                break;
            }
        }
        return value;
    }
    
    insert(name: string, type: string, row: number): string {
        if(type === "date") {
            return "NOW()";
        }
        if(type === "number") {
            return "12.9" + row; 
        }
        if(type === "integer") {
            return "" + row;
        }
        if(type === "boolean") {
            row--;
            return "" + row;
        }
        return `\"${name + row}\"`;
    }
}

export = Fields;