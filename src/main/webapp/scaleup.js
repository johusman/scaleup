(function() {

  var scales = {
    "major": {0: '1', 2: '2', 4: '3', 5: '4', 7: '5', 9: '6', 11: '7'},
    "natural minor": {0: '1', 2: '2', 3: '3', 5: '4', 7: '5', 8: '6', 10: '7'},
    "dorian": {0: '1', 2: '2', 3: '3', 5: '4', 7: '5', 9: '6', 10: '7'},
    "minor pentatonic": {0: '1', 3: '3', 5: '4', 7: '5', 10: '7'},
    "major pentatonic": {0: '1', 4: '3', 5: '4', 7: '5', 9: '6'},
    "blues": {0: '1', 3: 'm', 4: '3', 5: '4', 6: 'b', 7: '5', 10: '7'},
    "mixolydian": {0: '1', 2: '2', 4: '3', 5: '4', 7: '5', 9: '6', 10: '7'}
  };

  var stringOffsets = [4, -1, -5, 2, -3, 4];

  var noteOffsets = {
    "C": 0,
    "C#": 1,
    "D": 2,
    "D#": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "G": 7,
    "G#": 8,
    "A": 9,
    "A#": 10,
    "B": 11
  };

  window.initScaleup = function(tableId, frets, progression) {
    var table = $("#" + tableId);
    for (var i = 0; i < 7; i++) {
      table.append("<tr></tr>");
    }

    var currentChordIndex = 0;

    var showScale = function() {
      table.css("color", progression[currentChordIndex].color);
      var scaleName = progression[currentChordIndex].scale;
      var root = noteOffsets[scaleName.split(" ")[0]];
      var scale = scales[scaleName.split(" ")[1]];

      var shadowScale = null;
      var shadowRoot = null;
      if (progression[currentChordIndex].shadow) {
        var shadowName = progression[currentChordIndex].shadow;
        shadowRoot = noteOffsets[shadowName.split(" ")[0]];
        shadowScale = scales[shadowName.split(" ")[1]];
      }
      
      var heading = $($("tr", table)[0]);
      heading.empty();
      var headingText = "";
      for (var c = 0; c < progression.length; c++) {
        if (c !== 0) {
          headingText += " : ";
        }
        if (currentChordIndex === c) {
          headingText += "<span>";
        }
        headingText += progression[c].scale;
        if (currentChordIndex === c) {
          headingText += "</span>";
        }
      }
      heading.append("<th colspan='" + frets + "'>[" + headingText + "]</th>");

      for (var s = 0; s < 6; s++) {
        var row = $($("tr", table)[s+1]);
        row.empty();
        var sOffset = stringOffsets[s];
        for (var f = 0; f < frets; f++) {
          var note = ((sOffset - root + f) % 12 + 12) % 12;
          var shadowNote = shadowScale ? ((sOffset - shadowRoot + f) % 12 + 12) % 12 : null;
          if (scale[note]) {
            var extraClass = shadowScale ? (shadowScale[shadowNote] ? " common" : "") : "";
            row.append("<td><div><span class='note" + scale[note] + extraClass + "'>" + scale[note] + "</span></div></td>");
          } else if (shadowScale && shadowScale[shadowNote]) {
            row.append("<td><div><span class='shadow'>" + shadowScale[shadowNote] + "</span></div></td>");
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
