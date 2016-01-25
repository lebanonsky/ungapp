// App component, called in myapp.jsx

const url = 'http://dev.unginfo.fi/wp-json/wp/v2/tjanst'

App = React.createClass({
  getInitialState: function() {
    return {_parent: 0}
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
    console.log(renderCount);
    if(renderCount < 1) { // no items were loaded
      renderedObjects = this.data.tjanst.map((item) => {
        if(item._parent == this.props.slug) {
          return <Article key={item._id} item={item} />
        }
      });
    }
    if(renderCount < 1) { // no articles were loaded
      renderedObjects.push(<Item item={{
        text: "Gå tillbaka",
        link: "back",
        _parent: this.props._id,
        id: 0,
        slug: "root"
      }} />)
    }
    return renderedObjects;
  },

  render() {
    return (
      <div className="container">
        <header>
          <img src="/img/ui_logo.png" class="ui_logo" />
        </header>

        <ul className="ui list">
          { this.renderMeteor() }
        </ul>
      </div>
    );
  }
});
