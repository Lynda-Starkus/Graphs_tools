$matrixAdj = [];
$nbSommets= 5;
$vertexes=[];
$nbCc=0;
$Nodes=[];

var $cy;
$(document).ready(function(){
  $('#genSommets').keypress(function (e) {
   var key = e.which;
   if(key == 13)  // the enter key code 
    {
      $nbSommets= i=$("#genSommets").val();
      initMatrix();
      createNodes();
      initGraph();
    }
  });

  $('#sommetDest').keypress(function (e) {
   var key = e.which;
   if(key == 13)  // the enter key code
    {
      var i,j;
       i=$("#sommetSource").val();
       j=$("#sommetDest").val();
        $matrixAdj[i-1][j-1]=1;
        $matrixAdj[j-1][i-1]=1;
        updateEdges(i,j);
    }
  });
  $('#sommetDestSupp').keypress(function (e) {
    var keySupp = e.which;
    if(keySupp == 13)  // the enter key code
     {
       var k,l;
        k=$("#sommetSourceSupp").val();
        l=$("#sommetDestSupp").val();
         $matrixAdj[k-1][k-1]=0;
         $matrixAdj[l-1][l-1]=0;
         updateEdgesSupp(k,l);
     }
   });
  $("#valider").click(function(){
    initVertexes();
    $nbCc=NCC(-1); //Nomre de compasantes connexes au départ
      articulationPoints();

  });
});
function initMatrix(){
  var i,j;
 for(i = 0; i < $nbSommets; i++){
     $matrixAdj[i] = [];
     for(j = 0; j < $nbSommets; j++){
        {$matrixAdj[i][j] = 0;
        }
     }
 }
}
function initVertexes(){
  var i=0;
  $vertexes=[];
  for (i=0;i<$nbSommets;i++)
  $vertexes[i]=false;
}
function DFS($vertex,$vertexNotV){
  var pile=[];
  pile.push($vertex);
  var i;
  while (pile.length>0)
    {
        // pop
        $vertex=pile.pop();
        if ($vertexes[$vertex]==false){
           $vertexes[$vertex]=true;//Visited
           for (i=0;i<$vertexes.length;i++)
           {
             if (i!=$vertexNotV)
               if($matrixAdj[$vertex][i]==1)
                if($vertexes[i]==false){
                   pile.push(i);
                 }
           }
         }
    }
}
function NCC($vertexNotV){
   var nbCCtmp=0;
   var i;
   for(i=0;i<$vertexes.length;i++)
     if(i!=$vertexNotV)
       if($vertexes[i]==false)
        {
          DFS(i,$vertexNotV);
         nbCCtmp++;
       }
        return nbCCtmp;
}
function articulationPoints(){
  var i;
  var k=0;
  for (i=0;i<$vertexes.length;i++)
    {
      initVertexes();
      var tmpCC=NCC(i);
      if (tmpCC>$nbCc)
         { 
           console.log(i);
           ColorArtPoit(i);//Attribuer une couleur au point d
           k++;
         }
    }
}
function createNodes(){
    $Nodes=[]; //Initialize Nodes Matrix
   
    for (var i = 0; i<$nbSommets; i++) {
        $Nodes.push({
            data: {
                id: i+1,
                name:i+1
            }
        });
    }
}
function updateEdges(sommetSource,sommetDest){
  $cy.add({
    group: "edges",
    data: {source:sommetSource,
    target:sommetDest },
});
}


function initGraph(){
  var Style =  cytoscape.stylesheet().selector('node').css({
    'background-color': '#ff9527',
    'label': 'data(id)',
    'color':'#ffffff'
      }).selector('edge').css({
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      })
 $cy=cytoscape({
   container: $('#graph-container'),
    elements:{
       nodes: $Nodes,
    },
    style:Style,
    layout: {
      name: 'random',
    },
 });
}
function ColorArtPoit($i){
    $cy.nodes()[$i].css({
    'background-color': '#279F9D'
     });
}
