import {assert} from 'chai';
import {payload, people} from '../serialization';
// you can ge row data form payload.js file

const {data} = payload;

describe('payload', function () {

  // in this tests try to use as least as possible number of assignments

  it('car quantity with owners older than 20 years', function () {

    let answer;

    answer = data.filter((item) => {
      return item.type === 'Car' && item.owners.some(owner => owner.personalInfo.age > 20);
    }).length;

    assert.equal(answer, 2);

  });

  it('all car colors separated by comma without duplicates', function () {

    let answer;

    const allColors = data.filter(item => item.type === 'Car')
                          .map(item => item.attrs.color);

    answer = allColors.filter((item, pos) => allColors.indexOf(item) === pos)
                      .join(',');

    assert.equal(answer, 'red,yellow');

  });

  it('id\'s of all vehicles separated by comma', function () {

    let answer;

    const vehicles = [
      'Car',
      'Bicycle',
    ];

    const allVehicles = data.filter(item => vehicles.indexOf(item.type) >= 0);

    answer = allVehicles.map(item => item.id)
                        .join(',');

    assert.equal(answer, '1,3,6,4,2');

  });

  it('summary price of all items', function () {

    let answer;

    answer = data.map(item => item.attrs.price)
                 .reduce((prev, current) => prev + current, 0);

    assert.equal(answer, 42800);

  });

  it('price of all things john has own', function () {

    let answer;
    const john = people.johnSmith;

    const johnsThings = data.filter(item => item.owners.indexOf(john) !== -1);

    answer = johnsThings.map(item => item.attrs.price)
                        .reduce((prev, current) => prev + current, 0);

    assert.equal(answer, 25000);

  });

  it('all cities', function () {

    let answer;

    const owners = data.reduce((prev, current) => [...current.owners, ...prev]);

    answer = owners.filter((item, pos) => owners.indexOf(item) === pos)
                   .sort((a, b) => a.lastName < b.lastName)
                   .map(item => item.cities)
                   .join(',');

    assert.equal(answer, 'New York,Boston,Columbia,Rapture');

  });
});
