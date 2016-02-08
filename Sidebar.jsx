Sidebar = React.createClass({

  regionMenu() {
    data = Region.find().fetch();

    for(let i=0; i<data.length; i++) {

    }

  },

/** tähän dymaaninen menu regioneista ja filtteröintiin **/

  render() {
    return (
      <div className="ui vertical secondary inverted large relaxed sticky menu">
        <div className="ui dropdown item large">
        <i className="dropdown icon"></i>
        Regioner
            <div className="menu">
            <a className="item">ek</a>
            <a className="item">tok</a>
            <a className="item">kol</a>
            </div>
        </div>
        <x>
        <a className="orange item large" href="">Evenemang</a>  
        <a className="orange item large" href="">Chat</a>
        <a className="orange item large" href="">Ställ en fråga</a>
        </x>
         <div className="item search large">
          <i className="search orange icon left"></i>
          <input className="orange" placeholder="Sök"></input></div>
      </div>
    );}
});
