'use strict';

(function() {

  var util = {
    rand: function(n){
        return Math.floor(Math.random() * n) + 1;
    },
    insertText: function (t) {
      $s.insertAdjacentHTML('beforeend', '<p class="m-t-10">'+ t +'</p>');
    }
  }

  {
    var PROGRESS = 0,
    POSITION_X = util.rand(10),
    POSITION_Y = util.rand(10),
    GOAL_X = util.rand(10),
    GOAL_Y = util.rand(10)
  }

  var $s = document.getElementById('status');

  var module = {
    status: {
      x: POSITION_X,
      y: POSITION_Y,
      progress: PROGRESS,
    },
    goal: {
      x: GOAL_X,
      y: GOAL_Y,
    },
    init: function () {
      console.log("loading...");
      console.log("status: ", module.status);
      console.log("goal: ", module.goal);

      var isStatusAndGoalSame = (module.status.x === module.goal.x
                                  && module.status.y === module.goal.y)


      console.log("isStatusAndGoalSame: ", isStatusAndGoalSame);
      if (isStatusAndGoalSame) {
        alert("今の位置とゴールが同じなので、もう一度読み込みます。")
        location.reload();
      }

    }
  }

  module.changeStatus = function (x, y) {

    module.status.x += x;
    module.status.y += y;

    console.log(module.status);
  }

  document.onkeydown = function (e) {
      e = e || window.event;

      if (e.keyCode == '38') {
          // up arrow
          console.log("up arrow");
          module.changeStatus(1, 0);
          util.insertText('前に進みました。');
      }
      else if (e.keyCode == '40') {
          // down arrow
          console.log("down arrow");
          module.changeStatus(-1, 0);
          util.insertText('戻りました。');
      }
      else if (e.keyCode == '37') {
         // left arrow
         console.log("left arrow");
         module.changeStatus(0, -1);
         util.insertText('左に曲がりました。');
      }
      else if (e.keyCode == '39') {
         // right arrow
         console.log("right arrow");
         module.changeStatus(0, 1);
         util.insertText('右に曲がりました。');
      }
  }


  module.init();
}())
