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
      items: Items.find({}).fetch()
    }
  },

  renderMeteor() {
    console.log("renderMeteor()");
    path = Path.find().fetch()
    return this.data.items.map((item) => {
      if(item._parent === path[path.length -1]) {
        return <Item key={item._id} item={item} />;
      }
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Items</h1>
        </header>

        <ul>
          { this.renderMeteor() }
        </ul>
      </div>
    );
  }
});
