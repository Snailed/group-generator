var newstudentcounter = 0;
$("document").ready(function() {
  $("#newstudentbutton").click(function(event) {
    /* Act on the event */
    //console.log($("#newstudentinput").val())
    var name = $("#newstudentinput").val();
    $("#inputrow").before('<tr><td><input type="hidden" name="'+newstudentcounter+'newstudentname" value="'+name+'">'+name+'</td><td><input type="checkbox" name="'+newstudentcounter+'newstudentabsence"></td></tr>');
    $("#newstudentinput").val("");
    newstudentcounter++;
  });
})
