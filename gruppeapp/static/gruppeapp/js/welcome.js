var counter = 0;
var studentid = counter+1;
$("document").ready(function() {
  $("#addstudent").click(function() {

    var currentStudent = $("#nameinput").val();

    if (currentStudent !== "") {
        $("#nameinput").val("");
        addstudenttolist(currentStudent);

        counter++;
        studentid = counter+1;
        $("#studentcounter").val(counter);
    }
    // set scroll to bottom whenever student is added
    $('#grouplist').scrollTop($('#grouplist')[0].scrollHeight);



  });

      $("#clear").click(function() {
        $(".student").remove();
        counter = 0;
        $("#studentcounter").val(counter);
      });

      $("#grouplist").on("click", ".removestudent", function(event) {
      console.log("Remove "+ $(event.currentTarget).data("student"));
        var string = $(event.currentTarget).data("student");
        $("#container"+string).remove();
        $("#student"+string).remove();
        $("#studentcounter").val(counter);
        counter--;

        studentid = counter+1;

  });


  $("#studentsfromclassform").submit(function() {
  //counter = $("input:checked").length;
  //$("#studentsfromclasscounter").val(counter);
  return true;

  });
  $("#generategrouplink").click(function() {
    $("#generategroupbutton").click();
  });

  $("#pastestudentbutton").click(function() {
  var lines = $("#pastetext").val().split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i]!="") {
    addstudenttolist(lines[i]);
    counter++;
    studentid = counter+1;
    $("#studentcounter").val(counter);
    }
  }
  $("#pastetext").clear();
  });

  if ($("#createGroupFromClassBoolean").val() === "true") {
        console.log("Findes #createClassFromModal = "+$("#createClassFromModal").children());
        $("#secretGroupFromClassTrigger").click();
    }



  $('body').on('keypress', function(e) {
  if ($("#nameinput").is(":focus")) {
  
    if (e.which == 13) {

      $("#addstudent").click();
      return false;
    }
    return true;
    }
  });

});

var addstudenttolist = function(studentname) {
$("#grouplist").append("<li class='list-group-item' id='container"+counter+"'>"+
        "<div class='row'>"+
        "<div class='col-md-8 col-sm-8'>"+
                      "<p  data-type='text' data-title='Enter student name' class='studentnamefield'>"+studentname+"</p>"+
                    "</div>"+
                    "<div class='col-md-4 pull-right'>"+
                      "<span class='glyphicon glyphicon-remove removestudent pull-right' data-student="+counter+"></span> <br>"+
                    "</div>"+
                    "</div>"+
                    "</li>");

        $("#studentlist").append("<input class='student' type='hidden' value="+studentname+" name='student"+counter+"' id='student"+counter+"'>");
}
