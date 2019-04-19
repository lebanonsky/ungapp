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
//    #b9dce0
// style={{backgroundColor:'#b9dce0'}}
// #254fbf
// style={{backgroundColor:'#254fbf'}}
// #eff1e4
// style={{backgroundColor:'#eff1e4'}}
// #fcb9e5
// style={{backgroundColor:'#fcb9e5'}}

   <div className="ui equal width padded center aligned grid container" id="splash" style={{fontSize:'12px', width:'auto !important'}}>
<div className="row" style={{padding:0,margin:0}}>
  <div className="column sixteen wide" style={{padding:0,margin:0,backgroundColor:'#eff1e4'}}>
  <img src="/img/unginfo-banner.jpg" /></div>
  </div>
  <div className="row" style={{paddingTop:0, backgroundColor:'#eff1e4'}}>
  <div className="column sixteen wide" style={{backgroundColor:'#eff1e4'}}>
  <div style={{backgroundColor:'#eff1e4', fontSize:'14px'}}>Var kan jag få hjälp</div>
  Här hittar du länkar till olika svenskspråkiga tjänster dun kan använda dig av och kontakta i olika frågor som berör ditt liv.
  </div>
  </div>
    <div className="row">
  <div className="column" style={{backgroundColor:'#b9dce0'}}><i><b>Ärligt talat - chat</b><br/>
  Chatta med psykolog och andra sakkunniga om det som är viktigt för dig. 
Måndagar, tisdagar och torsdagar kl. 19-22</i><br/>
<button className="ui button ">
  <a href='https://arligttalat.fi/'>Läs mera</a>
</button>
</div>
  <div className="column" style={{backgroundColor:'#254fbf',color:'#ffffff'}}><i><b>Våga Fråga</b><br/>
Skicka en fråga anonymt över nätet om det du behöver få svar på. </i><br/>
<button className="ui button">
  <a href='https://www.decibel.fi/vaga-fraga/'>Läs mera</a>
</button>
</div>
</div>  <div className="row">
  <div className="column" style={{backgroundColor:'#fcb9e5'}}><i><b>Du är inte ensam</b><br/>
Chat på svenska torsdagar kl. 14:00-17:30 för dig som upplevt osakligt beteende eller trakasserier inom idrotten.
</i><br/>
<button className="ui button ">
  <a href='https://etoleyksin.fi/sv/etusivu-hemsida/'>Läs mera</a>
</button>
</div>
  <div className="column" style={{backgroundColor:'#b9dce0'}}><i><b>Krisjouren för unga</b><br/>
Jourtelefon måndagar kl. 9.00-11.00,
tisdagar, onsdagar och torsdagar kl. 9.00–12.00
 </i><br/>
<button className="ui button">
  <a href='https://www.helsingforsmission.fi/ungdomar'>Läs mera</a>
</button>
</div>
</div>  <div className="row">
  <div className="column" style={{backgroundColor:'#254fbf',color:'#ffffff'}}><i><b>Kyrkans samtalstjänst</b><br/>
Telefonjour 0400 22 11 90, alla dagar kl. 20-23. Chat måndag-torsdag kl. 19-21
</i><br/>
<button className="ui button ">
  <a href='http://www.samtalstjanst.fi/'>Läs mera</a>
</button>
</div>
  <div className="column" style={{backgroundColor:'#eff1e4'}}><i><b>Livslust-projektet</b><br/>
Rådgivning per telefon  måndag-fredag  050 522 0077 kl 9-16
</i><br/>
<button className="ui button">
  <a href='https://www.syomishairiokeskus.fi/uusi/sv/livslust-projektet/'>Läs mera</a>
</button>
</div>
</div>
  <div className="row">
  <div className="column" style={{backgroundColor:'#b9dce0'}}><i><b>Peluuri</b><br/>
Anonym och kostnadsfri hjälplinje tel. 0800 100 101 när spelande börjar gå eller redan har gått över styr. Garanterad svenskspråkig service måndagar kl. 12-18. 
</i><br/>
<button className="ui button ">
  <a href='https://peluuri.fi/sv/spelare'>Läs mera</a>
</button>
</div>
  <div className="column" style={{backgroundColor:'#fcb9e5'}}><i><b>Penno</b><br/>
Hjälper dig att ha koll på och planera din ekonomi. 
</i><br/>
<button className="ui button">
  <a href='https://www.penno.fi/home'>Läs mera</a>
</button>
</div>
</div>
  <div className="row">
  <div className="column" style={{backgroundColor:'#254fbf',color:'#ffffff'}}><i><b>Pojkarnas telefon & chat</b><br/>
Ring 0800 94884 tisdagar kl. 15.30-18.00 och torsdagar 13.00-15.30
Chat på svenska onsdagar 13-15
Samtalsjour och chat för alla som identifierar sig som pojkar och unga män under 20 år. 
</i><br/>
<button className="ui button ">
  <a href='http://www.vaestoliitto.fi/vaestoliitto/mita_vaestoliitto_tekee/palvelut/puhelinneuvonta/poikien_puhelin/pojkarnas-telefon-nu-aven-pa-sve/'>Läs mera</a>
</button>
</div>
  <div className="column" style={{backgroundColor:'#eff1e4'}}><i><b>Studera i Helsingfors</b><br/>
Projektet Helsingforsalliansen erbjuder vägledning - chat, e-post, face to face, skype - för alla som är intresserade av att studera på svenska i Helsingfors. 
</i><br/>
<button className="ui button">
<a href='http://www.studeraihelsingfors.fi/'>  Läs mera</a>
</button>
</div>
</div>
  <div className="row">
  <div className="column" style={{backgroundColor:'#fcb9e5'}}><i><b>Studieinfo</b><br/>
Portalen där finländska läroanstalter och högskolor uppdaterar uppgifterna om sina egna utbildningar. 
</i><br/>
<button className="ui button ">
  <a href='https://studieinfo.fi/wp/sv/'>Läs mera</a>
</button>
</div>
  <div className="column" style={{backgroundColor:'#b9dce0'}}><i><b>UngInfo</b><br/>
  Kolla också andra stödtjänster på din hemort 
</i><br/>
<button className="ui button" onClick={this.closeFrame}>
  <a href='#'>Läs mera</a>
</button>
</div>
</div>
  <div className="row">
  <div className="column" style={{backgroundColor:'#eff1e4'}}>
  <i>Tjänsten upprätthälls av Luckan Unginfo</i>
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
