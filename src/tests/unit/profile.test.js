/*
* @jest-environment node
*/

const profile = require('./profile.js');

describe ('Existing Data', function(){
    const data = [
        { id: 1, title: 'Post 1', content: 'Post content!!!' },
        { id: 1, title: 'Post 2', content: 'Post content!!!' },
        { id: 1, title: 'Post 3', content: 'Post content!!!' },
    ];
    const noData = [];
    test('Check if there is data for this user', function(){
        expect( profile.hasData(data) ).toEqual(true);
        expect( profile.hasData(noData) ).toEqual(false);
    })
})


describe('Skill form validation', function(){
    test('Check that both skill and level are entered before adding', function(){
        expect( profile.checkInput('React', 3)).toEqual(true);
        expect( profile.checkInput('React', '3')).toEqual(true);
        expect( profile.checkInput('', 3)).toEqual(false);
        expect( profile.checkInput('React')).toEqual(false);
        expect( profile.checkInput('React', NaN)).toEqual(false);
    })
})
