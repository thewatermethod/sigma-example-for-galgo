import sigma from "sigma";

  /**
   * This method takes the ID of node as argument and returns the graph of the
   * specified node, with every other nodes that are connected to it and every
   * edges that connect two of the previously cited nodes. It uses the built-in
   * indexes from sigma's graph model to search in the graph.
   *
   * @param  {string} centerId The ID of the center node.
   * @return {object}          The graph, as a simple descriptive object, in
   *                           the format required by the "read" graph method.
   */
   sigma.classes.graph.addMethod(
    'neighborhood',
    function(centerId) {
      var k1,
          k2,
          k3,
          node,
          center,
          // Those two local indexes are here just to avoid duplicates:
          localNodesIndex = {},
          localEdgesIndex = {},
          // And here is the resulted graph, empty at the moment:
          graph = {
            nodes: [],
            edges: []
          };

      // Check that the exists:
      if (!this.nodes(centerId))
        return graph;

      // Add center. It has to be cloned to add it the "center" attribute
      // without altering the current graph:
      node = this.nodes(centerId);
      center = {};
      center.center = true;
      for (k1 in node)
        center[k1] = node[k1];

      localNodesIndex[centerId] = true;
      graph.nodes.push(center);

      // Add neighbors and edges between the center and the neighbors:
      for (k1 in this.allNeighborsIndex[centerId]) {
        if (!localNodesIndex[k1]) {
          localNodesIndex[k1] = true;
          graph.nodes.push(this.nodesIndex[k1]);
        }

        for (k2 in this.allNeighborsIndex[centerId][k1])
          if (!localEdgesIndex[k2]) {
            localEdgesIndex[k2] = true;
            graph.edges.push(this.edgesIndex[k2]);
          }
      }

      // Add edges connecting two neighbors:
      for (k1 in localNodesIndex)
        if (k1 !== centerId)
          for (k2 in localNodesIndex)
            if (
              k2 !== centerId &&
              k1 !== k2 &&
              this.allNeighborsIndex[k1][k2]
            )
              for (k3 in this.allNeighborsIndex[k1][k2])
                if (!localEdgesIndex[k3]) {
                  localEdgesIndex[k3] = true;
                  graph.edges.push(this.edgesIndex[k3]);
                }

      // Finally, let's return the final graph:
      return graph;
    }
  );

  sigma.utils.pkg('sigma.plugins');

  /**
   * sigma.plugins.neighborhoods constructor.
   */
  sigma.plugins.neighborhoods = function() {
    var ready = false,
        readyCallbacks = [],
        graph = new sigma.classes.graph();

    /**
     * This method just returns the neighborhood of a node.
     *
     * @param  {string} centerNodeID The ID of the center node.
     * @return {object}              Returns the neighborhood.
     */
    this.neighborhood = function(centerNodeID) {
      return graph.neighborhood(centerNodeID);
    };

    /**
     * This method loads the JSON graph at "path", stores it in the local graph
     * instance, and executes the callback.
     *
     * @param {string}    path     The path of the JSON graph file.
     * @param {?function} callback Eventually a callback to execute.
     */
    this.load = function(path, callback) {
      // Quick XHR polyfill:
      var xhr = (function() {
        if (window.XMLHttpRequest)
          return new XMLHttpRequest();

        var names,
            i;

        if (window.ActiveXObject) {
          names = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP'
          ];

          for (i in names)
            try {
              return new ActiveXObject(names[i]);
            } catch (e) {}
        }

        return null;
      })();

      if (!xhr)
        throw 'XMLHttpRequest not supported, cannot load the data.';

      xhr.open('GET', path, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          graph.clear().read(JSON.parse(xhr.responseText));

          if (callback)
            callback();
        }
      };

      // Start loading the file:
      xhr.send();

      return this;
    };

    /**
     * This method cleans the graph instance "reads" a graph into it.
     *
     * @param {object} g The graph object to read.
     */
    this.read = function(g) {
      graph.clear().read(g);
    };
  };


const s = new sigma({
    renderer: {
        container: document.getElementById("container"),
        type: "canvas",
    },
    settings: {
        doubleClickEnabled: false,
        minEdgeSize: 0, // 0.5,
        maxEdgeSize: 1, // 4,
        enableEdgeHovering: true,
        edgeHoverColor: "edge",
        defaultEdgeHoverColor: "#000",
        edgeHoverSizeRatio: 1,
        edgeHoverExtremities: true,
    }
});

const db = new sigma.plugins.neighborhoods();

db.load('data.json', function() {
    // Out function to initialize sigma on a new neighborhood:
    function refreshGraph(centerNodeId) {

      // Restart the camera:
      s.camera.goTo({
        x: 0,
        y: 0,
        angle: 0,
        ratio: 1
      });

      // Empty the graph:
      s.graph.clear();

      // Read the graph:
      s.graph.read(db.neighborhood(centerNodeId));

      // Randomize the positions of the nodes and initialize their size:
      var i,
          nodes = s.graph.nodes(),
          len = nodes.length;

      for (i = 0; i < len; i++) {
        nodes[i].x = Math.cos(Math.PI * 2 * i / len);
        nodes[i].y = Math.sin(Math.PI * 2 * i / len);
      }

      // Refresh the display:
      s.refresh();
 
    }

    // Let's now bind this new function to the "clickNode" event:
    s.bind('clickNode', function(event) {
      if (!event.data.node.center)
        refreshGraph(event.data.node.id);
    });

    // And finally, let's initialize the first graph:
    refreshGraph('Honra');
});