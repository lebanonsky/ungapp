if (Meteor.isClient) {

Cats = new Mongo.Collection(null);
Tjanst = new Mongo.Collection(null);
Path = new Mongo.Collection(null);
Region = new Mongo.Collection(null);
Evenemang = new Mongo.Collection(null);

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





  getItems  = function () {
    
    let regdata = HTTP.get('https://dev.unginfo.fi/wp-json/wp/v2/ort?per_page=100', {timeout:35000},function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      if(response.statusCode == 200) {
        let regs = JSON.parse(response.content);

        for(let i=0; i<regs.length; i++) {

          Region.insert({ 
            _parent: regs[i]['parent'],
            title: regs[i]['name'],
            link: regs[i]['link'],
            _id: regs[i]['id'].toString(), 
            id: regs[i]['id'], 
            text: regs[i]['description'],
            slug: regs[i]['slug'],
            createdAt: new Date()
          });
        }
      
         
      } 
    }
  });


    let catdata = HTTP.get('https://dev.unginfo.fi/wp-json/wp/v2/huvudkategori?per_page=100', {timeout:35000},function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        if(response.statusCode == 200) {
          let cats = JSON.parse(response.content);

          for(let i=0; i<cats.length; i++) {


            Cats.insert({ 
              _parent: cats[i]['parent'],
              title: cats[i]['name'],
              link: cats[i]['link'],
              id: cats[i]['id'],
              _id: cats[i]['id'].toString(), 
              text: cats[i]['description'],
              slug: cats[i]['slug'],
              createdAt: new Date(),
            });
        
        
          }
        }      
      }
    });
     


        let tjdata = HTTP.get("https://dev.unginfo.fi/wp-json/wp/v2/tjanst?per_page=999", {timeout: 35000}, function( error, response ) {
        if ( error ) {
          console.log( error );
        } else {
            let tjanst = JSON.parse(response.content);
            for(let i=0; i<tjanst.length; i++) {
              if(tjanst[i]['tjanst_meta']['huvudkategori'].length == 0) {
                huvudkategori = "none";
                huvudkategoriparent = "none";
              } else {
                var huvudkategori = new Array();
                var huvudkategoriparent = new Array();
                var kategorilist = new Array();
                for(let k=0; k < tjanst[i]['tjanst_meta']['huvudkategori'].length; k++) {
                  if(tjanst[i]['tjanst_meta']['huvudkategori'][k]) {
                    huvudkategori.push(tjanst[i]['tjanst_meta']['huvudkategori'][k].slug);
                    if(tjanst[i]['tjanst_meta']['huvudkategori'][k].parent != 0) {
                      kategorilist.push(tjanst[i]['tjanst_meta']['huvudkategori'][k].name+' ');
                    }
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
                var ortlist = new Array();
                for(let l=0; l < tjanst[i]['tjanst_meta']['ort'].length; l++) {
                  if(tjanst[i]['tjanst_meta']['ort'][l]) {
                    ort.push(tjanst[i]['tjanst_meta']['ort'][l].name.toLowerCase());
                    ortlist.push(tjanst[i]['tjanst_meta']['ort'][l].name.toLowerCase()+' ');
                  }
                }
              }

              Tjanst.insert({
                _parent: huvudkategori,
                rootparent: huvudkategoriparent,
                id: tjanst[i]['id'],
               _id: tjanst[i]['id'].toString(), 
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
                regionlist: ortlist,
                kategorilist: kategorilist, 
                createdAt: new Date()
              }); 
          
          
            }
          }
        });

             




    let eventdata = HTTP.get('https://dev.unginfo.fi/wp-json/wp/v2/tribe_events?per_page=999', {timeout:35000}, function( error, response ) {
  if ( error ) {
    console.log( error );
  } else {
  if(response.statusCode == 200) {
      let regs = JSON.parse(response.content);
      for(let i=0; i<regs.length; i++) {

        Evenemang.insert({ 
          _parent: regs[i]['parent'],
          link: regs[i]['link'],
          title: regs[i]['title']['rendered'],
          id: regs[i]['id'], 
          _id: regs[i]['id'].toString(), 
          text: regs[i]['content']['rendered'],
          slug: regs[i]['slug'],
          startdate : regs[i]['tribe_meta']['startdate'],
          enddate : regs[i]['tribe_meta']['enddate'],
          venue : regs[i]['tribe_meta']['venue'],
          createdAt: new Date()
        });
    
    
      }
    } 
  }
});
  
  }

  deleteItem  = function (_id) {
    Cats.remove(_id);
  }

  deleteArticle = function (_id) {
    Tjanst.remove(_id);
  }

  deleteRegion = function (_id) {
    Region.remove(_id);
  }

  clearData  = function () {
    rm = Cats.remove({})
    if(!rm) {
        console.log("Failed removing items from db Cats ");
      }    
    
  }

  clearPath = function() {
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


Meteor.startup(function() {
    getItems();

    GoogleMaps.load();  

    if(window.cordova) {
      document.addEventListener("deviceready", loadLocation, false);
    } else {
      $(document).ready(function(){ 
        loadLocation(); 
      });
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


    HTTP.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyAcuhBx6pL0vDEKp-bFgN8w7k2NxNq35_Y&language=sv", {timeout:35000},function( error, results ) {

    if ( error ) {
      console.log( error );
    } else {
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
              console.log("found match from regions, setting: "+component.long_name);

              Session.set('userRegion', component.long_name);
    

          }
        }


      
    }

  });




        };
    
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });
    }

    const loadedStates = ['complete', 'loaded', 'interactive'];
    //if document loaded, just run, else wait for DOMContentLoaded event
    if (loadedStates.includes(document.readyState) && document.body) {
      run();
    } else {
      window.addEventListener('DOMContentLoaded', run, false);
    }
  });

//move rendering to separate function to ensure DOM content loaded
function run() {
    ReactDOM.render(<App _id={0} initialLoad={true} />, document.getElementById("render-target"));
    ReactDOM.render(<Sidebar />, document.getElementById("sidebar-target"));
    ReactDOM.render(<ContentFrame />, document.getElementById("iframe-target"));
}

}








