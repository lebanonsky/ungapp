// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    handleClick() {
      this.props.active = true;
      console.log(this.props);
    },

    render() {
        console.log("Article.render()");
        titleName=this.props.active ? "active title" : "title"
        divName=this.props.active ? "active content" : "content"
        return (
        	<span>
            <h2 className={titleName} onClick = {this.handleClick} >
                <i className="dropdown icon"></i>
              {this.props.item.title}</h2>
            <div className={divName} dangerouslySetInnerHTML={{__html: this.props.item.text }} />
          </span>
       );
    }
});
