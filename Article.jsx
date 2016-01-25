// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    render() {
        console.log("Article.render()");
        return (
        	<div>
       	  <h2 className="title">
       	      <i className="dropdown icon"></i>
				{this.props.item.title}</h2>
          <div className="content" >{this.props.item.text}</div>
          </div>
       );
    }
});
