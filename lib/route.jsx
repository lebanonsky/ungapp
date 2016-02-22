FlowRouter.route('/path/:pathId', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={params.pathId} slug={queryParams.slug} />, containerElement);
    Path.insert({id: params.pathId, slug: queryParams.slug})
    console.log(params.pathId + " loaded with" + queryParams.slug);
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
FlowRouter.route('/', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={0} slug={null} />, containerElement);
    console.log(params.pathId + " loaded with" + queryParams.slug);
  },
  name: '<root>'
});

