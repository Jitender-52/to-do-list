// //jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
// const mongoose = require("mongoose");
// const _ = require("lodash");

// const app = express();

// app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// // const items = ["Buy Food", "Cook Food", "Eat Food"];
// // const workItems = [];

// // mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://Jitender:MyVeryFirstSight@cluster0.nuxsyvx.mongodb.net/todolistDB");

// const itemsSchema = {
//   name: String,
// };

// const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//   name: "Welcome to our ToDoList",
// });

// const item2 = new Item({
//   name: "Hit the + button to add new Item",
// });

// const item3 = new Item({
//   name: "<-- Hit this to delete an item",
// });

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//   name: String,
//   items: [itemsSchema],
// };

// const List = mongoose.model("List", listSchema);

// app.get("/", function (req, res) {
//   Item.find({}, function (err, foundItems) {
//     if (foundItems.length === 0) {
//       Item.insertMany(defaultItems, function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Successfully inserted all the items");
//         }
//       });
//     }

//     res.render("list", { listTitle: "Today", newListItems: foundItems });
//   });
// });

// app.get("/:customListName", function (req, res) {
//   const customListName = _.capitalize(req.params.customListName);

//   List.findOne({ name: customListName }, function (err, foundList) {
//     if (!err) {
//       if (!foundList) {
//         // console.log("Does Not exist!");
//         const list = new List({
//           name: customListName,
//           items: defaultItems,
//         });
//         list.save();
//         res.redirect("/" + customListName);
//       }
//        else {
//         // console.log("exist!");
//         res.render("list", {
//           listTitle: customListName,
//           newListItems: foundList.items,
//         });
//       }
//     }

//     const listTitle = customListName.name;
//     const listItems = customListName.items;
//     // res.render("list", { listTitle: listTitle, newListItems: listItems });
//   });

//   // const list = new List({
//   //   name: customListName,
//   //   items: defaultItems,
//   // });
//   // list.save();
// });

// // const day = date.getDate();
// // res.render("list", {listTitle: day, newListItems: items});

// app.post("/", function (req, res) {
//   const itemName = req.body.newItem;
//   const listName = req.body.list;

//   const item = new Item({
//     name: itemName,
//   });

//   if (listName === "Today") {
//     item.save();
//     res.redirect("/");
//   } else {
//     List.findOne({ name: listName }, function (err, foundList) {
//       foundList.items.push(item);
//       foundList.save();
//       res.redirect("/" + listName);
//     });
//   }

//   // res.redirect("/" + req.body.list);
// });

// app.post("/delete", function (req, res) {
//   const checkedItemId = req.body.checkbox;
//   const listName = req.body.listName;

//   if (listName === "Today") {
//     Item.findByIdAndRemove(checkedItemId, function (err) {
//       if (!err) {
//         console.log("Successfullly removed the item");
//         res.redirect("/");
//       }
//     });
//   }
//   else
//   {
//     List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
//         if(!err)
//         {
//           console.log("Successfully removed the item from the random Listy");
//           res.redirect("/" + listName);
//         }
//     });
//   }
// });

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

// app.listen(3000, function () {
//   console.log("Server started on port 3000");
// });

// // Item.insertOne(item, function(err){
// //   if(err)
// //   {
// //     console.log(err);
// //   }
// //   else
// //   {
// //     console.log("Successfully added new item");
// //   }
// // });

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
mongoose.connect(
  "mongodb+srv://Jitender:MyVeryFirstSight@cluster0.nuxsyvx.mongodb.net/todolistDB"
);

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to our ToDoList",
});

const item2 = new Item({
  name: "Hit the + button to add new Item",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted all the items");
        }
      });
    }

    res.render("list", { listTitle: "Today", newListItems: foundItems });
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // console.log("Does Not exist!");
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // console.log("exist!");
        res.render("list", {
          listTitle: customListName,
          newListItems: foundList.items,
        });
      }
    }

    const listTitle = customListName.name;
    const listItems = customListName.items;
    // res.render("list", { listTitle: listTitle, newListItems: listItems });
  });

  // const list = new List({
  //   name: customListName,
  //   items: defaultItems,
  // });
  // list.save();
});

// const day = date.getDate();
// res.render("list", {listTitle: day, newListItems: items});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

  // res.redirect("/" + req.body.list);
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfullly removed the item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          console.log("Successfully removed the item from the random Listy");
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started on port 3000");
});

// Item.insertOne(item, function(err){
//   if(err)
//   {
//     console.log(err);
//   }
//   else
//   {
//     console.log("Successfully added new item");
//   }
// });
