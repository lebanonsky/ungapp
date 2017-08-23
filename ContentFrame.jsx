ContentFrame = React.createClass({

	closeFrame() {
	    $('div#iframe-target').hide();
		$('div#render-target').show();
	    FlowRouter.go('/');
	  },

	loadFrame() {

	  	if(this.props.slug == 'info') {
		     return (<div>
		     <div className="ui fixed menu white right" onClick={this.closeFrame}>
		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        </div>
        <iframe src="http://dev.unginfo.fi/appinfo/" ></iframe></div>)

		} else if(this.props.slug == 'omoss') {
			 return (<div>
			 	<div className="ui fixed menu white right" onClick={this.closeFrame}>
		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        </div>
        <iframe src="http://dev.unginfo.fi/om-oss" ></iframe></div>)

		} else if(this.props.slug == 'fraga') {
			 return (<div>
			 	<div className="ui fixed menu white right" onClick={this.closeFrame}>
		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        </div>
        <iframe src="http://ungdomsakademin.fi/stall-fraga/" ></iframe></div>)
		} else if(this.props.slug == 'chat') {
			return (<div>	  		
				<div className="ui fixed menu white right" onClick={this.closeFrame}>
       		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        </div>
        <iframe src="https://ninchat.s3.amazonaws.com/b/yle/luckan/app.html" ></iframe></div>)
			
		} else if(this.props.slug == 'direkt') {
			return (<div>	  		
				<div className="ui fixed menu white right" onClick={this.closeFrame}>
       		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        		</div>
	        <iframe src="http://dev.unginfo.fi/ovriga-tjanster" ></iframe></div>)

	    } else if(this.props.slug == 'cal') {

			return (<div>	  		
				<div className="ui fixed menu white right" onClick={this.closeFrame}>
       		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        		</div>
	        <iframe src="http://dev.unginfo.fi/evenemang/" ></iframe></div>)

		} else {
			return (
			<div className="ui fixed menu white right" onClick={this.closeFrame}>
		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        </div>)
		}
	},

  render() {
	  	return (
			this.loadFrame()
		 )
	}
});
