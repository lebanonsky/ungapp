var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

DataItems = React.createClass({
  propTypes: {
  },

  renderChildren() {
    path = Path.find().fetch();
    let renderedObjects = [];
    let renderCount = 0;

    if(this.props.slug == "search") {

    } else if(this.props.slug == "regions") {
     if(Session.get('userRegion')) {
        userRegion = Region.findOne({title:Session.get('userRegion') })
        if(userRegion) {
          userRegion.title = 'Vald region: ' + userRegion.title
          renderedObjects.push(<Region2 key="12345" item={userRegion} />);
        }
      }

      this.props.data.region.map((item) => {
        renderedObjects.push(<Region2 key={item._id} item={item} />)
        renderCount++
      })

    } else if(this.props.slug == "evenemang") {
        renderedObjects = this.props.data.evenemang.map((item) => {
          renderedObjects.push(item)
          renderCount++
          return <EvenemangView key={item._id} item={item} />;
        })
    } else if(this.props.slug == "category") {
        renderedObjects = this.props.data.items.map((item) => {
          renderedObjects.push(item)
          renderCount++
          return <Categories key={item._id} item={item} />;
        })
    } else {
      renderedObjects = this.props.data.items.map((item) => {

        if(item._parent == this.props._id) {
          renderedObjects.push(item)
          renderCount++
          return <Item key={item._id} item={item} />;
        }
      })

      if(this.props._id != 0 ) { // no items were loaded
        renderedObjects.push(<Item item={{
          text: "",
          link: "back",
          _parent: this.props._id,
          id: 0,
          slug: this.props.slug
        }} />)

      } else if(renderCount < 1) {
        return
          <div className="ui active dimmer">
          <div className="ui text loader">Laddar...</div>
          </div>
          ;
        
    }
  }


  this.props.renderCount = renderCount
  return renderedObjects;


  },
  render: function() {

    return (
        <div className="articles-container">
            {this.renderChildren()}
        </div>
      

    );
  }

});