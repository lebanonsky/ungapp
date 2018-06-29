// single item from JSON
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Region2 = React.createClass({


    handleClick() {
      //console.log(this.props.item.id + " clicked");


      if(this.props.item.link == 'back') {
        history.back();
  
      } else if( this.props.item.slug == 'aaa'){
        Session.set('userRegion', null);
      } else {
        Session.set('userRegion', this.props.item.title);
        console.log('userRegion set '+ Session.get('userRegion') )
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
        <ReactCSSTransitionGroup component="div" className="animation-container" transitionName="pageSlider" transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={500} transitionLeaveTimeout={1}>

          <div className={currentName} onClick={this.handleClick} >
           <h3>{this.props.item.title}</h3></div>
        </ReactCSSTransitionGroup>

       );
    }
});
