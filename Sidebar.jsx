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
    $('div#iframe-target').slideDown();
    FlowRouter.go('/info');
  },
  // openOmoss() {
  //   $('.ui.sidebar').sidebar('hide')  
  //   $('.ui.sidebar').trigger('omoss');
  //   $('div#iframe-target').slideDown();
  //   FlowRouter.go('/omoss');
  // },
  // listRegions() {
  //   $('.ui.sidebar').sidebar('hide')  
  //   $('.ui.sidebar').trigger('info');
  //   FlowRouter.go('/regions');
  // },
  // listCategories() {
  //   $('.ui.sidebar').sidebar('hide')  
  //   $('.ui.sidebar').trigger('categories');
  //   FlowRouter.go('/categories');
  // },
  // listEvenemang() {
  //   $('.ui.sidebar').sidebar('hide')  
  //   $('.ui.sidebar').trigger('evenemang');
  //   FlowRouter.go('/evenemang');
  // },
  openChat() {
    $('.ui.sidebar').trigger('chat');
    $('.ui.sidebar').sidebar('toggle')
    FlowRouter.go('/chat');
  },
  openCal() {
    $('.ui.sidebar').sidebar('toggle')  
    $('.ui.sidebar').trigger('cal');
    FlowRouter.go('/cal');
  },
  openOmoss() {
    $('.ui.sidebar').sidebar('toggle')  
    $('.ui.sidebar').trigger('info');
    FlowRouter.go('/omoss');
  },
  openFraga() {
    $('.ui.sidebar').sidebar('toggle')  
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
