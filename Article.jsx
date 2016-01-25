// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    render() {
        console.log("Article.render()");
        return (
         <div className="content" dangerouslySetInnerHTML={{__html: this.props.item.text }} />
       );
    }
});
