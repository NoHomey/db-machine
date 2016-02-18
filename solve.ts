//declare var require;
import Table = require("./Table");
import exam = require("./exam");
import fs = require("fs");

var student: string[] = exam.name.split("_");
var wich: string = student[student.length - 1];

var names: string[] = ["Article_" + wich, "Category" ,"User", "Tag"]

var db = function (table: string[], i: number): Table {
    return new Table(names[i], table); 
};

var tables: Table[] = exam.tables.map(db);

var creates: string = "drop database if exists exam;\ncreate database exam;\nuse exam;\n"
var conns: string = "";
var inserts: string = "";

tables.forEach (table => {
     creates += table.create();
});

var que: number[] = [exam.connects[0].table, exam.connects[0].index];

var connect = function (conn: any) {
    conns += tables[conn.index].connect(conn.type, tables[conn.table].name);
};

for(var c in [0, 1]) {
    for(var conn of exam.connects) {
    var curr: number = que[que.length - 1];
        if(conn.table === curr) {
            que.push(conn.index);
            break;
        }
    }   
}

console.log(que);

exam.connects.forEach (connect);

var seq = function (n: number): Table {
    return tables[n];
}

var correct: Table[] = que.map(seq);

function printIt() {
    console.log("\n");
    var p = function (t: any) {
        console.log(t.name);
    };
    tables.forEach(p);
    console.log("\n");
}

printIt();
tables = correct;
printIt();

tables.forEach (table => {
     inserts += table.insert();
});

tables.forEach (table => {
     inserts += table.link();
});

fs.mkdir(exam.name);
fs.writeFileSync(exam.name + "/creates.sql", (creates + conns).slice(0, -1), "utf8");
fs.writeFileSync(exam.name + "/inserts.sql", inserts.substr(1).slice(0, -1), "utf8");