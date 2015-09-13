app.factory('premadeBuffers', function () {
  var premades =  {
    PBS: {
      "compounds": [
        {
          "conc": "1.37M",
          "formula": "NaCl",
          "elements": [
            {
              "name": "Na",
              "number": 1,
              "mW": 22.98976928
            },
            {
              "name": "Cl",
              "number": 1,
              "mW": 35.453
            }
          ],
          "mW": 58.44276928000001
        },
        {
          "conc": "27mM",
          "formula": "KCl",
          "elements": [
            {
              "name": "K",
              "number": 1,
              "mW": 39.0983
            },
            {
              "name": "Cl",
              "number": 1,
              "mW": 35.453
            }
          ],
          "mW": 74.5513
        },
        {
          "conc": "100mM",
          "formula": "Na2HPO4",
          "elements": [
            {
              "name": "Na",
              "number": 2,
              "mW": 22.98976928
            },
            {
              "name": "H",
              "number": 1,
              "mW": 1.00794
            },
            {
              "name": "P",
              "number": 1,
              "mW": 30.973762
            },
            {
              "name": "O",
              "number": 4,
              "mW": 15.9994
            }
          ],
          "mW": 141.95884056
        },
        {
          "conc": "18mM",
          "formula": "KH2PO4",
          "elements": [
            {
              "name": "K",
              "number": 1,
              "mW": 39.0983
            },
            {
              "name": "H",
              "number": 2,
              "mW": 1.00794
            },
            {
              "name": "P",
              "number": 1,
              "mW": 30.973762
            },
            {
              "name": "O",
              "number": 4,
              "mW": 15.9994
            }
          ],
          "mW": 136.085542
        }
      ],
      "name": "PBS"
    }

  };

  return function (name) {
    return premades[name];
  };
});