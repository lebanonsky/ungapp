Cats = new Mongo.Collection("cat");
Tjanst = new Mongo.Collection("tjanst");
Path = new Mongo.Collection("path");
Region = new Mongo.Collection("region");


TjanstIndex = new EasySearch.Index({
  engine: new EasySearch.Minimongo({
    sort: function () {
      return { score: -1 };
    } 
  }),
  collection: Tjanst,
  fields: ['title', 'text'],
  defaultSearchOptions: {
    limit: 100
  },
  permission: () => {
    return true;
  }
});







Meteor.methods({
  "getItems"() {

    let regdata = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/ort?per_page=100', {timeout:10000});
    if(regdata.statusCode == 200) {

      let regs = JSON.parse(regdata.content);

      for(let i=0; i<regs.length; i++) {
        Region.insert({ 
          _parent: regs[i]['parent'],
          link: regs[i]['link'],
          id: regs[i]['id'],
          text: regs[i]['description'],
          slug: regs[i]['slug'],
          createdAt: new Date()
          });
         }
        } else {
          console.log("ITEM STATUS CODE INVALID");
        }  

    let catdata = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/huvudkategori?per_page=100', {timeout:10000});
    if(catdata.statusCode == 200) {
      let cats = JSON.parse(catdata.content);

      for(let i=0; i<cats.length; i++) {
        Cats.insert({ 
          _parent: cats[i]['parent'],
          link: cats[i]['link'],
          id: cats[i]['id'],
          text: cats[i]['description'],
          slug: cats[i]['slug'],
          createdAt: new Date()
          });
         }
        } else {
          console.log("ITEM STATUS CODE INVALID");
        }          

        cats = Cats.find().fetch();
        //console.log(data)

        for(let i=0; i<cats.length; i++){  
          slug = cats[i]['slug'];
          let tjdata = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst?per_page=100&filter[huvudkategori]=" + slug, {timeout: 10000});
          if(tjdata.statusCode == 200) {
            let tjanst = JSON.parse(tjdata.content);
            for(let i=0; i<tjanst.length; i++) {
              //console.log(tdata[i]['tjanst_meta']);
              let ortdata = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst/" + tjanst[i]['id']+"/ort", {timeout: 100000});
              if(ortdata.statusCode == 200) {
                 let ort = JSON.parse(ortdata.content);
                 
                 try {
                   reg = ort[0]['id'];
                   } catch(e) {
                    reg = 0;
                   }
              }
              
              console.log(tjanst[i]['id']);
              console.log(reg);

              Tjanst.insert({
                _parent: slug,
                id: tjanst[i]['id'],
                text: tjanst[i]['content']['rendered'],
                title: tjanst[i]['title']['rendered'],
                adress: tjanst[i]['tjanst_meta']['adress'],
                tid: tjanst[i]['tjanst_meta']['tid'],
                tel: tjanst[i]['tjanst_meta']['tel'],
                epost: tjanst[i]['tjanst_meta']['epost'],
                oppet: tjanst[i]['tjanst_meta']['oppet'],
                webbsida: tjanst[i]['tjanst_meta']['webbsida'],
                link: tjanst[i]['tjanst_meta']['link'],
                region: reg,
                createdAt: new Date()
              }); 
             }  
        } else {
          console.log("TJANST STATUS CODE INVALID");
        }
      }        

  },

  "deleteItem"(_id) {
    Cats.remove(_id);
  },

  "deleteArticle"(_id) {
    Tjanst.remove(_id);
  },

  "deleteRegion"(_id) {
    Region.remove(_id);
  },

  "clearData"() {
    //console.log("clearData()");
    var db = Cats.find().fetch();
    for(var i=0; i<db.length; i++) {
      console.log(db[i]);
      if(Cats.remove(db[i]._id) == 0) {
        console.log("Failed removing Cats from db Cats");
      }
    }
    db = Tjanst.find().fetch();
    for(var i=0; i<db.length; i++) {
      //console.log(db[i]);
      if(Tjanst.remove(db[i]._id) == 0) {
        console.log("Failed removing Cats from db Tjanst");
      }
    }
    db = Region.find().fetch();
    for(var i=0; i<db.length; i++) {
      //console.log(db[i]);
      if(Region.remove(db[i]._id) == 0) {
        console.log("Failed removing Cats from db Region");
      }
    }
  },

  "clearPath"() {
    //console.log("clearPath()");
    var db = Path.find().fetch();
    for(var i=0; i<db.length; i++) {
      console.log(db[i]);
      if(Path.remove(db[i]._id) == 0) {
        console.log("Failed removing Cats from db");
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




