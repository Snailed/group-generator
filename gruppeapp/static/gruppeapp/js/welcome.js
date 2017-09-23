var counter = 0;
var studentid = counter+1;
$("document").ready(function() {
  $("#addstudent").submit(function() {

    var currentStudent = $("#nameinput").val();
    if (currentStudent !== "") {
        $("#nameinput").val("");
        $("#grouplist").append("<li class='list-group-item' id='container"+counter+"'>"+
        "<div class='row'>"+
        "<div class='col-md-8'>"+
                      "<p  data-type='text' data-title='Enter student name' class='studentnamefield'>"+currentStudent+"</p>"+
                    "</div>"+
                    "<div class='col-md-4 pull-right'>"+
                      "<span class='glyphicon glyphicon-remove removestudent pull-right' data-student="+counter+"></span> <br>"+
                    "</div>"+
                    "</div>"+
                    "</li>");

        $("#studentlist").append("<input class='student' type='hidden' value="+currentStudent+" name='student"+counter+"' id='student"+counter+"'>");

        counter++;
        studentid = counter+1;
        $("#studentcounter").val(counter);
        }
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


});
