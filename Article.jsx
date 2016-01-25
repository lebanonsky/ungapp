// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    render() {
        console.log("Article.render()");
        return (
          <div className="ui segment">{this.props.item.text}</div>
       );
    }
});
