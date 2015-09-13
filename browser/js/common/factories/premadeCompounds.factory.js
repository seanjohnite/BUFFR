app.factory('premadeCompounds', function () {
  var premades =  {
    DTT: "C4H10O2S2",
    HEPES: "C8H18N2O4S",

  };

  return function (formula) {
    console.log(premades);
    return premades[formula];
  };
});