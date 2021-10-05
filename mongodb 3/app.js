const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;

const childSchema = new Schema({ name: 'string' });

const parentSchema = new Schema({
    // Array of subdocuments
    children: [childSchema],
    // Single nested subdocuments. Caveat: single nested subdocs only work
    // in mongoose >= 4.2.0
    child: childSchema,
    secret: {
        type: String,
        required: true,
        unique: true
    }
});

const Parent = mongoose.model('Parent', parentSchema);
const Child = mongoose.model('Child', childSchema);

// create parent document

const CreateChild = async name => {
    const newChild = new Child({name});
    const c = await newChild.save()
    return c;
}

const CreateParent = async (childId, secret) => {
    const newParent = new Parent({child: childId, secret})
    const p = await newParent.save();
    return p;
}




// EXEC

const Main = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    /*
    // create a child doc
    const child1 = await CreateChild('doe');
    console.log(`child: ${child1}`);

    // create a parent doc that has above child doc
    const parent1 = await CreateParent(child1, 'Doctor Who');
    console.log(`parent: ${parent1}`);
    */

    /*
    // fetch all parent docs
    const parentDocs  = await Parent.find();
    console.log(parentDocs);
    */

    // add some items in children array of a parent.
    const thatParent = await Parent.findOne({secret: 'Doctor Who'});
    console.log(`old parent: ${thatParent}`);
    // new fetch all children
    const children = await Child.find();
    // go thru fetched chidren and add them to thatParent's `children` array.
    children.forEach(async child => {await thatParent.children.push(child)});
    const updatedParent = await thatParent.save();
    console.log(`new parent: ${updatedParent}`);

    process.exit();
}

Main();