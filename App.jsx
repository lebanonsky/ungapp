// App component, called in myapp.jsx

const url = 'http://dev.unginfo.fi/wp-json/wp/v2/tjanst'

let fetched = false;

App = React.createClass({

    // allows us to get data with getMeteorData
    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log("getMeteorData()");
        return {
            items: Items.find({}).fetch()
        }
    },
    
    renderMeteor() {
        console.log("renderMeteor()");
        return this.data.items.map((item) => {
            return <Item key={item._id} item={item} />;
        });
    },

    loadData() {
        console.log("loadData()");
        return fetch('http://dev.unginfo.fi/wp-json/wp/v2/tjanst').then((res) => {
            return res.text();
        });
    },

    getItems() {
        this.loadData().then((res) => {
            let data = JSON.parse(res);
            for(let i=0; i<data.length; i++) {
                this.storeItem({_id:i, text: data[i]['content']['rendered']});
            }
            console.log("logging items");
        });
    },

    storeItem(item) {
        Items.insert({text:item.text, createdAt: new Date()});
    },

    deleteItem(_id) {
        Items.remove(id);
    },

    clearDatabase() {
        {/*DB doesn't empty itself between restarts.
        thus, this should be called on app load
        and then get the newest data. 
        TODO implement
        */}
    },

    render() {
        if(!fetched) { this.getItems(); fetched = true }
        return (
            <div className="container">
                <header>
                    <h1>Items</h1>
                </header>

                <ul>
                    {
                        this.renderMeteor()
                    }
                </ul>
            </div>
       );
    }
});
