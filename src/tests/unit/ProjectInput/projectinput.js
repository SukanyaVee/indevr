module.exports = {

    nonEmpty: function(data){
        if (data.description) {
            return true
        } else {
            return false
        }
    },

    checkSkillLevel(skill, level){
        return skill.length >= 1;
    }

};
