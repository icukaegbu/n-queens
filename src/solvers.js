/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = makeNSolution(n, 'rook');

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  
  // var solution = new Board(makeZerosMatrix(n)); //fixme
  // var counter = 1;

  // //create an Board of nxn
  // //
  // //run through the Board matrix
  // ////for each location, insert a rook
  // ///insert the first rook at [0,0]
  // while( counter <= n ){
  //   for ( var rowIndex = 0; rowIndex < n; rowIndex++ ){
  //     for (var colIndex = 0; colIndex < n; colIndex++ ){
  //       //insert an element at the position
  //       // solution[rowIndex][colIndex] = 1;
  //       // if ( solution.hasAnyRookConflicts() ) {
  //       //   solution[rowIndex][colIndex] = 0;
  //       // } 
  //       solution.attributes[rowIndex][colIndex] = 1;
  //       if ( solution.hasAnyRooksConflicts() ) {
  //         solution.attributes[rowIndex][colIndex] = 0;
  //       } 
  //       else{
  //         ++counter;
  //       }
  //     }
  //   }

  // }

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = makeNSolution(n, 'queens');

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


//helper function
window.makeZerosMatrix = function(n) {
  var matrix = [];
  for( var i = 0; i < n; i++ ){
    var innerMatrix = [];
    for ( var j = 0; j < n; j++ ){
      innerMatrix[j] = 0;
    }
    matrix[i] = innerMatrix;
  }

  return matrix;
};

window.makeNSolution = function(n, type){
  var board = new Board(makeZerosMatrix(n)); //fixme
  var counter = 1, revertOrAdd = false;

  //run through the Board matrix
  ////for each location, insert a rook
  ///insert the first rook at [0,0]
  while( counter <= n ){
    for ( var rowIndex = 0; rowIndex < n; rowIndex++ ){
      for (var colIndex = 0; colIndex < n; colIndex++ ){
        
        board.attributes[rowIndex][colIndex] = 1;

        if ( type === 'rook') {
          revertOrAdd = board.hasAnyRooksConflicts();
        }else if ( type === 'queens'){
          revertOrAdd = board.hasAnyQueensConflicts();
        }
        
        //if true ie there was conflict, revert
        if ( revertOrAdd ) {
          board.attributes[rowIndex][colIndex] = 0;
        } 
        else{
          ++counter;
        }
      }
    }

  }

  return board.attributes;
}