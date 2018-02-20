module.exports = {

    hasData: function(data){
        return data.length ? true : false;
    },

    checkInput(skill, level){
        return skill.length > 1 && level > 0;
    }

};
