// single item from JSON
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Categories = React.createClass({

    handleClick() {
      //console.log(this.props.item.id + " clicked");

      if(this.props.item.link == 'back') {
        history.back();
      } else {
        jQuery('#ungapp').removeClass();
        jQuery('#ungapp').addClass('header pushable home');

        // cat = Tjanst.find({_parent:this.props.item.slug}).fetch()

        // console.log(cat)
        
        // return cat.map((item) => { 
        //   return <Article key={item._id} item={item} />
        // //FlowRouter.go('/');
        // })
        FlowRouter.go('/path/' + this.props.item.id + "?slug=" + this.props.item.slug);

      }
    },    
    render() {
        currentName = "ui segment raised " + this.props.item.slug 

        if (this.props.item._parent != 0) {
          return (
                                                      <ReactCSSTransitionGroup component="div" className="animation-container" transitionName="pageSlider" transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={500} transitionLeaveTimeout={1}>

            <div className={currentName} onClick={this.handleClick} >
           <h3>{this.props.item.title}</h3></div>
                                    </ReactCSSTransitionGroup>

         );

      } else {

        return null;
      }
    }
});
