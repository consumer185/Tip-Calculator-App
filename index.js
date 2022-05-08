$("#billInput").on('keypress', function(e) {
  if (e.which == 13) {
    makeCalculation();
  }
});

$('.tipbutton').click(function() { // tip button selected -> make calculations
  $('.tipbutton').removeClass('tipActive');
  $(this).addClass('tipActive');
  $("#customTip").val("Custom"); // clear custom tip field
  makeCalculation();
});

$("#noOfPeople").on('keypress', function(e) {
  if (e.which == 13) {
    makeCalculation();
  }
});

$('#customTip').click(function() { // custom tip selected -> enter amount, make calculations
  $('.tipbutton').removeClass('tipActive'); // deselect current tip button
  $('#customTip').val("");
  this.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
      makeCalculation()
    }
  });
});

$('#reset').click(function() { // reset button selected -> clear all inputs
  $("#billInput").val(""); // clear bill total field
  $('.tipbutton').removeClass('tipActive'); // deselect current tip button
  $("#customTip").val("Custom"); // clear custom tip field
  $('.default').addClass('tipActive');// select the default 10% tip button
  $("#noOfPeople").val("2") // reset number of people field to 2
  $("#tipPerPerson").html("$0.00");
  $("#totalPerPerson").html("$0.00");
});






function makeCalculation() {
  var billTotal = $("#billInput").val();
  var billTotalNumber = +billTotal; //convert input to number
  var noOfPeople = $("#noOfPeople").val();
  var currentTip = $(".tipActive").val();

  if ($("#noOfPeople").val() === ("0")) {
    $("#cantBeZero").show();
  } else {
    $("#cantBeZero").hide();

    if ($("#customTip").val() === ("Custom")) {
      console.log("custom tip NOT being used");
      var currentTipNoSymbol = currentTip.substring(0, currentTip.length - 1);
      var currentTipAsDecimal = currentTipNoSymbol / 100; //convert tip percentage to decimal for calculations
    } else {
      console.log("custom tip being used");
      var customAmount = ($('#customTip').val());
      var customAmountAsDecimal = customAmount / 100;
      var currentTipAsDecimal = customAmountAsDecimal;
    }

    var tipActualAmount = billTotalNumber * currentTipAsDecimal; // the actual total tip value
    var totalTipPerPerson = tipActualAmount / noOfPeople; // the tip each person pays
    var grandTotal = billTotalNumber + tipActualAmount; // the bill total plus tip
    var totalPerPerson = grandTotal / noOfPeople;

    $("#tipPerPerson").html("$" + totalTipPerPerson.toFixed(2));
    $("#totalPerPerson").html("$" + totalPerPerson.toFixed(2));
  }
}
