'use strict';

(function() {

  // Util function
  var $s = document.getElementById('status');
  var $hp = document.getElementById('hp');

  var util = {
    rand: function(n){
        return Math.floor(Math.random() * n) + 1;
    },
    insertText: function (t) {
      $s.insertAdjacentHTML('beforeend', '<p class="m-t-10">'+ t +'</p>');
    }
  }

  // Set default values
  {
    var PROGRESS = 0,
    MAX_PROGRESS = 12,
    POSITION_X = util.rand(10),
    POSITION_Y = util.rand(10),
    GOAL_X = util.rand(10),
    GOAL_Y = util.rand(10),
    ZOMBIES = [[util.rand(10), util.rand(10)],
              [util.rand(10), util.rand(10)],
              [util.rand(10), util.rand(10)],
              [util.rand(10), util.rand(10)],
              [util.rand(10), util.rand(10)],]
  }

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
    progress: PROGRESS,
    zombies: ZOMBIES,

    init: function () {
      console.log("status: ", module.status);
      console.log("goal: ", module.goal);
      console.log("ZOMBIES: ", module.zombies);

      var isStatusAndGoalSame = (module.status.x === module.goal.x
                                && module.status.y === module.goal.y)
      if (isStatusAndGoalSame) {
        alert("今の位置とゴールが同じなので、もう一度読み込みます。")
        location.reload();
      }

      // Init hit point
      this.showHP();

    }
  }

  module.changeStatus = function (x, y, t) {
    module.status.x += x;
    module.status.y += y;
    module.progress += 1;

    this.showHP();

    if (module.status.x < 1 || module.status.y < 1) {
        util.insertText('壁にぶつかりました');
        module.status.x -= x;
        module.status.y -= y;
        return;
    }

    this.checkEvent();
    util.insertText(t);
  }

  module.checkEvent = function () {
    // Get position
    console.log("position: ", this.status);
    // First, you need to check if it is goal or not,
    // in case of you have zombies on the goal.
    this.checkGoal();
    this.checkZombie();
    // If progress reachs 10, it ends.
    if (module.progress >= MAX_PROGRESS) {
      window.location.href = "losing.html"
      return;
    }
  }

  module.checkZombie = function () {
    var zombies = this.zombies;
    for(var i = 0; i < zombies.length; i++) {
      var isMeetZombie = (this.status.x === zombies[i][0]
                          && this.status.y === zombies[i][1]);
      if (isMeetZombie) {
        window.location.href = "zombie.html"
        return;
      }
    }
  }

  module.checkGoal = function () {
    var isGoal = (this.status.x === this.goal.x
                  && this.status.y === this.goal.y);
    if (isGoal) {
      window.location.href = "heaven.html"
      return;
    }
  }

  module.showHP = function () {
    $hp.innerText = MAX_PROGRESS - this.progress;
  }


  document.onkeydown = function (e) {
      e = e || window.event;

      if (e.keyCode == '38') {
          // up arrow
          console.log("up arrow");
          module.changeStatus(1, 0, '前に進みました...');
      }
      else if (e.keyCode == '40') {
          // down arrow
          console.log("down arrow");
          module.changeStatus(-1, 0, '戻りました...');
      }
      else if (e.keyCode == '37') {
         // left arrow
         console.log("left arrow");
         module.changeStatus(0, -1, '左に曲がりました...');
      }
      else if (e.keyCode == '39') {
         // right arrow
         console.log("right arrow");
         module.changeStatus(0, 1, '右に曲がりました...');
      }
  }

  module.init();

}())
