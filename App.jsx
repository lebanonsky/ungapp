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
      if(item._parent == this.props._id) {
        return <Item key={item._id} item={item} />;
      } else {
        console.log("Element with id " + item._parent + " was not rendered, app internal id: " + this.props._id);
      }
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <img src="/img/ui_logo.png" class="ui_logo" />
        </header>

        <ul>
          { this.renderMeteor() }
        </ul>
      </div>
    );
  }
});
