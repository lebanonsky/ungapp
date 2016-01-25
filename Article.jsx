// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    handleClick() {
      console.log(this.props);

    },

    render() {
        console.log("Article.render()");
        return (
        	<span>
       	  <h2 className="title" onClick = {this.handleClick} >
       	      <i className="dropdown icon"></i>
				{this.props.item.title}</h2>
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.item.text }} />
          </span>
       );
    }
});
