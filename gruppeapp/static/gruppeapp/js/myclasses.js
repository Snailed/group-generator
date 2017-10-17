var newstudentcounter = 1;
var counterhelp = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
var dirty = false;
//Editable field activate


$("document").ready(function() {

  prepeditable();


  while ($("#"+counterhelp[newstudentcounter].toString()+"studentcontainer").length) {

    newstudentcounter++;
  }


  $("#newstudentbutton").click(function(event) {
    /* Act on the event */

    newstudent($("#newstudentinput").val());
    newstudentcounter++;


    $("#newstudentinput").val("");
    


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
  if ($("#newstudentinput").is(":focus")) {
    if (e.which == 13) {
      newstudent($("#newstudentinput").val());
      newstudentcounter++;
      return false;
    }
    return true;
    }
    });
    $("#savebutton").click(function() {
        dirty = false;
    });
    $(window).bind('beforeunload', function(){
        if (dirty) {
        return 'Are you sure you want to leave?';
        }
    });
    $("#pastestudentbutton").click(function() {
        console.log("Hej!");
        var lines = $("#pastetext").val().split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i]!="") {
                newstudent(lines[i]);
                newstudentcounter++;
            }
        }
        $("#pastetext").clear();
        });
    });

var newstudent = function(name) {
  $(".studentlist").append('<div class="list-group-item" id="'+counterhelp[newstudentcounter]+'newstudentcontainer" >'+
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
  dirty = true;

  // set scroll to bottom whenever student is added to class
  $('.studentlist').scrollTop($('.studentlist')[0].scrollHeight);
}

var prepeditable = function() {
$.fn.editable.defaults.mode = 'inline';
  $('.studentnamefield').editable();

  $('.studentnamefield').on('save', function(e, params) {
    $(this).next().next().val(params.newValue);
  });
}
