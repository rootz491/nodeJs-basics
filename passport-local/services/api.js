const User = require('../models/auth');
const Story = require('../models/story');


module.exports = {
    getAllUsers: async () => {
        try {
            const users = await User.find()
            return users;
        } catch (error) {
            console.log(error)
            return false;
        }
        
    },
    gelAllStories: async () => {
        try {
            const stories = await Story.find()
            return stories;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}