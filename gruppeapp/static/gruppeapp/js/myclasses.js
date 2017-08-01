var newstudentcounter = 0;
$("document").ready(function() {
  $("#newstudentbutton").click(function(event) {
    /* Act on the event */
    //console.log($("#newstudentinput").val())
    var name = $("#newstudentinput").val();
    $("#studentlist").before('<div class="list-group-item"><div class="row">'+
      '<div class="col-md-8">'+
        '<p>'+name+' <span class="glyphicon glyphicon-pencil editstudent" data-student="'+newstudentcounter+'" data-newstudent="True"> </span></p>'+
        '<input type="hidden" name="'+newstudentcounter+'newstudentname" value="'+name+'">'+
      '</div>'+
      '<div class="col-md-4">'+
        '<span class="glyphicon glyphicon-remove removestudent pull-right" data-student="'+newstudentcounter+'" data-newstudent="True"></span> <br>'+

      '</div>'+

      '</div></div>');



    $("#newstudentinput").val("");
    newstudentcounter++;

  });


  $(".editstudent").click(function(event) {
    /* Act on the event */
    alert("Hej!");
  });

  $('#studentform').on('keypress', function(e) {
    if (e.which == 13) {
      newstudent();
      return false;
    }
    return true;
});
});

var newstudent = function() {
  var name = $("#newstudentinput").val();
  $("#studentlist").before('<div class="list-group-item"><div class="row">'+
    '<div class="col-md-8">'+
      '<p>'+name+' <span class="glyphicon glyphicon-pencil editstudent" data-student="'+newstudentcounter+'" data-newstudent="True"> </span></p>'+
      '<input type="hidden" name="'+newstudentcounter+'newstudentname" value="'+name+'">'+
    '</div>'+
    '<div class="col-md-4">'+
      '<span class="glyphicon glyphicon-remove removestudent pull-right" data-student="'+newstudentcounter+'" data-newstudent="True"></span> <br>'+
    '</div>'+
    '</div></div>');
  $("#newstudentinput").val("");
  $("#savebutton").popover("show");
}
