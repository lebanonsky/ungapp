Sidebar = React.createClass({
  render() {
    return (
      <div className="ui vertical inverted sticky menu">
        <div className="item orange"><h3>Ställ en fråga</h3></div>
        <div className="item orange large"><h3>Regioner</h3></div>
        <div className="item orange large"><h3>Nära dig</h3></div>
        <div className="item orange">
          <i className="search icon inverted left"></i>
          <input placeholder="Sök"></input>
        </div>
      </div>
    );}
});
