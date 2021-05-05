#   mongoDB


##  SHELL - mongoDB terminal

###  importing data
```shell
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json
```

###  exporting data
```shell
mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json
```

###  connect to your cluster
```shell
mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"
```

###   connect to DB
```shell
$   show dbs
$   use <db-name>
```

###     show collections of selected db
```shell
show collections
```

###     query through database
```shell
db.zips.find({"state": "NY"})
```

```shell
db.zips.find({"state": "NY"}).count()

db.zips.find({"state": "NY", "city": "ALBANY"})

db.zips.find({"state": "NY", "city": "ALBANY"}).pretty()
```

*   When you query data using `find` command, it'll return any random 20 documents for that collections;
    To fetch data further, use this command:
```shell
it
```
    it'll iterate over returned results and will return next 20 document from database!

*   to get one document from db's currently selected collection, use this command:
```shell
db.collection-name.findOne()
```

###     insert a document into db
```shell
db.collection-name.insert{"name": karan}
```

*   when mongodb will insert this document to database, it'll automatically assigned a new field called `_id` which is common field for all documents but have unique values throughout the database!
*   you can give you own `_id` field while inserting the document but remember **inserted `_id` value should be unique**.

###     insert multiple documents into db
```shell
db.collection-name.insert( [ {"name":"karan"}, {"name":"sudi"}, {"name":"nik"} ] )
```
*   we can also give `_id` fields to each document that we insert;
*   when inserting multiple documents at once, insertion will be ordered
*   which means, if insertion is **interrupted** in-between the process, say due to to duplicate key error b/w first & second document then third document will not be inserted!

>   to solve this problem, we can use `{"ordered":false}` argument with `insert()` command along with inserting data;
    So now even if there's a problem b/w some documents, other will still be pushed into database.

```shell
db.collection-name.insert( [{"_id": 1, "name": "karan"}, {"_id": 1, "name": "sudi"}, {"_id": 3, "name": "nik"}], {"ordered": false} )
```

when this command will run, mongodb shell will throw error for first two document (and will insert one of them) AND it will also insert third document i.e. `{"_id":3, "name": "nik"}`.

####   insert into collection that don't exist:

*   it's totally find to insert into collection that doesn't exist into your database.
*   when you'll do so, mongodb will create a new collection with given name and insert document into it!
*   Same goes with database, you can select database that doesn't exist in your cluster yet using `use newDb`
*   And now if you insert some document into it, like this, `db.test.insert({"test": 1})` then mongodb will create a new database named `newdb` & also a new collection named `test` inside that database!
*   you can see this database among other databases using `show dbs` command 😎


###     updating a document

*   to update a document we have to funtions / commands in mongodb, i.e. `updateOne` & `updateMany`.
####    syntax:
```shell
db.testCollection.updateMany({"name": "karan"}, {"$inc": {"salary": 50000}})
```
*   `updateMany` will find all document that satisfy the condition and update them.
*   **first argument** of function is `{"name": "karan"}` which will be used to find/query the document by mongodb.
*   **second argument** of function is `{"$inc": {"salary": 50000}}`
    *   `$inc` is operation to increment the given argument i.e. `salary` by specified amount i.e. `50000`.
    *   there are other operations like, 
        *   `$set` give new value to perticalar field.
        ```shell
        db.india.updateOne({"state": "uttarakhand"}, {"$set": {"population": 45870000} })
        ```
        *   `$push` to push new data into given array dataStructure.
        ```shell
        db.india.updateMany({"state": "uttarakhand"}, {
            "$push": {
                "district": {"name": "doiwala", "population": 133700}
            }
        })
        ```
        *   so there is database in which `india` is one of collections;
        *   we selected a document which has `uttarakhand` as **value** of `state` field.
        *   then we **updated** the `district` *array* field of that document and added one more distict into the array whose data is `{"name": "doiwala", "population": 133700}`.



###     delete a document

*   to delete a doumument we have 2 functions/commands, i.e. `deleteOne` & `deleteMany`.

```shell
$   db.test.deleteOne( {"_id": "123456-2021-BDFE"} )

$   db.test.deleteMany( {"test": 4} )
```


###     delete a collection

*   to delete a collection, use `drop()` function.

```shell
db.collection-name.drop()
```

###     complex queries:

*   to make more complex queries like **greater than or equals to** or **less than** you can use **comparison operator** like `$gte` or `$lt`.

*   query to find all documents of collections `india` where value of `population` field is **less than** 180000 & `type` field is `state`.
```shell
db.india.find( { "type": "state", "population": { "$lt": 180000 } } )
```

*   What is the difference between the number of people born in 1998 and the number of people born after 1998 in the sample_training.trips collection?
```shell
db.trips.find({"birth year": {"$gt": 1998} }).count() - db.trips.find({"birth year": 1998}).count()
```