var newstudentcounter = 1;
var counterhelp = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
$("document").ready(function() {
  while ($("#"+newstudentcounter.toString()+"studentcontainer").length) {
    console.log("Fandt "+counterhelp[newstudentcounter]);
    newstudentcounter++;
    
  }


  $("#newstudentbutton").click(function(event) {
    /* Act on the event */
    //console.log($("#newstudentinput").val();
    newstudent();
    newstudentcounter++;


    $("#newstudentinput").val("");
    

  });


  $(".studentlist").on("click", ".editstudent", function(event) {
    /* Act on the event */
    var studenttobeedit = $(event.currentTarget).data("student");
    alert("Du klikkede på"+$("name="+studenttobeedit+"name").val());
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
        '<input type="hidden" name="'+counterhelp[newstudentcounter]+'name" value="'+name+'">'+
      '</div>'+
      '<div class="col-md-4">'+
        '<span class="glyphicon glyphicon-remove removestudent pull-right" data-newstudent="'+newstudentcounter+'"></span> <br>'+

      '</div>'+

    '</div>'+
  '</div>');

  $("#newstudentinput").val("");
  $("#savebutton").popover("show");
}
