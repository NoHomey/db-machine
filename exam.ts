var exam: any = {
    name: "Ivo_Stratev_B_16",
    tables: [
        ["password", "published_on", "content"],
        ["date_created_on", "created_by"],
        ["age", "created_on", "gender"],
        ["description", "second_priority"]
    ],
    connects: [
        {
          index: 3,
          type: "one to one",
          table: 2 
        },
        {
          index: 0,
          type: "one to many",
          table: 3 
        },
        {
          index: 1,
          type: "many to many",
          table: 0 
        }
    ]
}

export = exam;