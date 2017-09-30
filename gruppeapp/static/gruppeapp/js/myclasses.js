var newstudentcounter = 1;
var counterhelp = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//Editable field activate


$("document").ready(function() {

  prepeditable();


  while ($("#"+newstudentcounter.toString()+"studentcontainer").length) {

    newstudentcounter++;
  }


  $("#newstudentbutton").click(function(event) {
    /* Act on the event */
    //console.log($("#newstudentinput").val();
    newstudent();
    newstudentcounter++;


    $("#newstudentinput").val("");
    

  });

  /*$(".editstudent").click(function(event) {
    var studenttobeedit = $(this).data("student");

    alert("Du klikkede på"+$("#"+studenttobeedit+"name").val());
    console.log("Hej!"+studenttobeedit);
  })*/

  

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
  if ($("#newstudentinput").is(":focus")) {
    if (e.which == 13) {
      newstudent();
      newstudentcounter++;
      return false;
    }
    return true;
    }
});
$(window).bind('unload', function(){
  alert("Are you sure you wan")
});
});

var newstudent = function() {
  var name = $("#newstudentinput").val();
  $("#studentinput").before('<div class="list-group-item" id="'+newstudentcounter+'newstudentcontainer" >'+
    '<div class="row">'+
      '<div class="col-md-8">'+
        '<p  data-type="text" data-title="Enter student name" class="studentnamefield">'+name+'</p>'+
        '<input type="hidden" name="'+counterhelp[newstudentcounter]+'name" value="'+name+'" id="'+counterhelp[newstudentcounter]+'name">'+
      '</div>'+
      '<div class="col-md-4">'+
        '<span class="glyphicon glyphicon-remove removestudent pull-right" data-newstudent="'+newstudentcounter+'"></span> <br>'+

      '</div>'+

    '</div>'+
  '</div>');

  $("#newstudentinput").val("");
  $("#savebutton").popover("show");
  prepeditable();
}

var prepeditable = function() {
$.fn.editable.defaults.mode = 'inline';
  $('.studentnamefield').editable();

  $('.studentnamefield').on('save', function(e, params) {
    $(this).next().next().val(params.newValue);
  });
}
