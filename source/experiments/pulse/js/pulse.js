function draw() {

  var monitor = document.getElementById("pulse");
  var beatContext = monitor.getContext("2d");

  beatContext.fillStyle = 'rgba( 20, 20, 20, 1 )';
  beatContext.fillRect( 0, 0, 100, 50 );

  //animation
  PosX = 0;
  PosY = 25;

  setInterval (function() {

    beatContext.beginPath();

    beatContext.lineWidth = 1;
    beatContext.strokeStyle = 'rgba( 20, 50, 20, 0.03 )';
    beatContext.stroke();
    beatContext.closePath();

    beatContext.beginPath();
    beatContext.moveTo( PosX, PosY );
    PosX = PosX + 1;
    if ( PosX >= 40 && PosX < 48 ) {
      PosY = PosY - 3;
    }
    if ( PosX >= 48 && PosX < 54 ) {
      PosY = PosY + 7;
    }
    if ( PosX >= 54 && PosX < 61 ) {
      PosY = PosY - 3;
    }
    if ( PosX >= 61 && PosX < 101 ) {
      PosY = 25;
    }
    if ( PosX > 100 ) {
      PosX = 0;
      beatContext.moveTo( PosX, PosY );
      beatContext.fillStyle = 'rgba( 20, 20, 20, 1 )';
      beatContext.fillRect( 0, 0, 100, 50 );
    }
    beatContext.lineTo( PosX, PosY );
    beatContext.lineWidth = 2;
    beatContext.strokeStyle = '#33ff33';
    beatContext.stroke();
    beatContext.closePath();

  }, 15);
}

draw();
