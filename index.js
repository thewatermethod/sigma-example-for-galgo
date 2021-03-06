import {data} from './data';
import sigma from "sigma";


sigma.classes.graph.addMethod('neighbors', function(nodeId) {

    var k;
    var neighbors = {};
    var index = this.allNeighborsIndex[nodeId] || {};

    for (k in index){
      neighbors[k] = this.nodesIndex[k];
    }

    return neighbors;
});



const s = new sigma({
    graph: data,
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
		labelThreshold: 1,
        defaultEdgeHoverColor: "#000",
        edgeHoverSizeRatio: 1,
        edgeHoverExtremities: true,
    }
});

s.bind('clickNode', function(e) {
    var nodeId = e.data.node.id;
    var toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = e.data.node;

    s.graph.nodes().forEach(function(n) {
		n.saved_color = n.color;
      if (toKeep[n.id]) {
        n.color = 'tomato';
      } else {
        n.color = '#eee';
      }
    });

    s.graph.edges().forEach(function(e) {
		e.saved_color = e.color;
      if (toKeep[e.source] && toKeep[e.target]) {
        e.color = 'purple';
      } else{ 
        e.color = '#eee';
      }
    });

    // Since the data has been modified, we need to
    // call the refresh method to make the colors
    // update effective.
    s.refresh(); 
  });
  
  s.bind('clickStage', function() {
	  s.graph.nodes().forEach(function(n) {
		  n.color = n.saved_color;
		  });
	  s.graph.edges().forEach(function(e) {
		  e.color = e.saved_color;
		  });
	s.refresh();
  });