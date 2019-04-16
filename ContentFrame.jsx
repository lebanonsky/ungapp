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
        <iframe src="http://ungdomsakademin.fi/appen/" ></iframe></div>)

		} else if(this.props.slug == 'omoss') {
			 return (<div>
			 	<div className="ui fixed menu white right" onClick={this.closeFrame}>
		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        </div>
        <iframe src="https://dev.unginfo.fi/om-oss" ></iframe></div>)

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
	        <iframe src="https://dev.unginfo.fi/ovriga-tjanster" ></iframe></div>)

	    } else if(this.props.slug == 'cal') {

			return (<div>	  		
				<div className="ui fixed menu white right" onClick={this.closeFrame}>
       		     <i className="chevron left icon" > </i> <div>Tillbaka</div>
        		</div>
	        <iframe src="http://ungdomsakademin.fi/kalender/" ></iframe></div>)

		} else {
			return (
			// <div className="ui fixed menu white right" onClick={this.closeFrame}>
		 //     <i className="chevron left icon" > </i> <div>Tillbaka</div>
   //      	</div>
   <div className="ui equal width padded center aligned grid container" id="splash" style={{fontSize:'12px', width:'auto !important'}}>
<div className="row" style={{padding:0,margin:0}}>
  <div className="teal column sixteen wide" style={{padding:0,margin:0}}>
  <img src="/img/unginfo-banner.jpg" /></div>
  </div>
  <div className="row" style={{paddingTop:0}}>
  <div className="blue column sixteen wide">Ja tähän Sebbe kirjoitti jonkun kivan tekstin...</div>
  </div>
    <div className="row">
  <div className="teal column"><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  Läs mera
</button>
</div>
  <div className="blue column"><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  Läs mera
</button>
</div>
</div>  <div className="row">
  <div className="teal column"><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  Läs mera
</button>
</div>
  <div className="blue column"><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  Läs mera
</button>
</div>
</div>  <div className="row">
  <div className="teal column"><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  Läs mera
</button>
</div>
  <div className="blue column"><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  Läs mera
</button>
</div>
</div>
  <div className="row">
  <div className="teal column"><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  Läs mera
</button>
</div>
  <div className="blue column"><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  Läs mera
</button>
</div>
</div>
  <div className="row">
  <div className="teal column"><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  Läs mera
</button>
</div>
  <div className="blue column"><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  Läs mera
</button>
</div>
</div>
  <div className="row">
  <div className="teal column"><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  Läs mera
</button>
</div>
  <div className="blue column"><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  Läs mera
</button>
</div>
</div>
  <div className="row">
  <div className="column">
  <i>Luckan info ...</i>
  </div>
</div>
</div>
        )
		}
	},

  render() {
	  	return (
			this.loadFrame()

		 )
	}
});
