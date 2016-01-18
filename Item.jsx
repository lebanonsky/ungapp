// single item from JSON

Item = React.createClass({
    propTypes: {
        text: React.PropTypes.object.isRequired,
        link: React.PropTypes.object.isRequired,
        _parent: React.PropTypes.object.isRequired 
    },

    handleClick() {
      console.log(this.props.item.id + " clicked");
      Path.insert({id: this.props.item.id});
      FlowRouter.go('/path/' + this.props.item.id);
    },

    render() {
        console.log("Item.render()");
        return (
          <li onClick={this.handleClick}>{this.props.item.text}</li>
       );
    }
});
