// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //METHOD 1, GET THE COLUMNS FROM THE BOARD AND ITERATE
      //var counter = 0;
      // var colIndex = this.get['n'];
      // for( var matrixIdx = 0; matrixIdx < colIndex; matrixIdx++ ){
      //       if ( this.get(rowIndex)[colIndex] === 1 ) ++counter;
      // }
      
      //METHOD 2, GET THE ROWS ON THE BOARD, SELECT THE TARGET ROW AND ITERATE
      //retrieve the current row using rowIndex and rows function; should return an array
      // iterate over the row items and check if there is more than 1
      // var allRows = this.rows();
      // var currentRow = allRows[rowIndex];
      // 
      var counter = 0;
      var currentRow = this.get(rowIndex);
      for ( var idx = 0; idx < currentRow.length; idx++ ){
        if ( currentRow[idx] === 1 ) ++counter;
      }

      return counter > 1; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var idx = this.get('n');

      for( var i = 0; i < idx; i++ ){
        if ( this.hasRowConflictAt(i) ) return true;
      }

      return false;
      //this.callConflictFunction(1);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var allRows = this.rows();
      var counter = 0

      //iterate through the rows and compare the item at the specified index to 1
      //increment if there is a match
      for( var idx = 0; idx < allRows.length; idx++ ){
        if ( allRows[idx][colIndex] === 1) ++counter;
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var idx = this.get('n');

      for( var i = 0; i < idx; i++ ){
        if ( this.hasColConflictAt(i) ) return true;
      }

      return false; 
      //this.callConflictFunction(2);
    },

    // callConflictFunction: function (index){
    //   var idx = this.get('n');

    //   // for( var i = 0; i < idx; i++ ){
    //   //   if ( index === 1){
    //   //     if ( this.hasRowConflictAt(i) ) return true;
    //   //   }else if ( index === 2 ){
    //   //     if ( this.hasColConflictAt(i) ) return true;
    //   //   }
        
    //   // }

    //   if (index === 1){
    //     for( var i = 0; i < idx; i++ ){
    //       if ( this.hasRowConflictAt(i) ) return true;
    //     }
    //   }else {
    //     for( var i = 0; i < idx; i++ ){
    //       if ( this.hasColConflictAt(i) ) return true;
    //     }
    //   }

    //   return false;
    // },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   var allRows = this.rows();
    //   var counter = 0;
    //   var colIndex = majorDiagonalColumnIndexAtFirstRow;
    //   //var n = this.get('n');
    //   var n = allRows[0].length;

    //   //maRowIndex: the number of rows calculating from the top-left
    //   var maxRowIndex = n - colIndex;
    //   //var maxRowIndex = n - (colIndex + 1);

    //   for ( var row = 0; row < maxRowIndex; row++ ){
    //     if ( allRows[row][colIndex] === 1 ) ++counter;

    //     //increment the column
    //     ++colIndex;
    //   }
    //   return counter > 1; // fixme
    // },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var allRows = this.rows();
      var counter = 0;
      var n = allRows[0].length;
      var colIndex, maxRowIndex, row;

      if ( majorDiagonalColumnIndexAtFirstRow > 0 ){
        row = 0;
        colIndex = majorDiagonalColumnIndexAtFirstRow;
        maxRowIndex = n - colIndex;
      }
      else{
        row = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        colIndex = 0;
        maxRowIndex = n;
      }

      for ( row; row < maxRowIndex; row++ ){
        if ( allRows[row][colIndex] === 1 ) ++counter;

        //increment the column
        ++colIndex;
      }
      return counter > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var idx = this.get('n');

      for( var i = 0; i < idx; i++ ){
        if ( this.hasMajorDiagonalConflictAt(i) ) return true;
      }

      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    //   var allRows = this.rows();
    //   var colIndex = minorDiagonalColumnIndexAtFirstRow;
    //   var maxRowIndex = colIndex;
    //   var counter = 0;

    //   for ( var row = 0; row <= maxRowIndex; row++ ){
    //     if (allRows[row][colIndex] === 1 ) ++counter;

    //     //decrement column
    //     --colIndex;
    //   }

    //   return counter > 1;
    // },

     hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var allRows = this.rows();
      var n = allRows[0].length;
      var colIndex, maxRowIndex, row;
      var counter = 0;

      if ( minorDiagonalColumnIndexAtFirstRow >= n){
        maxRowIndex = n-1;
        row = (minorDiagonalColumnIndexAtFirstRow - n) + 1;
        colIndex = n - 1;
      }
      else{
        maxRowIndex = minorDiagonalColumnIndexAtFirstRow;
        colIndex = minorDiagonalColumnIndexAtFirstRow;
        row = 0;
      }

      for ( row; row <= maxRowIndex; row++ ){
        if (allRows[row][colIndex] === 1 ) ++counter;

        //decrement column
        --colIndex;
      }

      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var idx = this.get('n');

      for( var i = 0; i < idx; i++ ){
        if ( this.hasMinorDiagonalConflictAt(i) ) return true;
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
