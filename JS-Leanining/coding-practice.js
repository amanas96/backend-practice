var a = 10;

function outer() {
  var a = 20;

  function inner() {
    var a = 30;
    console.log(a);
  }
  inner();
}
outer();
