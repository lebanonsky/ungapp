Sidebar = React.createClass({

//insert search action

  sendform(e) {
    if (e.which && e.which == 13) {
        $('.ui.sidebar').trigger('search');
        FlowRouter.go('/search/' + $('#searchForm').val());  
        return false;
    } else {
        return true;
      }
    },

  searchTjanst() {
   $('.ui.sidebar').trigger('search');
   $('.ui.sidebar').sidebar('hide')  
   FlowRouter.go('/search/' + $('#searchForm').val());
  },
  openInfo() {
    $('.ui.sidebar').sidebar('hide')  
    $('.ui.sidebar').trigger('info');
    $('div#iframe-target').slideToggle();
    FlowRouter.go('/info');
  },
  openOmoss() {
    $('.ui.sidebar').trigger('omoss');
    $('div#iframe-target').slideToggle();
    FlowRouter.go('/omoss');
  },
  listRegions() {
    $('.ui.sidebar').trigger('info');
    FlowRouter.go('/regions');
  },
  listCategories() {
    $('.ui.sidebar').trigger('categories');
    FlowRouter.go('/categories');
  },
  listEvenemang() {
    $('.ui.sidebar').trigger('evenemang');
    FlowRouter.go('/evenemang');
  },
  openChat() {
    $('.ui.sidebar').sidebar('hide')  
    $('.ui.sidebar').trigger('chat');
    FlowRouter.go('/chat');
  },
  openCal() {
    $('.ui.sidebar').sidebar('hide')  
    $('.ui.sidebar').trigger('cal');
    console.log('xxx')
    FlowRouter.go('/cal');
  },
  openOmoss() {
    $('.ui.sidebar').trigger('info');
    FlowRouter.go('/omoss');
  },
  openFraga() {
    $('.ui.sidebar').sidebar('hide')  
    $('.ui.sidebar').trigger('fraga');
    FlowRouter.go('/fraga');
  },
  
  
  render() {
    return (

      <div className="ui icon vertical inverted relaxed sticky menu massive">

        <a className="item huge 2-col" href="/fraga" onClick={this.openInfo}>
        <h1>INFO</h1>
        </a>

        <a className="item massive 1-col" href="/evenemang" onClick={this.openCal}>
        <img src="/img/evenemang.png" />
        <h3>Evenemang</h3>
        </a>  
        <a className="item massive 1-col" href="/chat" onClick={this.openChat}>
        <img src="/img/chat.png" id="chat_menu"/>
        <h3>Chat</h3>
        </a>
        <a className="item huge 2-col" href="/fraga" onClick={this.openFraga}>
        <img src="/img/fraga_logo.png" id="fraga_menu"/>
        </a>
         <a className="item huge 2-col">
         <div className="ui input">
            <input id="searchForm" className="ui input" onKeyPress={this.sendform} placeholder=""></input>
          </div>
        </a>
      </div>
    );}
});
