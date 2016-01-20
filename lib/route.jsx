FlowRouter.route('/path/:pathId', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={params.pathId} slug={queryParams.slug} />, containerElement);
    console.log(params.pathId + " loaded with" + queryParams.slug);
  },
  name: '<path>'
});
