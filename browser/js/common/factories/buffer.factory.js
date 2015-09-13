app.factory('Buffer', function ($http, premadeBuffers) {

  function Buffer(props) {
    angular.extend(this, props);
  }

  Buffer.VOLUME_CONVERSION = {
    L: 1,
    dL: 1/10,
    cL: 1/100,
    mL: 1/1000,
    uL: 1/1000000
  };

  Buffer.url = '/api/buffers/';

  Buffer.strParse = function (str, possibles) {
    var number = parseFloat(str);
    console.log('number is', number);
    if (!number) throw new Error("No number given");
    var unit = str.match(/[a-zA-Z]+/)[0];
    if (possibles.indexOf(unit) === -1) throw new Error("Could not parse unit");
    return {value: Number(number), units: unit};
  };

  Buffer.prototype.fillAmounts = function () {
    console.log('in fill amounts');
    if (!this.volume) return;
    console.log('in fill amounts 2');
    
    var liters = this.getLiters();
    this.compounds.forEach(function (compound) {
      compound.fillAmount(liters);
    });
  };

  Buffer.prototype.getLiters = function () {
    var volume = Buffer.strParse(this.volume, ['L', 'cL', 'dL', 'mL', 'uL']);
    return Buffer.VOLUME_CONVERSION[volume.units] * Number(volume.value);
  }

  Buffer.prototype.getUrl = function () {
    return Buffer.url + this._id;
  };

  Buffer.prototype.isNew = function () {
    return !this._id;
  };

  Buffer.prototype.fetch = function () {
    return $http.get(this.getUrl())
    .then(function (res) {
      var buffer = res.data;
      buffer.volume = String(buffer.volume.value) + " " + buffer.volume.units;
      buffer.compounds.forEach(function (compound) {
        compound.conc = String(buffer.concentration.value) + " " + buffer.concentration.units;
        compound.elements.forEach
      })
      return new Buffer(buffer);
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

  Buffer.VOLUME_CONVERSION = {
    L: 1,
    dL: 1/10,
    cL: 1/100,
    mL: 1/1000,
    uL: 1/1000000
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


















