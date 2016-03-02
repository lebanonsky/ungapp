Cats = new Mongo.Collection("cat");
Tjanst = new Mongo.Collection("tjanst");
Path = new Mongo.Collection("path");
Region = new Mongo.Collection("region");
Evenemang = new Mongo.Collection("evenemang");

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

     //   for(let i=0; i<cats.length; i++){  
     //     slug = cats[i]['slug'];
          let tjdata = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst?per_page=999", {timeout: 10000});
          if(tjdata.statusCode == 200) {
            let tjanst = JSON.parse(tjdata.content);
            for(let i=0; i<tjanst.length; i++) {
              //console.log(tdata[i]['tjanst_meta']);
             // let ortdata = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst/" + tjanst[i]['id']+"/ort", {timeout: 10000});
           /*   if(ortdata.statusCode == 200) {
                 let ort = JSON.parse(ortdata.content);
                 
                 try {
                   reg = ort[0]['id'];
                   } catch(e) {
                    reg = 0;
                   }
              }*/
              
              //console.log(tjanst[i]['id']);
              //console.log(reg);
              if(tjanst[i]['tjanst_meta']['huvudkategori'].length == 0) {
                huvudkategori = "none";
              } else {
                huvudkategori = tjanst[i]['tjanst_meta']['huvudkategori'][0].slug;
              }
              if(tjanst[i]['tjanst_meta']['ort'].length == 0) {
                ort = "none";               
              } else {
                ort = tjanst[i]['tjanst_meta']['ort'][0].slug;
              }
              Tjanst.insert({
                _parent: huvudkategori,
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
                region: ort,
                createdAt: new Date()
              }); 
             }  
        } else {
          console.log("TJANST STATUS CODE INVALID");
        }
    //  }        

    let eventdata = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/tribe_events?per_page=999', {timeout:10000});
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
    rm = Cats.remove({})
    if(!rm) {
        console.log("Failed removing items from db Cats ");
      }    
    
  },

  "clearPath"() {
    //console.log("clearPath()");
    var pdb = Path.find().fetch();
    for(var i=0; i<pdb.length; i++) {
      console.log(pdb[i]);
      if(Path.remove(pdb[i]._id) == 0) {
        console.log("Failed removing paths from db");
      }
    }
    Path.insert({id:0});
  }
});

if (Meteor.isClient) {

  Meteor.startup(function() {
    Meteor.call("clearPath")
    Meteor.call("removeReg")
    Meteor.call("removeTja")
    Meteor.call("removeCats", () => {
      Meteor.call("getItems");
      GoogleMaps.load();
 
    });

    ReactDOM.render(<App _id={0} initialLoad={true} />, document.getElementById("render-target"));
    ReactDOM.render(<Sidebar />, document.getElementById("sidebar-target"));

  });
}

if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeCats: function() {

        return Cats.remove({});

      },

      removeReg: function() {

        return Region.remove({});

      },

      removeEve: function() {

        return Evenemang.remove({});

      },

      removeTja: function() {

        return Tjanst.remove({});

      }

    });

  });

}



