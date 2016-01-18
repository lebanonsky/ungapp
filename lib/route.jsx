FlowRouter.route('/path/:pathId', {
  action: function(params, queryParams) {
    const containerElement = document.getElementById("render-target");
    ReactDOM.render(<App _id={params.pathId} />, containerElement);
    console.log(params.pathId + " loaded");
  },
  name: '<path>'
});
