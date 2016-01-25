// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    render() {
        console.log("Article.render()");
        return (
          <li className="ui message">{this.props.item.text}</li>
       );
    }
});
