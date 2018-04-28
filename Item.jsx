// single item from JSON
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Hammer = require('react-hammerjs');

Item = React.createClass({
    propTypes: {

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
                          <ReactCSSTransitionGroup component="div" className="animation-container" transitionName="pageSlider" transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={500} transitionLeaveTimeout={1}>
 
                    <div className={currentName} onClick={this.handleClick} >
                        <h4><img src='/img/back.png' />{this.props.item.text}</h4>
                    </div>
          </ReactCSSTransitionGroup>
            );
        } else if (this.props.item.slug == 'direkt') {
            return (

                <div className={currentName} onClick={this.handleClick} >
                    <img src='/img/fa_hjalp_direkt.png' />
                </div>

            );
        }
        else
        {
            return (
                                          <ReactCSSTransitionGroup component="div" className="animation-container" transitionName="pageSlider" transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={500} transitionLeaveTimeout={1}>

                <div className={currentName} onClick={this.handleClick} >
                    <h4><img src="/img/nuoli.png" className="back" />&nbsp;{this.props.item.text}</h4>
                </div>
                          </ReactCSSTransitionGroup>

            );
        }
    }
});
