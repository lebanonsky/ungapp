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
        text: "Gå tillbaka",
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
      return this.data.tjanst.map((item) => {
        if(item._parent == this.props.slug) {
          return <Article key={item._id} item={item} />
        }
      });
    }
  },

  render() {
    return (
      <div className="teal">
        <div className="ui fixed inverted menu left">
            <i className="sidebar icon inverted big" classStyle="padding:5px;"></i>
        </div>
        <h2 className="ui image header teal">
        <div onClick={this.goHome} className="content">
          <img src="/img/ui_logo.png" className="ui_logo" />
          </div>
        </h2>

        <div className="ui content segments">
          { this.renderMeteor() }
        </div>

        <div className="ui styled fluid accordion white">
            { this.renderArticles() }
        </div>

        <div id="hidden"></div>

      </div>
    );
  }
});
