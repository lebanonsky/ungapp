// single item from JSON

Region2 = React.createClass({


    handleClick() {
      //console.log(this.props.item.id + " clicked");


      if(this.props.item.link == 'back') {
        history.back()
      } else {
        FlowRouter.go('/path/' + this.props.item.id + "?slug=" + this.props.item.slug);
      }
    },

    render() {
        //console.log("Item.render()");
        currentName = "ui raised segment " + this.props.item.slug
        return (
          <div className={currentName} onClick={this.handleClick} >
         <h3>{this.props.item.title}</h3></div>
       );
    }
});
