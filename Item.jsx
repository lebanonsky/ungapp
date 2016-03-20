// single item from JSON

Item = React.createClass({
    propTypes: {
        text: React.PropTypes.object.isRequired,
        link: React.PropTypes.object.isRequired,
        _parent: React.PropTypes.object.isRequired 
    },

    handleClick() {
      //console.log(this.props.item.id + " clicked");

    jQuery('#ungapp').removeClass();
    parent = Cats.find({ _id:this.props.item._parent }).fetch()
    jQuery('#ungapp').addClass('header pushable '+ this.props.item.slug + ' '+ parent.slug );

    if (GoogleMaps.loaded()) {      
     jQuery('#TjanstMap').show();

      GoogleMaps.create({
          name: "TjanstMap",
          element: document.getElementById("TjanstMap"),
          options: {
            center: new google.maps.LatLng( 60.170014,  24.938466),
            zoom: 8
          }});
      }
      

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
         <h3>{this.props.item.text}</h3></div>
       );
    }
});
