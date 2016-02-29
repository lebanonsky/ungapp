// single item from JSON



Article = React.createClass({
    propTypes: {
    },

    componentDidMount() {
      jQuery('.ui .accordion').accordion();
    },

    handleClick() {
      this.props.active = true;
      this.setState({active:true});
      console.log(this.props.item.id);

    GoogleMaps.create({
      name: this.props.item.id,
      element: document.getElementById(this.props.item.id),
      options: {
        center: new google.maps.LatLng( 60.170014,  24.938466),
        zoom: 8
      }});


    },

    render() {

        titleName=this.props.active ? "active title" : "title"
        divName=this.props.active ? "active content" : "content"

        return (
        	<span>
            <h2 className={titleName} onClick = {this.handleClick} >
            <i className="dropdown icon large"></i>
            {this.props.item.title} 
            &ndash;
            <div dangerouslySetInnerHTML={{__html: this.props.item.text }} /> 
            </h2>
            <div className={divName} > 
            <div className="ui list relaxed divided">
              <div className="item">
                <i className="map icon"></i>
         <div id={this.props.item.id} className="map-container">
  </div>
          <div className="content">

                {this.props.item.adress}
                </div>
               </div> 
              
              <div className="item">
                <i className="wait icon"></i>
                <div className="content">
                {this.props.item.tid}
                </div>
              </div>
              
              <div className="item">
                <i className="phone icon"></i>
                <div className="content">
                {this.props.item.tel}
                </div>
              </div>

              <div className="item">
                <i className="mail icon"></i>
                <div className="content">
                {this.props.item.epost}
                </div>
              </div>                

              <div className="item">
                <i className="calendar icon"></i>
                <div className="content">
                {this.props.item.oppet}
                </div>
            </div>

              <div className="item">
                <i className="linkify icon"></i>
                <div className="content">
                {this.props.item.webbsida}
                </div>
            </div>

              <div className="item">
                <i className="bookmark icon"></i>
                <div className="content">
                {this.props.item.link}
                </div>
            </div>

              </div>
            </div>
          </span>
       );
    }
});
