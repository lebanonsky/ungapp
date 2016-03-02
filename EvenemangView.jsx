// single item from JSON

EvenemangView = React.createClass({


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
        currentName = "ui raised segment evenemang " + this.props.item.slug
        return (
          <div className={currentName} onClick={this.handleClick} >
         <h3>{this.props.item.title}</h3>
         <p>{this.props.item.venue} - {this.props.item.startdate} - {this.props.item.enddate}</p>
         <p dangerouslySetInnerHTML={{__html: this.props.item.text }} ></p>
         </div>
       );
    }
});
