const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;

const userSchema = new Schema({ name: String });

const discussionSchema = new Schema({
    user: { //  reference to user
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    answer: String
});

const querySchema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    by: { //  reference to user
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date().getTime()
    },
    discussions: [discussionSchema],
    resolved: {
        type: Boolean,
        default: false
    }
});

const Query = mongoose.model("Query", querySchema);
const User = mongoose.model("User", userSchema);
const Discussion = mongoose.model("Discussion", userSchema);


const Main = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    /*
    // first create a user
    const newUser = new User({name: "Sudi"});
    const u = await newUser.save();
    console.log('New User: ', u);

    // then create a query by that new user
    const newQuery = new Query({
        question: "How to fail at 1337!",
        by: u._id
    });
    const q = await newQuery.save();
    console.log('New Query: ', q);
    */

    // fetch all queries
    // const queries = await Query.find();
    // console.log(`queries: ${queries}`);


    // delete useless query
    // await Query.findByIdAndDelete('615bd75bde57f702c6a08256');


    /** starting adding discussions 
    // get a user
    const karan = await User.findOne({name: "Karan"});
    console.log(karan);
    // get a query
    const thatQuery = await Query.findById('615bd7e5dbcb6a2530f9386d');
    console.log(thatQuery);
    thatQuery.discussions.push({
        user: karan._id,
        answer: "IDK, what's that lol"
    })
    const updatedQuery = await thatQuery.save()
    console.log('update query: ', updatedQuery);
    */

    /*
    // add new answer
    // get a query
    const thatQuery = await Query.findById('615bd7e5dbcb6a2530f9386d');
    // get user
    const user = await User.findOne({name: 'Nik'});
    // console.log(thatQuery);
    thatQuery.discussions.push({
        user: user._id,
        answer: 'This is awesomeeee!'
    })
    const updatedQuery = await thatQuery.save();
    console.log(updatedQuery);
    */

    /*
    // get a query
    const thatQuery = await Query.findById('615bd7e5dbcb6a2530f9386d');
    // get user
    console.log(thatQuery);
    */

    //  get query of a user and push a answer into it.
    const user = await User.findOne({name: 'Nik'});
    const thatQuery = await Query.findOne({by: user._id})
    // push new answer into discussions
    thatQuery.discussions.push({
        user: user._id, answer: "ok sorry for last comment, im deleting it now."
    })
    // remove a answer from discussions by it's _id.
    thatQuery.discussions.id('615bfa894d8302adb9cf7ed4').remove();
    // save the changes
    await thatQuery.save();
    console.log(thatQuery);

    

    process.exit();
}




Main();