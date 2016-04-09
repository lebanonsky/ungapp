ContentFrame = React.createClass({

	closeFrame() {
	    jQuery('div#iframe-target').hide();
	  },

	loadFrame() {
		
	  	if(this.props.slug == 'info') {
		     return (<div>
		     <div className="ui fixed menu white right">
		     <i className="chevron left icon" onClick={this.closeFrame}></i>
        </div>
        <iframe src="http://dev.unginfo.fi/om-oss/" ></iframe></div>)
		} else if(this.props.slug == 'fraga') {
			 return (<div>
			 	<div className="ui fixed menu white right">
		     <i className="chevron left icon" onClick={this.closeFrame}></i>
        </div>
        <iframe src="http://fraga.luckan.fi/usp_form/fraga/" ></iframe></div>)
		} else if(this.props.slug == 'chat') {
			return (<div>	  		
				<div className="ui fixed menu white right">
       		     <i className="chevron left icon" onClick={this.closeFrame}></i>
        </div>
        <iframe src="http://svenska.yle.fi/sluta-panta" ></iframe></div>)
		} else if(this.props.slug == 'direkt') {
			return (<div>	  		
				<div className="ui fixed menu white right">
       		     <i className="chevron left icon" onClick={this.closeFrame}></i>
        		</div>
	        <iframe src="http://unginfo.fi/ovriga-tjanster" ></iframe></div>)
		} else {
			return (
			<div className="ui fixed menu white right">
		     <i className="chevron left icon" onClick={this.closeFrame}></i>
        </div>)
		}
	},

  render() {
	  	return (
			this.loadFrame()
		 )
	}
});
