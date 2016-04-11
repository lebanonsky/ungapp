// App component, called in myapp.jsx

const url = 'http://dev.unginfo.fi/wp-json/wp/v2/tjanst'

App = React.createClass({
  getInitialState: function() {
     
     $('.ui.sidebar').on('search', this.renderSearchResults);
     $('.ui.sidebar').on('regions', this.renderRegions);
     $('.ui.sidebar').on('evenemang', this.renderRegions);
     $('.ui.sidebar').on('chat', this.openChat);
     $('.ui.sidebar').on('fraga', this.openFraga);

    return {
        _parent: 0,
        initialLoad: false
    }
  },
  // allows us to get data with getMeteorData
  mixins: [ReactMeteorData],

  getMeteorData() {
    if(Session.get('userRegion')) {
      return {
        items: Cats.find({}).fetch(),
        tjanst: Tjanst.find( { $or: [ { region: Session.get('userRegion').toLowerCase()}, { region: "nationell"} ] } ).fetch(),
        region: Region.find({}).fetch(),
        evenemang: Evenemang.find({}).fetch()
     }
    } else {
      return {
        items: Cats.find({}).fetch(),
        tjanst: Tjanst.find({}).fetch(),
        region: Region.find({}).fetch(),
        evenemang: Evenemang.find({}).fetch()
      }
    }
  },

  goHome() {
    jQuery('#TjanstMap').hide();
    jQuery('#ungapp').removeClass();
    jQuery('#ungapp').addClass('header pushable home');
    FlowRouter.go('/');
  },

  closeFrame() {
    jQuery('div#iframe-target').hide();
  },

  openInfo() {
    jQuery('div#iframe-target').slideToggle();
    FlowRouter.go('/info');
  },

  toggleSidebar() {
    $('.ui.sidebar').sidebar('toggle')  

  },

  renderMeteor() {
    path = Path.find().fetch();
    let renderedObjects = []
    let renderCount = 0
    if(this.props.slug == "search") {

    } else if(this.props.slug == "region") {
        if(Session.get('userRegion')) {
              userRegion = Region.findOne({title:Session.get('userRegion').toLowerCase() })
              renderedObjects.push(userRegion)
              }
          
      renderedObjects = this.data.region.map((item) => {
        renderedObjects.push(item)
        renderCount++
        return <Region2 key={item._id} item={item} />;
      })

    }  else if(this.props.slug == "evenemang") {
      renderedObjects = this.data.evenemang.map((item) => {
        renderedObjects.push(item)
        renderCount++
        return <EvenemangView key={item._id} item={item} />;
      })

    } else {
      renderedObjects = this.data.items.map((item) => {
        if(item._parent == this.props._id) {
          renderedObjects.push(item)
          renderCount++
          return <Item key={item._id} item={item} />;
        }
      })

    if(this.props._id != 0 ) { // no items were loaded
      renderedObjects.push(<Item item={{
        text:"",
        //text: "\u23CE",
        link: "back",
        _parent: this.props._id,
        id: 0,
        slug: this.props.slug
      }} />)
    } else if(this.props._id == 0) {
      renderedObjects.push(<Item item={{
        text:"Få Hjäp Direkt",
        img: '/img/fa_hjalp_direkt.png',
        link: "direkt",
        _parent: this.props._id,
        id: 0,
        slug: 'direkt'
      }} />)

    } else if(renderCount < 1) {
      renderedObjects.push(
        <div className="ui active dimmer">
        <div className="ui text loader">Laddar...</div>
        </div>
        );
    }
  }
  this.props.renderCount = renderCount
  return renderedObjects;
},
  
 
  renderSearchResults() {
    this.toggleSidebar()
  },
  renderRegions() {
    this.toggleSidebar()
  },
  openChat() {
    jQuery('div#iframe-target').slideToggle();
    this.toggleSidebar()
    FlowRouter.go('/chat');

  },
  openFraga() {
    jQuery('div#iframe-target').slideToggle();
    this.toggleSidebar()
    FlowRouter.go('/fraga');

  },


  renderArticles() {
    // don't return any items
    if (this.props.slug == "region" || this.props.slug == "evenemang"){ 
        return null;
    }
    //search page
    if(this.props.slug == "search") {
            let cursor = TjanstIndex.search(this.props.searchstring);
      var searchResults = cursor.fetch();
      console.log(searchResults);
      return searchResults.map((item) => {

        return <Article key={item._id} item={item} />
      });
    } 
    //normal list
    var hideContent = "hidden";
    //navigationleven 0 = frontpage, 1 ...
    var navigationlevel = 0;

    if(this.props.slug) {
      //if current slug is found only as a root category we have navigationlevel 1
      frontparent = Tjanst.findOne({ rootparent : this.props.slug},{slug:1});
      //if current slug is found only as a normal category we have navigationlevel 2
      parent = Tjanst.findOne({ _parent : this.props.slug},{slug:1});
      if(frontparent) {
        navigationlevel = 1;
      }
      if(parent) {
        navigationlevel = 2;
      }

    }
    return this.data.tjanst.map((item) => {
      //console.log(item.rootparent);
      if (navigationlevel == 1){
        if(_.contains(item.rootparent,  this.props.slug)) {
          return <Article key={item._id} item={item} />
        }    
      } else if(navigationlevel == 2) {
        if(_.contains(item._parent,  this.props.slug)) {
          return <Article key={item._id} item={item} />
        }    
      } else {
         //return <Article key={item._id} item={item} />       
       
      }
    });

  },

  // renderHeader() {

  //   return (        
  //     <div className="ui content" >
  //       </div>);
    
  // },
  // renderUserInfo() {
  //   if(Session.get('userRegion')) {
  //   return (        
  //     <div id="userdata" className="ui content" >{Session.get('userRegion')}
  //       </div>);

  //   } else { return ""}

  //  },

  render() {
    

    return (
      <div className={this.props.slug}>
        <div className="ui fixed menu white left">
            <i  onClick={this.toggleSidebar} className="sidebar white icon big"></i>
            <a href="/info" onClick={this.openInfo}>
            <img src="/img/unginfo_logo.png" className="right" id="top_logo"/>
            </a>
        </div>
        <div className="ui image header ungapp">
        <div onClick={this.goHome} className="content">
          <img src="/img/hjalp_logo.png" className="ui_logo" />
          </div>
        </div>
        <div className="ui content segments ungapp">
          { this.renderMeteor() }
        </div>
        <div className="ui styled fluid accordion">
            { this.renderArticles() } 
        </div>

        <div id="hidden"></div>
      </div>
    );
  }
});
