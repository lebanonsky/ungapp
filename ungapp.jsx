Items = new Mongo.Collection("items");
Tjanst = new Mongo.Collection("tjanst");
Path = new Mongo.Collection("path");
Region = new Mongo.Collection("region");

Meteor.methods({
  "getItems"() {
    let api = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/huvudkategori?per_page=100', {timeout:10000});
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
         }
        } else {
          console.log("ITEM STATUS CODE INVALID");
        }          

        data = Items.find().fetch();
        //console.log(data)

        for(let i=0; i<data.length; i++){  
          slug = data[i]['slug'];
          //console.log(slug)
          let tjanst = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst?per_page=100&filter[huvudkategori]=" + slug, {timeout: 10000});
          if(tjanst.statusCode == 200) {
            let tdata = JSON.parse(tjanst.content);
            for(let i=0; i<tdata.length; i++) {
              //console.log(data[i]['tjanst_meta']);
              Tjanst.insert({
                _parent: slug,
                text: tdata[i]['content']['rendered'],
                title: tdata[i]['title']['rendered'],
                adress: tdata[i]['tjanst_meta']['adress'],
                tid: tdata[i]['tjanst_meta']['tid'],
                tel: tdata[i]['tjanst_meta']['tel'],
                epost: tdata[i]['tjanst_meta']['epost'],
                oppet: tdata[i]['tjanst_meta']['oppet'],
                webbsida: tdata[i]['tjanst_meta']['webbsida'],
                link: tdata[i]['tjanst_meta']['link'],
                createdAt: new Date()
              }); 
             }  
        } else {
          console.log("TJANST STATUS CODE INVALID");
        }
      }

    let region = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/ort?per_page=100', {timeout:10000});

    if(region.statusCode == 200) {
      let rdata = JSON.parse(api.content);

      for(let i=0; i<rdata.length; i++) {
        Region.insert({ 
          _parent: rdata[i]['parent'],
          link: rdata[i]['link'],
          id: rdata[i]['id'],
          text: rdata[i]['description'],
          slug: rdata[i]['slug'],
          createdAt: new Date()
          });
         }
        } else {
          console.log("ITEM STATUS CODE INVALID");
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
