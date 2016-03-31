ContentFrame = React.createClass({


  render() {
  	if(this.props.slug == 'info') {
    return (
          <iframe src="http://dev.unginfo.fi/om-oss/" ></iframe>
    );
	} else if (this.props.slug == 'fraga') {
	return (
          <iframe src="http://fraga.luckan.fi/usp_form/fraga/" ></iframe>
    );
	} else if (this.props.slug == 'chat') {
	return (
          <iframe src="http://svenska.yle.fi/sluta-panta" ></iframe>
    );
	} else {

	return
	}
}
});
