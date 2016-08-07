// App component, called in myapp.jsx

const url = 'http://dev.unginfo.fi/wp-json/wp/v2/tjanst'
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
App = React.createClass({
  getInitialState: function() {
     
     $('.ui.sidebar').on('search', this.toggleSidebar);
     $('.ui.sidebar').on('regions', this.toggleSidebar);
     $('.ui.sidebar').on('evenemang', this.toggleSidebar);
     $('.ui.sidebar').on('chat', this.openChat);
     $('.ui.sidebar').on('fraga', this.openFraga);
     $('.ui.sidebar').on('categories', this.toggleSidebar);

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
        items: Cats.find({},{sort:{'title':1}}).fetch(),
        tjanst: Tjanst.find( { $or: [ { region: Session.get('userRegion').toLowerCase()}, { region: "nationell"} ] } ).fetch(),
        region: Region.find({},{sort:{'slug':1}}).fetch(),
        evenemang: Evenemang.find({}).fetch()
     }
    } else {
      return {
        items: Cats.find({},{sort:{'title':1}}).fetch(),
        tjanst: Tjanst.find({}).fetch(),
        region: Region.find({},{sort:{'slug':1}}).fetch(),
        evenemang: Evenemang.find({}).fetch()
      }
    }
  },

  goHome() {
    $('#TjanstMap').hide();
    $('#ungapp').removeClass();
    $('#ungapp').addClass('header pushable home');
    FlowRouter.go('/');
  },

  closeFrame() {
    $('div#iframe-target').hide();
  },

  openInfo() {
    $('div#iframe-target').slideToggle();
    FlowRouter.go('/info');
  },

  toggleSidebar() {
    $('.ui.sidebar').sidebar('toggle')  

  },

  renderMeteor() {
    path = Path.find().fetch();
    let renderedObjects = []
    let renderCount = 0

    return <DataItems _id={this.props._id} data={this.data}  slug={this.props.slug} />
},

  openChat() {
    $('div#iframe-target').slideToggle();
    this.toggleSidebar()
    FlowRouter.go('/chat');
  },
  openFraga() {
    $('div#iframe-target').slideToggle();
    this.toggleSidebar()
    FlowRouter.go('/fraga');

  },


  renderArticles() {
    // don't return any items
    if (this.props.slug == "regions" || this.props.slug == "evenemang" || this.props.slug == 'category'){ 
        return null;
    }
    if(this.props.slug == "search") {
      let cursor = TjanstIndex.search(this.props.searchstring);
      var searchResults = cursor.fetch();
      return <Articles children={searchResults} search={1} />
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
    return <Articles children={this.data.tjanst} nav={navigationlevel} slug={this.props.slug} />
    

  },


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
          <img src="/img/hjalp_logo.png" className="ui_logo" id="ui_logo" />
          </div>
        </div>
        <div className="ui content segments ungapp" id="content">
          { this.renderMeteor() }
        </div>

        <div className="ui styled fluid accordion">
            { this.renderArticles() } 
        </div>

        <div id="hidden">
        </div>
      </div>

    );
  }
});
