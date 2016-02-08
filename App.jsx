// App component, called in myapp.jsx

const url = 'http://dev.unginfo.fi/wp-json/wp/v2/tjanst'

App = React.createClass({
  getInitialState: function() {
    return {
        _parent: 0,
        initialLoad: false
    }
  },
  // allows us to get data with getMeteorData
  mixins: [ReactMeteorData],

  getMeteorData() {
    console.log("getMeteorData()");
    return {
      items: Items.find({}).fetch(),
      tjanst: Tjanst.find({}).fetch()
    }
  },

  goHome() {
    console.log("CLICK ON TOP REGISTERED")
    FlowRouter.go('/');
  },

  toggleSidebar() {
    $('.ui.sidebar').sidebar('toggle')
  },

  renderMeteor() {
    path = Path.find().fetch()
    let renderedObjects = []
    let renderCount = 0
    renderedObjects = this.data.items.map((item) => {
      if(item._parent == this.props._id) {
        renderedObjects.push(item)
        renderCount++
        return <Item key={item._id} item={item} />;
      }
    })
    if(this.props._id != 0) { // no items were loaded
      renderedObjects.push(<Item item={{
        text: "\u23CE",
        link: "back",
        _parent: this.props._id,
        id: 0,
        slug: "root"
      }} />)
    } else if(renderCount < 1) {
      renderedObjects.push(
          <div className="ui active dimmer">
            <div className="ui text loader">Laddar...</div>
          </div>
        );
    }
    this.props.renderCount = renderCount
    return renderedObjects;
  },

  renderArticles() {
    let itemScreen = false;
    this.data.items.map((item) => {
      if(item._parent == this.props._id) {
        itemScreen = false;
    }});
    if(!itemScreen) {
      var hideContent = "hidden";
      return this.data.tjanst.map((item) => {
        if(item._parent == this.props.slug) {
          return <Article key={item._id} item={item} />
        }
      });
    }
  },

  render() {
    return (
      <div className={this.props.slug}>
        <div className="ui fixed menu white left">
            <i  onClick={this.toggleSidebar} className="sidebar icon big"></i>
        </div>
        <div className="ui image header">
        <div onClick={this.goHome} className="content">
          <img src="/img/UngInfo_app_logo.png" className="ui_logo" />
          </div>
        </div>
        <div className="ui content segments">
          { this.renderMeteor() }
        </div>

        <div className="ui header">
        <div className="content">
        <i className="icon users orange"></i>
        Tjänster</div>
        </div>
        <div className="ui styled fluid accordion white">
            { this.renderArticles() } 
        </div>

        <div className="ui image fixed footer">
        <div className="content">
          <img src="/img/fraga_logo.png" className="ui_logo" />
          </div>
        </div>

        <div id="hidden"></div>
      </div>
    );
  }
});
