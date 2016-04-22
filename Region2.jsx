// single item from JSON

Region2 = React.createClass({


    handleClick() {
      //console.log(this.props.item.id + " clicked");


      if(this.props.item.link == 'back') {
        history.back();
  
      } else if( this.props.item.slug == 'aaa'){
        Session.set('userRegion', null);
        console.log('userRegion set '+ Session.get('userRegion') )
      } else {
        Session.set('userRegion', this.props.item.title);
        //redirect to home page
      }
        jQuery('#TjanstMap').hide();
        jQuery('#ungapp').removeClass();
        jQuery('#ungapp').addClass('header pushable home');
        FlowRouter.go('/');


    },    
    render() {
        //console.log("Item.render()");
        currentName = "ui segment raised " + this.props.item.slug

        return (
          <div className={currentName} onClick={this.handleClick} >
         <h3>{this.props.item.title}</h3></div>
       );
    }
});
