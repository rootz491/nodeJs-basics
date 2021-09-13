#   mongodb (one step further)

gonna do some reference stuff with collection and sub-collections. And make it look like interdependent data which actually cares about other portions too.

>   mongodb has `database` and database has `collections`, collection has `objects` and each object has `_id`.

Now we can reference a collection's object into another object (of same or different collection).  
This will same lots of redundent memory and extra database lookups.

### code

To understand it perfectly let's understand the code.

*   first thing is, Schema. We have to add a new field that will represent the **referenced object**.  
    For example:
    ```js
    //  writing schema for `post`
    const postSchema = mongoose.Schema({
        text: String,
        likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });
    //  creating model using above schema
    const Post = mongoose.model('Post', postSchema);
    ```
    *   Here we are setting up a field called `likes` which keeps track of likes on a post. now user can add a like to post.
        so whenever user add a like, `likes` array will contain reference to that user.
    *   Another field is `by` which contians reference to **user** who create the post object. 
    *   Last thing is, `Post` which is data model for **post collection**.

*   After schema, next is saving data (or rather, creating a post);
    ```js
    const newPost = new Post();
    newPost.text = 'Hello World!';
    newPost.likes = [];
    newPost.by = 'a2d2d6621e213d1e4e1v';    //  pass objectId (_id) of User 
    newPost.save();
    ```
    *   In post, we have supplied string value to `by` field, why's that?!!!   
        It's because, while initializing reference fields, we only need to pass `_id` of referencing object. (It's that simple 😌)
    *   we are leaving `likes` field for later, because when post is just created there's no like in it right :) (except reddit 😂).

*   last step is to add/remove like from array. and that's just pushing/popping objects back and forth.
    ```js
    const addNewLike = async (post_id, user_id) => {  //  `user_id` of _id of user who liked.
        Post.findByIdAndUpdate(post_id, { $push: { likes: user_id } })
    }
    ```