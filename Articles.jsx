var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Articles = React.createClass({
  propTypes: {
  },
  renderChildren() {
    if (this.props.search && this.props.search == 1){
      return this.props.children.map((item) => {
        return <Article key={item._id} item={item} />
      });
    } else {
      return this.props.children.map((item) => {
        if (this.props.nav == 1){
          if(_.contains(item.rootparent,  this.props.slug)) {
            return <Article key={item._id} item={item} />
          }    
        } else if(this.props.nav == 2) {
          if(_.contains(item._parent,  this.props.slug)) {
            return <Article key={item._id} item={item} />
          }    
        } else {
          return <Article key={item._id} item={item} />

        }
      }); 
    }
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