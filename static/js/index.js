'use strict';

(function() {

  // Util function
  var $s = document.getElementById('status');
  var $hp = document.getElementById('hp');

  var util = {

    // Return random number depends n
    rand: function (n) {
      return Math.floor(Math.random() * n) + 1;
    },

    // init hp to show first
    culcHP: function () {
      var x_length = GOAL_X - POSITION_X;
      var y_length = GOAL_Y - POSITION_Y;

      if (x_length < 0) {x_length *= -1}
      if (y_length < 0) {y_length *= -1}

      return x_length + y_length + 10;
    },

    // method to print to html
    insertText: function (t) {
      $s.insertAdjacentHTML('afterbegin', '<p class="m-t-10">'+ t +'</p>');
    },

    // culcration distance to goal from this position
    culcDistance: function () {
      var x = GOAL_X - module.status.x;
      var y = GOAL_Y - module.status.y;

      var distance = Math.round(Math.sqrt(x * x + y * y));
      console.log("distance: ", distance);

      var t = "出口までの距離は" + distance + "のようだ。"

      this.insertText(t);
    },

    // insert event based on rest hit point
    insertEvent: function () {

      var t = "";
      var remain = MAX_PROGRESS - module.progress;
      switch (remain) {
        case 10:
          t = "早く逃げなければ、ゾンビに襲われてしまう...";
          break;
        case 8:
          t = "まだか、抜け穴はどこだ...";
          break;
        case 5:
          t = "...まずい、早く逃げなければ...";
          break;
        case 2:
          t = "そろそろ体力の限界だ...";
          break;
        default:
          return;
      }

      this.insertText(t);

    }
  }

  // Set default values
  {
    var PROGRESS = 0,
    POSITION_X = util.rand(10),
    POSITION_Y = util.rand(10),
    GOAL_X = util.rand(10),
    GOAL_Y = util.rand(10),
    MAX_PROGRESS = util.culcHP(),
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
    progress: PROGRESS,
    zombies: ZOMBIES,

    init: function () {
      console.log("status: ", module.status);
      console.log("goal:", GOAL_X, ",", GOAL_Y);
      console.log("ZOMBIES: ", module.zombies);

      var isStatusAndGoalSame = (module.status.x === GOAL_X
                                && module.status.y === GOAL_Y)
      if (isStatusAndGoalSame) {
        alert("今の位置とゴールが同じなので、もう一度読み込みます。")
        location.reload();
      }

      // Init hit point
      this.showHP();

    }
  }

  module.changeStatus = function (x, y, t) {
    this.status.x += x;
    this.status.y += y;
    this.progress += 1;

    this.showHP();

    var wallPosition = this.status.x < 1 || this.status.y < 1
                        || this.status.x > 15 || this.status.y > 15;

    if (wallPosition) {
        util.insertText('壁にぶつかりました');
        this.status.x -= x;
        this.status.y -= y;
        return;
    }

    this.checkEvent();

    util.insertText("<br>");
    util.insertEvent(); // 早く逃げなければ、ゾンビに襲われてしまう...
    util.culcDistance(); // 出口までの距離はnのようだ。
    util.insertText(t); // 戻りました...
    util.insertText("<p>"+ this.status.progress +"回目の移動</p>"); // 1回目の移動
    util.insertText("<br>");
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
    this.status.progress += 1;
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
    var isGoal = (this.status.x === GOAL_X
                  && this.status.y === GOAL_Y);
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
          module.changeStatus(-1, 0, '後ろに下がりました...');
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

      var isArrowKey = e.keyCode == '38' || e.keyCode == '40'
                      || e.keyCode == '37' || e.keyCode == '39';
      if (isArrowKey) {
        event.preventDefault();
      }

  }

  module.init();

}())
