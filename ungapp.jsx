Cats = new Mongo.Collection("cat");
Tjanst = new Mongo.Collection("tjanst");
Path = new Mongo.Collection("path");
Region = new Mongo.Collection("region");
Evenemang = new Mongo.Collection("evenemang");

// var linkify = require('linkifyjs');
// var linkifyHtml = require('linkifyjs/html');

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


if (Meteor.isServer) {

Meteor.methods({

  "getItems"() {

    let regdata = HTTP.get('http://dev.unginfo.fi/wp-json/wp/v2/ort?per_page=100', {timeout:10000});
    if(regdata.statusCode == 200) {

      let regs = JSON.parse(regdata.content);

      for(let i=0; i<regs.length; i++) {
        Region.insert({ 
          _parent: regs[i]['parent'],
          title: regs[i]['name'],
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
          createdAt: new Date(),
          });
         }
        } else {
          console.log("ITEM STATUS CODE INVALID");
        }          

        cats = Cats.find().fetch();
          let tjdata = HTTP.get("http://dev.unginfo.fi/wp-json/wp/v2/tjanst?per_page=999", {timeout: 10000});
          if(tjdata.statusCode == 200) {
            let tjanst = JSON.parse(tjdata.content);
            for(let i=0; i<tjanst.length; i++) {
              if(tjanst[i]['tjanst_meta']['huvudkategori'].length == 0) {
                huvudkategori = "none";
                huvudkategoriparent = "none";
              } else {

                var huvudkategori = new Array();
                var huvudkategoriparent = new Array();


                for(let k=0; k < tjanst[i]['tjanst_meta']['huvudkategori'].length; k++) {
                  if(tjanst[i]['tjanst_meta']['huvudkategori'][k]) {
                    huvudkategori.push(tjanst[i]['tjanst_meta']['huvudkategori'][k].slug);
                  }
                }
                for(let k=0; k < tjanst[i]['tjanst_meta']['huvudkategori_parent'].length; k++) {
                  if(tjanst[i]['tjanst_meta']['huvudkategori_parent'][k]) {
                    huvudkategoriparent.push(tjanst[i]['tjanst_meta']['huvudkategori_parent'][k]);
                  }
                }
              }
              if(tjanst[i]['tjanst_meta']['ort'].length == 0) {
                ort = "none";               
              } else {

                var ort = new Array();

                for(let l=0; l < tjanst[i]['tjanst_meta']['ort'].length; l++) {
                  if(tjanst[i]['tjanst_meta']['ort'][l]) {
                    ort.push(tjanst[i]['tjanst_meta']['ort'][l].slug);
                  }
                }
              }
              Tjanst.insert({
                _parent: huvudkategori,
                rootparent: huvudkategoriparent,
                id: tjanst[i]['id'],
                text: tjanst[i]['content']['rendered'],
                title: tjanst[i]['title']['rendered'],
                adress: tjanst[i]['tjanst_meta']['adress'],
                tid: tjanst[i]['tjanst_meta']['tid'],
                tel: tjanst[i]['tjanst_meta']['tel'],
                lat: tjanst[i]['tjanst_meta']['lat'],
                lon: tjanst[i]['tjanst_meta']['lon'],
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
    if(eventdata.statusCode == 200) {

      let regs = JSON.parse(eventdata.content);

      for(let i=0; i<regs.length; i++) {
        Evenemang.insert({ 
          _parent: regs[i]['parent'],
          link: regs[i]['link'],
          title: regs[i]['title']['rendered'],
          id: regs[i]['id'], 
          text: regs[i]['content']['rendered'],
          slug: regs[i]['slug'],
          startdate : regs[i]['tribe_meta']['startdate'],
          enddate : regs[i]['tribe_meta']['enddate'],
          venue : regs[i]['tribe_meta']['venue'],
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
}
if (Meteor.isClient) {

Meteor.startup(function() {


   
    GoogleMaps.load();  

    if(window.cordova) {
      console.log("using cordova");
      document.addEventListener("deviceready", loadLocation, false);
    } else {
      console.log("not using cordova");
      $(document).ready(function(){ 
        loadLocation(); });
    }

    function loadLocation() {
    
        var onSuccess = function(position) {
            console.log('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');

        Meteor.call("checkMapApi", position.coords.latitude ,position.coords.longitude, function(error, results) {
          var address_components = results.data.results[0].address_components;
          //loop through components to find locality / political accyracy
          var component =  null;
          for(let i=0; i<address_components.length; i++) {

            var locality  = jQuery.inArray( "locality", address_components[i].types)
            var political =  jQuery.inArray( "political", address_components[i].types)
            if(locality > -1 && political > -1) {
              component = address_components[i];
            }
          }
          // TODO - CHECK IF COMPONENT LONGNAME IS DEFINED AND IF THE VALUE IS FOUND IN REGIONS
        //  Session.set('userRegion', component.long_name);
        if(component.long_name) {
          var regions = Region.find({}).fetch();
          var match = false;
          for(let i=0; i<regions.length; i++) {
            if(component.long_name.toLowerCase() == regions[i].title.toLowerCase()) {
              match = true;
            }
          }
          if(match) {
            if(Session.get('userRegion')) {
                console.log("previous region found saved", Session.get('userRegion'));
            }

            console.log("found match from regions, setting");

            Session.set('userRegion', component.long_name);
          }
        }

        });

        };
    
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
        console.log(navigator.geolocation);        navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });
    }



    ReactDOM.render(<App _id={0} initialLoad={true} />, document.getElementById("render-target"));
    ReactDOM.render(<Sidebar />, document.getElementById("sidebar-target"));
    ReactDOM.render(<ContentFrame />, document.getElementById("iframe-target"));

  });
}

if (Meteor.isServer) {
    Meteor.methods({
        checkMapApi: function (lat, lon) {
            this.unblock();
            return Meteor.http.call("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyAcuhBx6pL0vDEKp-bFgN8w7k2NxNq35_Y&language=sv");
        }
    });



Meteor.startup(function() {
      Cats.remove({});
      Region.remove({});
      Tjanst.remove({});
      Evenemang.remove({});
      Meteor.call("getItems");
  

  // Meteor.startup(function() {
    // return Meteor.methods({
    //   removeCats: function() {
    //     return Cats.remove({});
    //   },

    //   removeReg: function() {
    //     return Region.remove({});
    //   },

    //   removeEve: function() {
    //     return Evenemang.remove({});
    //   },
    //   removeTja: function() {

    //     return Tjanst.remove({});

    //   }

    // });

  });

}



