Sidebar = React.createClass({

  regionMenu() {
    data = Region.find().fetch();

    for(let i=0; i<data.length; i++) {

    }

  },

//insert search action

  searchTjanst() {
    $('.ui.sidebar').trigger('search');
   FlowRouter.go('/search/' + $('#searchForm').val());
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
          <i onClick={this.searchTjanst} className="search orange icon left"></i>
          <input id="searchForm" className="orange" placeholder="Sök"></input></div>
      </div>
    );}
});
