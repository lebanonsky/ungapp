// single item from JSON

Article = React.createClass({
    propTypes: {
    },

    componentDidMount() {
      jQuery('.ui .accordion').accordion();
    },

    handleClick() {
      this.props.active = true;
      this.setState({active:true})
    },

    render() {
        console.log("Article.render()");
        titleName=this.props.active ? "active title" : "title"
        divName=this.props.active ? "active content" : "content"
        return (
        	<span>
            <h2 className={titleName} onClick = {this.handleClick} >
                <i className="dropdown icon"></i>
              {this.props.item.title}</h2>
            <div className={divName} > 
            <div dangerouslySetInnerHTML={{__html: this.props.item.text }} />

            <div class="ui list relaxed divided">
              <div class="item">
                <i class="map icon"></i>
                <div class="content">
                {this.props.item.adress}
                </div>
               </div> 
              
              <div class="item">
                <i class="wait icon"></i>
                <div class="content">
                {this.props.item.tid}
                </div>
              </div>
              
              <div class="item">
                <i class="phone icon"></i>
                <div class="content">
                {this.props.item.tel}
                </div>
              </div>

              <div class="item">
                <i class="mail icon"></i>
                <div class="content">
                {this.props.item.epost}
                </div>
              </div>                

              <div class="item">
                <i class="calendar icon"></i>
                <div class="content">
                {this.props.item.oppet}
                </div>
            </div>

              <div class="item">
                <i class="linkify icon"></i>
                <div class="content">
                {this.props.item.webbsida}
                </div>
            </div>

              <div class="item">
                <i class="bookmark icon"></i>
                <div class="content">
                {this.props.item.link}
                </div>
            </div>

              </div>
            </div>
          </span>
       );
    }
});
