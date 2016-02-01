Items = new Mongo.Collection("items");
Tjanst = new Mongo.Collection("tjanst");
Path = new Mongo.Collection("path");

Meteor.methods({
  "getItems"() {
    let api = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/huvudkategori?per_page=100', {timeout:100000});
    if(api.statusCode == 200) {
      let data = JSON.parse(api.content);

      for(let i=0; i<data.length; i++) {
        Items.insert({
          _parent: data[i]['parent'],
          link: data[i]['link'],
          id: data[i]['id'],
          text: data[i]['description'],
          slug: data[i]['slug'],
          createdAt: new Date()
        });
        toFetch = data[i]['slug'];
        let tjanst = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst?per_page=100&filter[huvudkategori]=" + toFetch, {timeout: 100000});
        if(tjanst.statusCode == 200) {
          let data = JSON.parse(tjanst.content);
          for(let i=0; i<data.length; i++) {
            Tjanst.insert({
              _parent: toFetch,
              text: data[i]['content']['rendered'],
              title: data[i]['title']['rendered'],
              adress: data[i]['tjanst_meta']['adress'],
              tid: data[i]['tjanst_meta']['tid'],
              tel: data[i]['tjanst_meta']['tel'],
              epost: data[i]['tjanst_meta']['epost'],
              oppet: data[i]['tjanst_meta']['oppet'],
              webbsida: data[i]['tjanst_meta']['webbsida'],
              link: data[i]['tjanst_meta']['link'],
              createdAt: new Date()
            }); 
          }
        } else {
          console.log("TJANST STATUS CODE INVALID");
        }
      }
    }
  },

  "deleteItem"(_id) {
    Items.remove(_id);
  },

  "deleteArticle"(_id) {
    Tjanst.remove(_id);
  },

  "clearData"() {
    //console.log("clearData()");
    var db = Items.find().fetch();
    for(var i=0; i<db.length; i++) {
      console.log(db[i]);
      if(Items.remove(db[i]._id) == 0) {
        console.log("Failed removing items from db Items");
      }
    }
    db = Tjanst.find().fetch();
    for(var i=0; i<db.length; i++) {
      //console.log(db[i]);
      if(Tjanst.remove(db[i]._id) == 0) {
        console.log("Failed removing items from db Tjanst");
      }
    }
  },

  "clearPath"() {
    //console.log("clearPath()");
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
    Meteor.call("clearData", () => {
      Meteor.call("getItems");
    });
    ReactDOM.render(<App _id={0} initialLoad={true} />, document.getElementById("render-target"));
    ReactDOM.render(<Sidebar />, document.getElementById("sidebar-target"));
  });
}
