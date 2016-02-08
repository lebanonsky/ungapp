Sidebar = React.createClass({
  render() {
    return (
      <div className="ui vertical inverted relaxed sticky menu">
        <div className="item large">
        <h3><a className="orange" href="">Regioner</a></h3></div>
        <div className="item large">
        <h3>
        <a className="orange" href="">Evenemang</a></h3></div>
        <div className="item large">
        <h3>
        <a className="orange" href="">Chat</a></h3></div>
        <div className="item search">
          <i className="search orange icon left"></i>
          <input className="orange" placeholder="Sök"></input></div>
        <div className="item large">
        <h3>        
        <a className="orange" href="">Ställ en fråga</a></h3></div>
      </div>
    );}
});
