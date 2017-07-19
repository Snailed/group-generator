var counter = 0;
var studentid = counter+1;
$("document").ready(function() {
  $("#addstudent").submit(function() {
    var currentStudent = $("#nameinput").val();
    $("#nameinput").val("");
    $("#grouptable").append("<tr class='student'><td>"+ studentid +"</td><td>"+currentStudent+"</td></tr>");
    $("#studentlist").append("<input class='student' type='hidden' value="+currentStudent+" name=student"+counter+">");
    $("#studentcounter").val(counter);
    counter++;
    studentid = counter+1;
  });
  $("#clear").click(function() {
    $(".student").remove();
    counter = 0;
    $("#studentcounter").val(counter);
  });
});
