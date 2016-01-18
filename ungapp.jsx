Items = new Mongo.Collection("items");
Path = new Mongo.Collection("path");

Path.insert({id:0});

Meteor.methods({
  getItems() {
    fetch('http://dev.unginfo.fi/wp-json/wp/v2/huvudkategori').then((res) => {
      return res.text();
  }).then((text) => {
      let data = JSON.parse(text);
      for(let i=0; i<data.length; i++) {
        Items.insert({
          _parent: data[i]['parent'],
          link: data[i]['link'],
          id: data[i]['id'],
          text: data[i]['name'],
          createdAt: new Date()
        });
      }
      console.log("logging items");
    });
  },

  deleteItem(_id) {
    Items.remove(_id);
  },

  clearDatabase() {
    console.log("clearDatabase()");
    var db = Items.find().fetch();
    for(var i=0; i<db.length; i++) {
      console.log(db[i]);
      if(Items.remove(db[i]._id) == 0) {
        console.log("Failed removing items from db");
      }
    }
  }
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    Meteor.call("clearDatabase", () => {
      Meteor.call("getItems");
    });
    ReactDOM.render(<App />, document.getElementById("render-target"));
  });
}
