//declare var require;
import Fields = require("./Fields");
var fields: Fields = new Fields();

class Field {
    
    private name_: string;
    private field_: string;
    private type_: string;
    private value_: string;
    
    constructor(table: string, name: string) {
        this.name_ = name;
        this.field_ = fields.field(table, name);
        this.type_ =  fields.type(this.field_);
        this.value_ = fields.sql(this.field_);
    }
    
    get name(): string {
        return this.name_;
    }
    
    get type(): string {
        return this.type_;
    }
    
    get value(): string {
        return this.value_;
    }
    
    sql(): string {
        return this.name_ + " " + this.value_; 
    }
    
    insert(row: number): string {
        return fields.insert(this.name_, this.type_, row);
    }
    
}

export = Field;