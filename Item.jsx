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


    if(this.props.item._parent == 0) {

      jQuery('#ungapp').removeClass();

      jQuery('#ungapp').addClass('header pushable '+ this.props.item.slug );

      }        
      
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
        } else if (this.props.item.img) {
            return (
                <div className={currentName} onClick={this.handleClick} >
                    <img src={this.props.item.img} width="300px" />
                </div>
            );
        }
        else
        {
            return (
                <div className={currentName} onClick={this.handleClick} >
                    <h4>{this.props.item.text}</h4>
                </div>
            );
        }
    }
});
