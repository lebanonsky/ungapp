Sidebar = React.createClass({
  render() {
    return (
      <div className="ui vertical inverted sticky menu">
        <div className="item orange"><h3>
        <a href="">Ställ en fråga</a></h3></div>
        <div className="item orange large"><h3>
        <a href="">Regioner</a></h3></div>
        <div className="item orange large"><h3>
        <a href="">Nära dig</a></h3></div>
        <div className="item orange search">
          <i className="search icon left"></i>
          <input placeholder="Sök"></input>
        </div>
      </div>
    );}
});
