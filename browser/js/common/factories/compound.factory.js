app.factory('Compound', function () {

  function Buffer(props) {
    angular.extend(this, props);
  }

  Buffer.strParse = function (str, possibles) {
    var number = str.match(/\d+/)[0];
    if (!number) throw new Error("No number given");
    var unit = str.match(/[a-zA-Z]+/)[0];
    if (possibles.indexOf(unit) === -1) throw new Error("Could not parse unit");
    return {value: Number(number), units: unit};
  };

  Buffer.prototype.getUrl = function () {
    return Buffer.url + this._id;
  };

  Buffer.prototype.isNew = function () {
    return !this._id;
  };

  Buffer.prototype.fetch = function () {
    return $http.get(this.getUrl())
    .then(function (res) {
      return new Buffer(res.data);
    });
  };

  Buffer.fetchAll = function () {
    return $http.get(Buffer.url)
    .then(function (res) {
      return res.data.map(function (obj) {
        return new Buffer(obj);
      });
    });
  };

  Buffer.prototype.save = function () {
    var verb;
    var url;
    if (this.isNew()) {
      verb = 'post';
      url = Buffer.url;
    } else {
      verb = 'put';
      url = this.getUrl();
    }

    this.compounds = this.compounds.filter(function (cpd) {
      return Object.keys(cpd).length > 0;
    })
    .map(function (compoundConcObj) {
      return {
        concentration: Buffer.strParse(compoundConcObj.conc, ['M', 'mM', 'uM', 'nM', 'pM']),
        value: { formula: compoundConcObj.formula }
      };
    });

    return $http[verb](url, this)
    .then(function (res) {
      console.log(res);
      return new Buffer(res.data);
    });
  };

  Buffer.prototype.destroy = function () {
    return $http.delete(this.getUrl());
  };

  return Buffer;
});

















