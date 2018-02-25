/*
* @jest-environment node
*/

const projecttest = require('./projectinput.js');

describe ('Input Check', ()=> {
    test('Input check', ()=> {
        expect(projecttest.nonEmpty({id: 1, name: 'Project 1', description: 'This is the project description', public: true, repo: 'https://github.com'})).toEqual(true);
        expect(projecttest.nonEmpty({id: 2, name: '', description: '', public: true, repo:''})).toEqual(false);
    })
})


describe('Create Skill Input validation', ()=> {
    test('Check skill and level', ()=> {
        expect( projecttest.checkSkillLevel('React', 3)).toEqual(true);
        expect( projecttest.checkSkillLevel('', 1)).toEqual(false);
    })
})
