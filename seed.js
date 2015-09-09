/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Element = Promise.promisifyAll(mongoose.model('Element'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedElements = function () {

    var elements = [
    {
        "formula": "H",
        "mW": 1.00794
    },
    {
        "formula": "He",
        "mW": 4.002602
    },
    {
        "formula": "Li",
        "mW": 6.941
    },
    {
        "formula": "Be",
        "mW": 9.012182
    },
    {
        "formula": "B",
        "mW": 10.811
    },
    {
        "formula": "C",
        "mW": 12.0107
    },
    {
        "formula": "N",
        "mW": 14.0067
    },
    {
        "formula": "O",
        "mW": 15.9994
    },
    {
        "formula": "F",
        "mW": 18.9984032
    },
    {
        "formula": "Ne",
        "mW": 20.1797
    },
    {
        "formula": "Na",
        "mW": 22.98976928
    },
    {
        "formula": "Mg",
        "mW": 24.305
    },
    {
        "formula": "Al",
        "mW": 26.9815386
    },
    {
        "formula": "Si",
        "mW": 28.0855
    },
    {
        "formula": "P",
        "mW": 30.973762
    },
    {
        "formula": "S",
        "mW": 32.065
    },
    {
        "formula": "Cl",
        "mW": 35.453
    },
    {
        "formula": "Ar",
        "mW": 39.948
    },
    {
        "formula": "K",
        "mW": 39.0983
    },
    {
        "formula": "Ca",
        "mW": 40.078
    },
    {
        "formula": "Sc",
        "mW": 44.955912
    },
    {
        "formula": "Ti",
        "mW": 47.867
    },
    {
        "formula": "V",
        "mW": 50.9415
    },
    {
        "formula": "Cr",
        "mW": 51.9961
    },
    {
        "formula": "Mn",
        "mW": 54.938045
    },
    {
        "formula": "Fe",
        "mW": 55.845
    },
    {
        "formula": "Co",
        "mW": 58.933195
    },
    {
        "formula": "Ni",
        "mW": 58.6934
    },
    {
        "formula": "Cu",
        "mW": 63.546
    },
    {
        "formula": "Zn",
        "mW": 65.38
    },
    {
        "formula": "Ga",
        "mW": 69.723
    },
    {
        "formula": "Ge",
        "mW": 72.64
    },
    {
        "formula": "As",
        "mW": 74.9216
    },
    {
        "formula": "Se",
        "mW": 78.96
    },
    {
        "formula": "Br",
        "mW": 79.904
    },
    {
        "formula": "Kr",
        "mW": 83.798
    },
    {
        "formula": "Rb",
        "mW": 85.4678
    },
    {
        "formula": "Sr",
        "mW": 87.62
    },
    {
        "formula": "Y",
        "mW": 88.90585
    },
    {
        "formula": "Zr",
        "mW": 91.224
    },
    {
        "formula": "Nb",
        "mW": 92.90638
    },
    {
        "formula": "Mo",
        "mW": 95.96
    },
    {
        "formula": "Tc",
        "mW": 98
    },
    {
        "formula": "Ru",
        "mW": 101.07
    },
    {
        "formula": "Rh",
        "mW": 102.9055
    },
    {
        "formula": "Pd",
        "mW": 106.42
    },
    {
        "formula": "Ag",
        "mW": 107.8682
    },
    {
        "formula": "Cd",
        "mW": 112.411
    },
    {
        "formula": "In",
        "mW": 114.818
    },
    {
        "formula": "Sn",
        "mW": 118.71
    },
    {
        "formula": "Sb",
        "mW": 121.76
    },
    {
        "formula": "Te",
        "mW": 127.6
    },
    {
        "formula": "I",
        "mW": 126.90447
    },
    {
        "formula": "Xe",
        "mW": 131.293
    },
    {
        "formula": "Cs",
        "mW": 132.9054519
    },
    {
        "formula": "Ba",
        "mW": 137.327
    },
    {
        "formula": "La",
        "mW": 138.90547
    },
    {
        "formula": "Ce",
        "mW": 140.116
    },
    {
        "formula": "Pr",
        "mW": 140.90765
    },
    {
        "formula": "Nd",
        "mW": 144.242
    },
    {
        "formula": "Pm",
        "mW": 145
    },
    {
        "formula": "Sm",
        "mW": 150.36
    },
    {
        "formula": "Eu",
        "mW": 151.964
    },
    {
        "formula": "Gd",
        "mW": 157.25
    },
    {
        "formula": "Tb",
        "mW": 158.92535
    },
    {
        "formula": "Dy",
        "mW": 162.5
    },
    {
        "formula": "Ho",
        "mW": 164.93032
    },
    {
        "formula": "Er",
        "mW": 167.259
    },
    {
        "formula": "Tm",
        "mW": 168.93421
    },
    {
        "formula": "Yb",
        "mW": 173.054
    },
    {
        "formula": "Lu",
        "mW": 174.9668
    },
    {
        "formula": "Hf",
        "mW": 178.49
    },
    {
        "formula": "Ta",
        "mW": 180.94788
    },
    {
        "formula": "W",
        "mW": 183.84
    },
    {
        "formula": "Re",
        "mW": 186.207
    },
    {
        "formula": "Os",
        "mW": 190.23
    },
    {
        "formula": "Ir",
        "mW": 192.217
    },
    {
        "formula": "Pt",
        "mW": 195.084
    },
    {
        "formula": "Au",
        "mW": 196.966569
    },
    {
        "formula": "Hg",
        "mW": 200.59
    },
    {
        "formula": "Tl",
        "mW": 204.3833
    },
    {
        "formula": "Pb",
        "mW": 207.2
    },
    {
        "formula": "Bi",
        "mW": 208.9804
    },
    {
        "formula": "Po",
        "mW": 209
    },
    {
        "formula": "At",
        "mW": 210
    },
    {
        "formula": "Rn",
        "mW": 222
    },
    {
        "formula": "Fr",
        "mW": 223
    },
    {
        "formula": "Ra",
        "mW": 226
    },
    {
        "formula": "Ac",
        "mW": 227
    },
    {
        "formula": "Th",
        "mW": 232.03806
    },
    {
        "formula": "Pa",
        "mW": 231.03588
    },
    {
        "formula": "U",
        "mW": 238.02891
    },
    {
        "formula": "Np",
        "mW": 237
    },
    {
        "formula": "Pu",
        "mW": 244
    },
    {
        "formula": "Am",
        "mW": 243
    },
    {
        "formula": "Cm",
        "mW": 247
    },
    {
        "formula": "Bk",
        "mW": 247
    },
    {
        "formula": "Cf",
        "mW": 251
    },
    {
        "formula": "Es",
        "mW": 252
    },
    {
        "formula": "Fm",
        "mW": 257
    },
    {
        "formula": "Md",
        "mW": 258
    },
    {
        "formula": "No",
        "mW": 259
    },
    {
        "formula": "Lr",
        "mW": 262
    },
    {
        "formula": "Rf",
        "mW": 267
    },
    {
        "formula": "Db",
        "mW": 268
    },
    {
        "formula": "Sg",
        "mW": 271
    },
    {
        "formula": "Bh",
        "mW": 272
    },
    {
        "formula": "Hs",
        "mW": 270
    },
    {
        "formula": "Mt",
        "mW": 276
    },
    {
        "formula": "Ds",
        "mW": 281
    },
    {
        "formula": "Rg",
        "mW": 280
    },
    {
        "formula": "Cn",
        "mW": 285
    },
    {
        "formula": "Uut",
        "mW": 284
    },
    {
        "formula": "Uuq",
        "mW": 289
    },
    {
        "formula": "Uup",
        "mW": 288
    },
    {
        "formula": "Uuh",
        "mW": 293
    },
    {
        "formula": "Uus",
        "mW": 0
    },
    {
        "formula": "Uuo",
        "mW": 294
    }
];

    return Element.createAsync(elements);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        // if (users.length === 0) {
            return seedUsers();
        // } else {
        //     console.log(chalk.magenta('Seems to already be user data, exiting!'));
        //     // process.kill(0);
        // }
    }).then(function () {
        return seedElements();
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
