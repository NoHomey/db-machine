//declare var require;
import Field = require("./Field");

class Table {
    
    private name_: string;
    private fields_: Field[];
    private type_: string;
    private table_: string;
    
    constructor(name: string, fields: string[]) {
        this.name_ = name;
        this.fields_ = fields.map(field => {
            return new Field(name, field);
        });
    }
    
    get name(): string {
        return this.name_;
    }
    
    get type(): string {
        return this.type_;
    }
    
    get fields(): Field[] {
        return this.fields_;
    }
    
    get table(): string {
        return this.table_;
    }
    
    create() {
        var fields: string[] = this.fields_.map(field => {
           return field.sql() + ","; 
        });
        var identation: string = "\n\n            ";
        var last: number = fields.length - 1;
        fields[last] = fields[last].slice(0, -1);
        return `\ncreate table ${this.name_} (\n
            id integer not null primary key auto_increment,\n
            ${fields.join(identation)}  
);\n`;
    }
    
    connect(type: string, table: string) {
        this.type_ = type;
        this.table_ = table;
        var id: string = table.toLowerCase() + "_id";
        if(type === "many to many") {
            var id1: string = this.name_.toLowerCase() + "_id";
            return `\ncreate table ${this.name_}_${table} (\n
            id integer not null primary key auto_increment,\n
            ${id1} integer,\n
            ${id} integer,\n
            foreign key (${id1}) references ${this.name_}(id),\n
            foreign key (${id}) references ${table}(id)
);\n`
        }
        this.fields_.push(new Field(this.name_, id));
        return `\nalter table ${this.name_} add ${id} integer;\n
alter table ${this.name_} add foreign key (${id}) references ${table}(id);\n`;
    }
    
    insert() {
        var inserts: string[] = [];
        var fields: string = "";
        this.fields_.forEach(field => {
            fields += field.name + ", ";
        });
        for(var i of [1, 2]) {
            var values: string = "";
            this.fields_.forEach(field => {
                values += field.insert(i) + ", ";
            });
            inserts.push(`\ninsert into ${this.name_} (${fields.slice(0, -2)}) values(${values.slice(0, -2)});\n`);
        }
        return inserts.join("");
    }
    
    link() {
        var inserts: string[] = [];
        if(this.type_ === "many to many") {
            var table: string = this.name_ + "_" + this.table_;
            var id1: string = this.name_.toLowerCase() + "_id";
            var id: string = this.table_.toLowerCase() + "_id"; 
            for(var i of [1, 2]) {
                inserts.push(`\ninsert into ${table} (${id1}, ${id}) values(${i}, ${i});\n`);
            }
        }
        return inserts.join("");
    }
}

export = Table