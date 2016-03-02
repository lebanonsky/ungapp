Sidebar = React.createClass({

//insert search action

  searchTjanst() {
   $('.ui.sidebar').trigger('search');
   FlowRouter.go('/search/' + $('#searchForm').val());
  },


  listRegions() {
    $('.ui.sidebar').trigger('regions');
    FlowRouter.go('/regions');
  },
  listEvenemang() {
    $('.ui.sidebar').trigger('evenemang');
    FlowRouter.go('/evenemang');
  },
/** tähän dymaaninen menu regioneista ja filtteröintiin **/

  render() {
    return (

      <div className="ui icon vertical inverted relaxed sticky menu massive">
        <a className="item massive" href="/regions" onClick={this.listRegions}>
        <i className="huge map icon"></i>
        <h3>Regioner</h3>
        </a>
        <a className="item massive" href="/evenemang" onClick={this.listEvenemang}>
        <i className="huge calendar icon"></i>
        <h3>Evenemang</h3>
        </a>  
        <a className="item massive" href="">
        <i className="huge outline comments icon"></i>
        <h3>Chat</h3>
        </a>
        <a className="item massive" href="">
        <i className="huge help icon"></i>
        <h3>Ställ en fråga</h3>
        </a>
         <a className="item huge">
         <div className="ui input">
        <input id="searchForm" className="ui input" placeholder="Sök"></input>
          </div>
          <i onClick={this.searchTjanst} className="search huge icon"></i>

      </a>
      </div>
    );}
});
