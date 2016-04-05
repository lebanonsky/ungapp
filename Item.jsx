// single item from JSON

Item = React.createClass({
    propTypes: {
        text: React.PropTypes.object.isRequired,
        link: React.PropTypes.object.isRequired,
        _parent: React.PropTypes.object.isRequired 
    },
    handleSwipe() {
        history.back();
    },
    handleClick() {
      //console.log(this.props.item.id + " clicked");

    jQuery('#ungapp').removeClass();
    parent = Cats.findOne({ id:this.props.item._parent},{slug:1});
    try {
      parentclass = parent.slug;
    } catch(err) {
      parentclass = 'home';
    }

    jQuery('#ungapp').addClass('header pushable '+ this.props.item.slug + ' '+ parentclass );
    //console.log(parentclass)

    // if (GoogleMaps.loaded()) {      
    //  jQuery('#TjanstMap').show();

    //   GoogleMaps.create({
    //       name: "TjanstMap",
    //       element: document.getElementById("TjanstMap"),
    //       options: {
    //         center: new google.maps.LatLng( 60.170014,  24.938466),
    //         zoom: 8
    //       }});
    //   }
      

    if(this.props.item.link == 'back') {
        history.back()

      } else {

        FlowRouter.go('/path/' + this.props.item.id + "?slug=" + this.props.item.slug);
      }
    },

    render() {
        currentName = "ui raised segment " + this.props.item.slug

        if(this.props.item.link == "back") {
            return (
                <Hammer onTap={this.handleSwipe} onSwipe={this.handleSwipe}>
                    <div className={currentName} onClick={this.handleClick} >
                        <h4>{this.props.item.text}</h4>
                    </div>
                </Hammer>
            );
        } else {
            return (
                <div className={currentName} onClick={this.handleClick} >
                    <h4>{this.props.item.text}</h4>
                </div>
            );
        }
    }
});
