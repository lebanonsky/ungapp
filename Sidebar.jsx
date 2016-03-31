Sidebar = React.createClass({

//insert search action

  sendform(e) {
        //console.log(e.which);
    if (e.which && e.which == 13) {
        FlowRouter.go('/search/' + $('#searchForm').val());  
      }
      return true;
    },

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
/** tähän dynaaminen menu regioneista ja filtteröintiin **/

  render() {
    return (

      <div className="ui icon vertical inverted relaxed sticky menu massive">
        <a className="item massive" href="/regions" onClick={this.listRegions}>
        <img src="/img/regioner.png" />
        <h3>Regioner</h3>
        </a>
        <a className="item massive" href="/evenemang" onClick={this.listEvenemang}>
        <img src="/img/evenemang.png" />
        <h3>Evenemang</h3>
        </a>  
        <a className="item massive" href="/chat">
        <img src="/img/chat.png" id="chat_menu"/>
        <h3>Chat</h3>
        </a>
        <a className="item massive" href="/fraga">
        <img src="/img/fraga_logo.png" id="fraga_menu"/>
        </a>
         <a className="item huge">
         <div className="ui input">
        <input id="searchForm" className="ui input" onKeyPress={this.sendform} placeholder=""></input>
          </div>
        </a>
      </div>
    );}
});
