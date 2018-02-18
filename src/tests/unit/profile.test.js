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
