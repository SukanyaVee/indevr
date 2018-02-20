const axios = require('axios')


module.exports = {
    project: {
        project_id: 5
    },
    skills: [],
    proj: [],

    //Inner function of axios.get(/search/projects/${term}) from within SearchPage.js (line 72)
    correctSkills: function(skillData){
        return skillData.forEach(skill => {
            if(skill.project_id === this.project.project_id){
              this.skills.push(skill)
            }
        })
    },

    
    //Inner function of axios.get('/search/projects/${term}) from within SearchPage.js (line 64)
    correctProject: function(projectData){
        let pro = projectData.filter(elem => {
            if (elem.public === true) {
              this.proj.push(elem)
            }
          })
        }
}