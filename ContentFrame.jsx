ContentFrame = React.createClass({


  render() {
  	if(this.props.slug == 'info') {
    	$('#iframe-target').slideToggle();
	    return (
          <iframe src="http://dev.unginfo.fi/om-oss/" ></iframe>
    );
	} else if (this.props.slug == 'fraga') {
    	$('#iframe-target').slideToggle();
		return (
          <iframe src="http://fraga.luckan.fi/usp_form/fraga/" ></iframe>
    );
	} else if (this.props.slug == 'chat') {
		$('#iframe-target').slideToggle();
		return (
          <iframe src="http://svenska.yle.fi/sluta-panta" ></iframe>
    );
	} else {
    	$('#iframe-target').hide();
		return (<iframe />);

	}
}
});
