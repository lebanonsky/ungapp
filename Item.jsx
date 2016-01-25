// single item from JSON

Item = React.createClass({
    propTypes: {
        text: React.PropTypes.object.isRequired,
        link: React.PropTypes.object.isRequired,
        _parent: React.PropTypes.object.isRequired 
    },

    handleClick() {
      console.log(this.props.item.id + " clicked");
      FlowRouter.go('/path/' + this.props.item.id + "?slug=" + this.props.item.slug);
    },

    render() {
        console.log("Item.render()");
        return (
          <div className="ui segment" onClick={this.handleClick}>{this.props.item.text}</div>
       );
    }
});
