// single item from JSON

Item = React.createClass({
    propTypes: {
        text: React.PropTypes.object.isRequired
    },

    render() {
        console.log("Item.render()");
        return (
            <li>{this.props.item.text}</li>
       );
    }
});
