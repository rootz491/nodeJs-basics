const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    username: {
        type: String,
        minlength: 4,
        maxlength: 20,
        unique: true
    },
    type: String 
});

const workerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joinedOn: {
        type: Date,
        default: new Date().getTime()
    }
});

const jobSchema = new Schema({
    title: {
        type: String,
        minlength: 15,
        maxlength: 50,
        immutable: true,
        required: true
    },
    description: {
        type: String,
        minlength: 30,
        maxlength: 150,
        required: true,
        immutable: true
    },
    image: {
        type: Buffer,
        required: false,
        select: false,
    },
	date: {
        type: Date,
        default: new Date().getTime(),
        immutable: true
    },
	employer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
	workers: [workerSchema],
	expectedWorker: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
	expectedDays: {
        type: Number,
        min: 1,
        required: true
    },
	deadline: Date,
	isFullPaid: {
        type: Boolean,
        default: false
    },
	isTokenPaid: {
        type: Boolean,
        default: false
    },
	status: {
        type: String,
        default: 'open'
    },
	tokenMoney: {
        type: Number,
        required: true,
        minlength: 0,
    },
	fullMoney: {    // just total money (excluding tokenMoney)
        type: Number,
        required: true,
        minlength: 200,
    }
});

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);

mongoose.connect(process.env.MONGO_URI_2)
.then(async _ => {

    try {
        /* 
        * created two user (employee and employer) and prined them
        const rootz = new User({username: 'rootz491', type: 'employee'});
        const nik = new User({username: 'nikhil', type: 'employer'});
        await nik.save();
        await rootz.save();
        console.log(`user: ${rootz}\n${nik}`);
        */

        /* 
        * select a user and create a job with it. 
        const rootz491 = await User.findOne({username: 'rootz491'})
        const img = fs.readFileSync('deadface_2021.png');
        const newJob = new Job({
            title: 'Full complex for goverment site',
            description: 'very important work, good salary and free food, also travelling and other expenses will be on us.',
            employer: rootz491._id,
            deadline: '01-12-2021',
            image: img,
            expectedDays: 4,
            expectedWorker: 2,
            // money will be calculated in backend
            fullMoney: 3500,
            tokenMoney: 100
        });
        await newJob.save();
        console.log(`user: ${rootz491}\n\njob: ${newJob}`);
        */

        /*
        * get two users by name and job, then push both users as workers & save the job
        const nik = await User.findOne({username: 'nikhil'}).exec();
        const rootz = await User.findOne({username: 'rootz491'}).exec();
        const thatJob = await Job.findById('61699c1a9c66d94becc19624').exec();  //  doesn't return image coz it's excluded by schema
        thatJob.workers.push({user: nik._id});
        thatJob.workers.push({user: rootz._id});
        await thatJob.save();
        console.log(thatJob);
        */
       
        /*  
        * get a job and populate referenced fields (i.e. image, workers.user)
        const thatJob = await Job.findById('61699c1a9c66d94becc19624').populate('workers.user image').exec();
        console.log(thatJob);
        */

        /*  
        * get a job, populate workers.user field and parse thru workers array to show worker's data 
        const thatJob = await Job.findById('61699c1a9c66d94becc19624').populate('workers.user').exec();
        thatJob.workers.forEach(u => console.log(u));
        */
        
       
        /* 
        * get query, populate subdoc under array and sort based on one of it's fields && exclude one of fields (i.e. employer) 
        const thatJob = await Job.findById('61699c1a9c66d94becc19624').select('-employer').populate({path:'workers.user', options: {sort: '-joinedOn'}}).exec();
        console.log(thatJob);
        * sorting is NOT working, although exclusion of specific field is working like a charm
        */

        /* 
        * create new user and add him to job 
        const newUser = new User({username: 'John Doe'});
        await newUser.save();
        const newUser = await User.findOne({username: 'John Doe'});
        const thatJob = await Job.findById('61699c1a9c66d94becc19624').exec();
        thatJob.workers.push({user: newUser._id});
        await thatJob.save();
        console.log(thatJob);
        */

        /* 
        * remove a user from workers array based on worker's objectId 
        const thatJob = await Job.findByIdAndUpdate('61699c1a9c66d94becc19624', {
            '$pull': {
                'workers': { '_id': '61699efe43ce0a05e8192a32' }    //  _id of Worker document NOT user ID
            }
        }).exec();
        */
        /* 
        * remove a user from workers array based on worker userID 
        let thatJob = await Job.findByIdAndUpdate('61699c1a9c66d94becc19624', {
            '$pull': {
                'workers': { 'user': '616953bde6b772d770217e50' }
            }
        }).exec();
        */

        // show all users of job
        const thatJob = await Job.findById('61699c1a9c66d94becc19624').populate('workers.user');
        thatJob.workers.forEach(u => console.log(u.user));

        /*  
        * get job and user, add user to job then remove other user from job.
        const thatUser = await User.findOne({username: 'rootz491'});  
        * add user to workers array
        let thatJob = await Job.findByIdAndUpdate('61699c1a9c66d94becc19624', {
        '$push': {
                'workers': {
                    'user': thatUser._id
                }
            }
        }).populate('workers.user');
        thatJob.workers.forEach(u => console.log(u.user));
        */
        /* 
        * remove other user from array by it's ID
        const otherUser = await User.findOne({username: 'rootz491'}).exec();
        let thatJob = await Job.findByIdAndUpdate('61699c1a9c66d94becc19624', {
            '$pull': {
                'workers': {
                    'user': otherUser._id
                }
            }
        });
        */

    } catch (error) {
        console.log(error.message);
    }
    finally {
        process.exit();
    }
});