var newstudentcounter = 1;
$("document").ready(function() {
  while ($("#"+newstudentcounter.toString()+"studentcontainer").length) {
    newstudentcounter++;
  }


  $("#newstudentbutton").click(function(event) {
    /* Act on the event */
    //console.log($("#newstudentinput").val())
    var name = $("#newstudentinput").val();
    newstudent();



    $("#newstudentinput").val("");
    newstudentcounter++;

  });


  $(".editstudent").click(function(event) {
    /* Act on the event */
    alert("Hej!");
  });

  $(".studentlist").on("click", ".removestudent", function(event) {
    var string = $(event.currentTarget).data("student");
    if (string == undefined) {
      string = $(event.currentTarget).data("newstudent");
      $("#"+string+"newstudentcontainer").remove();
    } else {
      $("#"+string+"studentcontainer").remove();
    }



  });

  $('#studentform').on('keypress', function(e) {
    if (e.which == 13) {
      newstudent();
      newstudentcounter++;
      return false;
    }
    return true;
});
});

var newstudent = function() {
  var name = $("#newstudentinput").val();
  $("#studentinput").before('<div class="list-group-item" id="'+newstudentcounter+'newstudentcontainer" >'+
    '<div class="row">'+
      '<div class="col-md-8">'+
        '<p>'+name+' <span class="glyphicon glyphicon-pencil editstudent" data-newstudent="'+newstudentcounter+'"> </span></p>'+
        '<input type="hidden" name="'+newstudentcounter+'name" value="'+name+'">'+
      '</div>'+
      '<div class="col-md-4">'+
        '<span class="glyphicon glyphicon-remove removestudent pull-right" data-newstudent="'+newstudentcounter+'"></span> <br>'+

      '</div>'+

    '</div>'+
  '</div>');

  $("#newstudentinput").val("");
  $("#savebutton").popover("show");
}
