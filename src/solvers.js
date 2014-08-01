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
  var solutionCount = countNSolution(n, 'rooks');

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
  var solutionCount = countNSolution(n, 'queens');

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
  var counter = 0, revertOrAdd = false; //counter = 1, noOfIterations = 0;


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
          counter++;
        }
      }
    }
  
  board.attributes["counter"] = counter;
  return board.attributes;
}


window.countNSolution = function(n, type) {
  var solutionCount = 0;
  var type = type;

  var board = new Board({n:n});

  var findSolution = function(board, cols, row){
    if( row === cols ){
      solutionCount++;
      return;
    }

    if ( type === 'rooks' ) {
      for( var i = 0; i < cols; i++){
        board.togglePiece(row, i);

        if( !board.hasAnyRooksConflicts() ){
          findSolution(board, cols, row+1);
        }

        board.togglePiece(row, i);
      }
    }
    else if ( type === 'queens' ){
      for( var i = 0; i < cols; i++){
        board.togglePiece(row, i);

        if( !board.hasAnyQueensConflicts() ){
          findSolution(board, cols, row+1);
        }

        board.togglePiece(row, i);
      }
    }

    
  };

  findSolution(board, n, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// //WORKING CODE
// window.makeNSolution = function(n, type){
//   var board = new Board(makeZerosMatrix(n)); //fixme
//   var counter = 0, revertOrAdd = false; //counter = 1

//   //run through the Board matrix
//   ////for each location, insert a rook
//   ///insert the first rook at [0,0]
//   while( counter < n ){
//     for ( var rowIndex = 0; rowIndex < n; rowIndex++ ){
//       for (var colIndex = 0; colIndex < n; colIndex++ ){

//         board.attributes[rowIndex][colIndex] = 1;

//         if ( type === 'rook') {
//           revertOrAdd = board.hasAnyRooksConflicts();
//         }else if ( type === 'queens'){
//           revertOrAdd = board.hasAnyQueensConflicts();
//         }
        
//         //if true ie there was conflict, revert
//         if ( revertOrAdd ) {
//           board.attributes[rowIndex][colIndex] = 0;
//         } 
//         else{
//           ++counter;
//         }

//       }
//     }
//   }
  

//   return board.attributes;
// }