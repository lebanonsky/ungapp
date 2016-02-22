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

      <div className="ui icon vertical inverted relaxed sticky menu massive">
        <a className="item massive" href="">
        <i className="huge map icon"></i>
        <h3>Regioner</h3>
        </a>
        <a className="item massive" href="">
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
         <a className="item massive">
        <input id="searchForm" className="black" placeholder="Sök"></input>
          <i onClick={this.searchTjanst} className="search huge icon"></i>
      </a>
      </div>
    );}
});
