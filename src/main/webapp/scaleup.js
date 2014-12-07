(function() {

  var scales = {
    "blues": {0: '1', 3: 'm', 4: '3', 5: '4', 6: 'b', 7: '5', 10: '7'},
    "mixolydic": {0: '1', 2: '2', 3: 'm', 4: '3', 5: '4', 6: 'b', 7: '5', 9: '6', 10: '7'}
  };

  var stringOffsets = [4, -1, -5, 2, -3, 4];

  var noteOffsets = {
    "c": 0,
    "c#": 1,
    "d": 2,
    "d#": 3,
    "e": 4,
    "f": 5,
    "f#": 6,
    "g": 7,
    "g#": 8,
    "a": 9,
    "a#": 10,
    "b": 11
  };

  window.initScaleup = function(tableId, frets, progression) {
    var table = $("#" + tableId);

    var currentChordIndex = 0;

    var showScale = function() {
      var scaleName = progression[currentChordIndex][0];
      table.css("color", progression[currentChordIndex][1]);
      var root = noteOffsets[scaleName.split(" ")[0]];
      var scale = scales[scaleName.split(" ")[1]];

      for (var s = 0; s < 6; s++) {
        var row = $($("tr", table)[s]);
        row.empty();
        var sOffset = stringOffsets[s];
        for (var f = 0; f < frets; f++) {
          var note = ((sOffset - root + f) % 12 + 12) % 12;
          if (scale[note]) {
            row.append("<td><div>" + scale[note] + "</div></td>");
          } else {
            row.append("<td></td>");
          }
        }
      }
    };

    $(document).keydown(function(e) {
      if (e.which === 32) {
        e.preventDefault();
        currentChordIndex = (currentChordIndex + 1) % progression.length;
        showScale();
      }
    });

    showScale();
  }
})();
