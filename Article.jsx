// single item from JSON

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


Article = React.createClass({
  propTypes: {
  },

  componentDidMount() {
    jQuery('.ui .accordion').accordion();

  },
  openLink(event) {

    event.preventDefault();
    let to = event.currentTarget.textContent;
    window.open(to, '_system');
  },
  handleClick() {

    this.props.active = true;
    this.setState({active:true});
    var self = this;
    //check if coordinates for the item are defined and load gmap and place marker
    if(this.props.item.lon && this.props.item.lat)  {   
      GoogleMaps.create({
        name: this.props.item.id,
        element: document.getElementById(this.props.item.id),
        options: {
          center: new google.maps.LatLng( parseFloat(this.props.item.lat),  parseFloat(this.props.item.lon)),
          zoom: 13,
          draggable: false,
          mapTypeControl: false,
          streetViewControl:false
        }
      });
      GoogleMaps.load({ v: '3', key: 'AIzaSyAcuhBx6pL0vDEKp-bFgN8w7k2NxNq35_Y'});
      GoogleMaps.ready(this.props.item.id, function(map) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng( parseFloat(self.props.item.lat),  parseFloat(self.props.item.lon)),
          map: map.instance,
          title: self.props.item.tid
        });
     });
    } else {
      //if no map coordinates are defined, remove the div
      jQuery('#'+this.props.item.id).remove();
    }

  },
  

    render() {


        titleName = this.props.active ? "active title" : "title"
        divName = this.props.active ? "active content" : "content"

        adressClass = this.props.item.adress ? "item" : "item hidden"
        tidClass = this.props.item.tid ? "item" : "item hidden" 
        telClass = this.props.item.tel ? "item" : "item hidden"
        epostClass = this.props.item.epost ? "item " : "item hidden"
        oppetClass = this.props.item.oppet ? "item" : "item hidden"
        webbsidaClass = this.props.item.webbsida ? "item" : "item hidden"
        linkClass = this.props.item.link ? "item" : "item hidden"
        telLink = this.props.item.tel.replace(/ |\.|\-|\(|\)/g,'')//.replace(/-/g,'').replace(/\./g,'').replace(/\(/g,'').replace(/\)/g,'')

    const outsideLink = Meteor.isCordova ? (
        <div className={webbsidaClass}>
                <i className="linkify icon"></i>
                <div className="content">
                <a onClick={this.openLink} href="#">{this.props.item.webbsida}</a>

                </div>
            </div>
    ) : (
        <div className={webbsidaClass}>
                <i className="linkify icon"></i>
                <div className="content">
                <a href={this.props.item.webbsida}>{this.props.item.webbsida}</a>

                </div>
            </div>
    );



    return (

          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

          <span>
            <div className={titleName} onClick = {this.handleClick} >
            <i className="dropdown icon large"></i>
            <div/>{this.props.item.title}
            </div>

            <div className={divName} > 
            <div className="ui list relaxed divided">
            <div className="textClass">
                <div className="content" dangerouslySetInnerHTML={{__html: this.props.item.text }}>
                </div>
                Regioner: {this.props.item.regionlist}<br/>
                Kategorier: {this.props.item.kategorilist}
              </div>

              <div className={adressClass}>
           <div id={this.props.item.id} className="map-container"></div>
            <div className="content">
                {this.props.item.adress}
                </div>
               </div> 
              
              <div className={tidClass}>
                <i className="wait icon"></i>
                <div className="content">
                {this.props.item.tid}
                </div>
              </div>
              
              <div className={telClass}>
                <i className="phone icon"></i>
                <div className="content">
                <a href={'tel://'+telLink}>{this.props.item.tel}</a>

                </div>
              </div>

              <div className={epostClass}>
                <i className="mail icon"></i>
                <div className="content">
                <a href={'mail://'+this.props.item.epost}>{this.props.item.epost}</a>

                </div>
              </div>                

              <div className={oppetClass}>
                <i className="calendar icon"></i>
                <div className="content">
                {this.props.item.oppet}
                </div>
            </div>

              {outsideLink}

              <div className={linkClass}>
                <i className="bookmark icon"></i>
                <div className="content">
                <a href={this.props.item.link}>{this.props.item.link}</a>
                </div>
            </div>

              </div>
            </div>
          </span>
           </ReactCSSTransitionGroup>
       );
    }
});
