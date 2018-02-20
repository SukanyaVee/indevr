/*
* @jest-environment node
*/

const data = require('./searchData');
const info = require('./search_test_ctrl');

describe('User', () => {
    test('Get correct user', () => {
        info.correctSkills(data.skillData)

        expect(info.skills.length).toBe(2);
        expect(info.skills[0].skill).toEqual('JavaScript');
    })
});

describe('Projects', () => {
    test('Pull Public projects', () => {
        info.correctProject(data.projectData);

        expect(info.proj.length).toBe(2);
    })
});