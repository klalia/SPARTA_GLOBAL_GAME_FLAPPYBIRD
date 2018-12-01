$(function () {

  //saving dom objects to variables
  var container = $('#container');
  var bird = $('#bird');
  var pole = $('.pole');
  var pole_1 = $('#pole_1');
  var pole_2 = $('#pole_2');
  var score = $('#score');
  var speed_span = $('#speed');
  var restart_btn = $('#restart_btn');
  var restart_btn1 = $('#restart_btn1');

  //saving the initial setup
  var container_width = parseInt(container.width());
  var container_height = parseInt(container.height());
  var pole_initial_position = parseInt(pole.css('right'));
  var pole_initial_height = parseInt(pole.css('height'));
  var bird_left = parseInt(bird.css('left'));
  var bird_height = parseInt(bird.height());
  var speed = 10;

  //other declarations
  var go_up = false;
  var go_upI = false;
  var score_updated = false;
  var game_over = false;



  //set interval function which runs every 40 milliseconds
  var the_game = setInterval(function () {

    if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
      stop_the_game();
      }
      else {
      //get the poles current position and save to new variable
      //define the variable to the corresponding css code
      var pole_current_position = parseInt(pole.css('right'));

      //update the score when the poles have passed the bird successfully
      if (pole_current_position > container_width - bird_left) {
        if (score_updated === false) {
          score.text(parseInt(score.text()) + 1);
          score_updated = true;
        }
      }

      //check whether the poles went out of the container
      //when the pole goes out of the container, we have to bring it back- so check if the poles went out of the container
      // if the pole went out of the container
      if (pole_current_position > container_width) {
        var new_height = parseInt(Math.random() * 150);

        //change the pole's height
        pole_1.css('height', pole_initial_height + new_height);
        pole_2.css('height', pole_initial_height - new_height);

        //increase the speed per obstacle
        speed = speed + 1;
        speed_span.text(speed);

        //to show the speed on the screen
        score_updated = false;

        //sets back to the initial position and then the code continues
        pole_current_position = pole_initial_position;
      }

      //move the pole
      //to move the poles we should increase it, moving the pole right to left
      pole.css('right', pole_current_position + speed);

      if (go_up === false) {
        go_down();
      }
    }

  }, 40);

  $(document).on('keydown', function (e) {
    var audio = new Audio('../audio/flap.mp3');
    audio.play();
    var key = e.keyCode;
      //if the key is equal to space then go up will be updated with the function which will run every 50 milliseconds
      //and the function will be the up function
     if (key === 32 && go_up === false && game_over === false) {
        go_upI = setInterval(up, 40);
        go_up = true;

      }
  });

  $(document).on('keyup', function (e) {
    var key = e.keyCode;
      if (key === 32) {
        clearInterval(go_upI);
        go_up = false;
      }
  });

  function go_down() {
   // setting the css top for the bird and increasing it by 5
    bird.css('top', parseInt(bird.css('top')) + 5);
  }

  function up() {
    bird.css('top', parseInt(bird.css('top')) - 10);
  }

  function stop_the_game() {
    var audio = new Audio('../audio/gameover.mp3');
    audio.play();
    clearInterval(the_game);
    game_over = true;
    restart_btn.slideDown();
    restart_btn1.slideDown();
  }

  restart_btn.click(function(){
  location.reload();
});

  //you get the offset and dimension of the divs and check whether they overlap.
  function collision($div1, $div2) {
    var x1 = $div1.offset().left; //  get the position of the first div (the left position (inc any padding and borders))
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true); //gets the width of the whole first div
    var b1 = y1 + h1;
    var r1 = x1 + w1; //adds the inital position of the bird to the width of the bord to get to the top right corner of the width
    var x2 = $div2.offset().left; //gets the position of the second div on the left side
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    // if the top right corner of the first div meets the left side of the second then there is a collision, so the width of the pole needs to be bigger

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }
});
