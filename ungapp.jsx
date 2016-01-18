Items = new Mongo.Collection("items");
Path = new Mongo.Collection("path");

Meteor.methods({
  "getItems"() {
    fetch('http://dev.unginfo.fi/wp-json/wp/v2/huvudkategori').then((res) => {
      return res.text();
  }).then((text) => {
      let data = JSON.parse(text);
      for(let i=0; i<data.length; i++) {
        Items.insert({
          _parent: data[i]['parent'],
          link: data[i]['link'],
          id: data[i]['id'],
          text: data[i]['description'],
          createdAt: new Date()
        });
      }
      console.log("logging items");
    });
  },

  "deleteItem"(_id) {
    Items.remove(_id);
  },

  "clearItems"() {
    console.log("clearItems()");
    var db = Items.find().fetch();
    for(var i=0; i<db.length; i++) {
      console.log(db[i]);
      if(Items.remove(db[i]._id) == 0) {
        console.log("Failed removing items from db");
      }
    }
  },

  "clearPath"() {
    console.log("clearPath()");
    var db = Path.find().fetch();
    for(var i=0; i<db.length; i++) {
      console.log(db[i]);
      if(Path.remove(db[i]._id) == 0) {
        console.log("Failed removing items from db");
      }
    }
    Path.insert({id:0});
  }
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    Meteor.call("clearPath")
    Meteor.call("clearItems", () => {
      Meteor.call("getItems");
    });
    ReactDOM.render(<App _id={0} />, document.getElementById("render-target"));
  });
}
