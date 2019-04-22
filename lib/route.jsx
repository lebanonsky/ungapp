FlowRouter.route('/path/:pathId', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={params.pathId} slug={queryParams.slug} />, containerElement);
    Path.insert({id: params.pathId, slug: queryParams.slug})
    console.log(params.pathId + " loaded with " + queryParams.slug);
  },
  name: '<path>'
});
FlowRouter.route('/search/:searchstring', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={0} searchstring={params.searchstring} slug="search" />, containerElement);
    Path.insert({searchstring: params.searchstring, slug: "search"})
    console.log(params.searchstring + " loaded with");
  },
  name: '<path>'
});
FlowRouter.route('/regions', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={0} slug="regions" />, containerElement);
    Path.insert({slug: "regions"})
  },
  name: '<path>'
});
FlowRouter.route('/categories', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={0} slug="category" />, containerElement);
    Path.insert({slug: "categories"})
  },
  name: '<path>'
});
FlowRouter.route('/evenemang', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={0} slug="evenemang" />, containerElement);
    Path.insert({slug: "evenemang"})
  },
  name: '<path>'
});
FlowRouter.route('/info', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("iframe-target");
    ReactDOM.render(<ContentFrame _id={0} slug="info" />, containerElement);
    Path.insert({slug: "info"})
  },
  name: '<path>'
});
FlowRouter.route('/omoss', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("iframe-target");
    ReactDOM.render(<ContentFrame _id={0} slug="omoss" />, containerElement);
    Path.insert({slug: "omoss"})
  },
  name: '<path>'
});
FlowRouter.route('/fraga', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("iframe-target");
    ReactDOM.render(<ContentFrame _id={0} slug="fraga" />, containerElement);
    Path.insert({slug: "fraga"})
  },
  name: '<path>'
});
FlowRouter.route('/chat', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("iframe-target");
    ReactDOM.render(<ContentFrame _id={0} slug="chat" />, containerElement);
    Path.insert({slug: "chat"})
  },
  name: '<path>'
});
FlowRouter.route('/cal', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("iframe-target");
    ReactDOM.render(<ContentFrame _id={0} slug="cal" />, containerElement);
    Path.insert({slug: "cal"})
  },
  name: '<path>'
});
FlowRouter.route('/direkt', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("iframe-target");
    ReactDOM.render(<ContentFrame _id={0} slug="direkt" />, containerElement);
    Path.insert({slug: "direkt"})
  },
  name: '<path>'
});
FlowRouter.route('/', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={0} slug={null} />, containerElement);
    console.log(params.pathId + " loaded home " + queryParams.slug);

    $('#ungapp').removeClass();
    $('#ungapp').addClass('header pushable home');

  },
  name: '<root>'
});

