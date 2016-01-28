// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    componentDidMount() {
      jQuery('.ui .accordion').accordion();
    },

    handleClick() {
      this.props.active = true;
      this.setState({active:true})
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
