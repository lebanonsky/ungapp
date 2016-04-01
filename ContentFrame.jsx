ContentFrame = React.createClass({

	loadFrame() {

	  	if(this.props.slug == 'info') {
		     return (<div>
		     <div className="ui fixed menu white left">
            <i  onClick={this.toggleSidebar} className="sidebar white icon big"></i>
            <a href="/info" onClick={this.openInfo}>
            <img src="/img/Ungapp_unginfologo.png" className="right" id="top_logo"/>
            </a>
        </div>
        <iframe src="http://dev.unginfo.fi/om-oss/" ></iframe></div>)
		} else if(this.props.slug == 'fraga') {
			 return (<div>
			 	<div className="ui fixed menu white left">
            <i  onClick={this.toggleSidebar} className="sidebar white icon big"></i>
            <a href="/info" onClick={this.openInfo}>
            <img src="/img/Ungapp_unginfologo.png" className="right" id="top_logo"/>
            </a>
        </div>
        <iframe src="http://fraga.luckan.fi/usp_form/fraga/" ></iframe></div>)
		} else if(this.props.slug == 'chat') {
			return (<div>	  		
				<div className="ui fixed menu white left">
            <i  onClick={this.toggleSidebar} className="sidebar white icon big"></i>
            <a href="/info" onClick={this.openInfo}>
            <img src="/img/Ungapp_unginfologo.png" className="right" id="top_logo"/>
            </a>
        </div>
        <iframe src="http://svenska.yle.fi/sluta-panta" ></iframe></div>)
		} else {
			return (
			<div className="ui fixed menu white left">
            <i  onClick={this.toggleSidebar} className="sidebar white icon big"></i>
            <a href="/info" onClick={this.openInfo}>
            <img src="/img/Ungapp_unginfologo.png" className="right" id="top_logo"/>
            </a>
        </div>)
		}
	},

  render() {
	  	return (
		this.loadFrame()
		 )
	}
});
