var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

DataItems = React.createClass({
  propTypes: {
  },

  renderChildren() {
    path = Path.find().fetch();
    let renderedObjects = []
    let renderCount = 0

    if(this.props.slug == "search") {

    } else if(this.props.slug == "regions") {


      if(Session.get('userRegion')) {
        userRegion = Region.findOne({title:Session.get('userRegion') })
        if(userRegion) {
          userRegion.title = 'Ny valda ' + userRegion.title
          this.props.data.region.unshift(userRegion)
        }
      }
      renderedObjects = this.props.data.region.map((item) => {
        renderedObjects.push(item)
        renderCount++
        return <Region2 key={item._id} item={item} />;
      })

    }  else if(this.props.slug == "evenemang") {
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
    }
    else {
      renderedObjects = this.props.data.items.map((item) => {
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
  render: function() {

    return (
        <div className="articles-container">
          <ReactCSSTransitionGroup component="div" className="animation-container" transitionName="pageSlider" transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={500} transitionLeaveTimeout={300}>
            {this.renderChildren()}
          </ReactCSSTransitionGroup>
        </div>
      

    );
  }

});