#   mongoDB


# SHELL - mongoDB terminal

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

###   select a DB
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

##     complex queries:

*   to make more complex queries like **greater than or equals to** or **less than** you can use **comparison operator** like `$gte` or `$lt`.

*   query to find all documents of collections `india` where value of `population` field is **less than** 180000 & `type` field is `state`.
```shell
db.india.find( { "type": "state", "population": { "$lt": 180000 } } )
```

*   What is the difference between the number of people born in 1998 and the number of people born after 1998 in the sample_training.trips collection?
```shell
db.trips.find({"birth year": {"$gt": 1998} }).count() - db.trips.find({"birth year": 1998}).count()
```

###  logical queries

*   there are 4 logical operator, i.e. `$and`, `$or`, `$nor` & `$not`.

*   syntax for **and**, **or** & **nor**:
```shell
db.collection-name.find( {"$operator": [ <clause_1>, <clause_2>, ... ]} )
```

*   syntax for **not** operator:
```shell
db.collection_name.find( {"$not": {<key-value-pairs>} } )
```

*   `and` operator is default when making queries & normally used if you wanna make a query where you want to same operator multiple times, to join them.
```shell
db.collection_name.find( {"$and": [ {"$or": [<clause_1>, ...]}, {"$or": [<clause_1>, ...]} ] } )
```

>   find which `student_id` are greater than `25` & less than `100` in `grades` collection.

```shell
db.grades.find( {"$and": [{"student_id": {"$gt": 25}}, {"student_id": {"$lt": 100}}] } )
# OR
db.grades.find( { "id": {"$gt": 25, "$lt": 100} } )
```

*   find all document with dont have values `1` or `2` in field `test` on `practice` collection.
```shell
db.practice.find( {"$nor": [{"test": 1}, {"test": 2}]} )
```

*   How many businesses in the sample_training.inspections dataset have the inspection result "Out of Business" and belong to the Home Improvement Contractor - 100 sector?
```shell
db.inspections.find( {"$and": [ {"result": "Out of Business", "sector": "Home Improvement Contractor - 100"} ]} ).count()
#   OR
db.inspections.find( {"result": "Out of Business", "sector": "Home Improvement Contractor - 100"} ).count()
```

*   How many companies in the sample_training.companies dataset were either founded in 2004, or in the month of October and either have the social category_code or web category_code?
```shell
db.companies.find( {"$and": [
    {"$or": [{"founded_year": 2004}, {"founded_month":  10}]}, 
    {"$or": [{"category_code": "social"}, {"category_code": "web"}]}
    ]} 
).count()
```

###     expressive operator

*   there is this `expr` opeartor which allows us to compare b/w field value within a document among all documents.

*   find all shapes whose **width** and **height** is equal.
    ```shell
    db.shapes.find( {"$expr": {"$eq": ["$width", "$height"]}} )
    ```
    *   here `$expr` is operator which tell we are comparing with-in a document, among documents.
    *   `$eq` is that we are checking if fields are equal or not.
    *   we select the field using same `$` dollar symbol as we do with operators means `$widht` will be replaced with **value** of field `width` when comparing with other number/filds.

*   find all shapes whose **sides** are greater than `5` and **width** and **height** is equal.
    ```shell
    db.shapes.find( {"$expr": {"$and": [ 
            {"$eq": ["$width", "$height"]}, 
            {"$gt": ["$sides", 5]} 
        ]} 
    })
    ```
    *   using `expr`, we can compare field[s] within a document but if we want to do multiple different comparisons, we can use `and` operator also.

*   How many companies in the sample_training.companies collection have the same permalink as their twitter_username?
```shell
db.companies.find( {"$expr": {"$eq": ["$permalink", "$twitter_username"]}} ).count()
```

###     array operator

*   if we want to find some document acc. to it's array field value, then we use this operators;

*   find all state where `food` array-field have **atleast** `french`, `chinese`, `korean`, `punjabi` and `italian` and `size` of food array should be less than `10`.
    ```shell
    db.states.find( { "food": {"$size": {"$lt": 10}, `$all`: ["french", "chinese", "korean", "punjabi", "italian"]} } )
    ```
    *   `$size` operator will compare size of array with given number
    *   `$all` operator will check which arrays have atleast all these values i.e. `["french", "chinese", "korean", "punjabi", "italian"]`.

*   Using the sample_airbnb.listingsAndReviews collection find out how many documents have the "property_type" "House", and include "Changing table" as one of the "amenities"?
```shell
db.listingsAndReviews.find( {"property_type": "House", "amenities": {"$all": ["Changing table"]}} ).count()
```

###    projection

*   if you're dealing with a doing that have many extra fields that you dont need at the moment, then you can use `projection` to specify which fields you want or don't want to fetch if querying condition meets.

    ```shell
    db.listingsAndReviews.find({ "amenities": { "$size": 20, "$all": [ "Internet", "Wifi",  "Kitchen" ] } }, {"price": 1, "address": 1}).pretty()
    ```

    *   second argument of find function is another key-value pair (object) with this syntax
    ```shell
    find( {"conditions": true}, {"field": 1} )
    #   OR
    find( {"conditions": true}, {"field": 0} )
    ``` 
    *   `'field': 0` means you dont want to fetch specified fields.
    *   `'field': 1` means you want to fetch specified fields.
    *   you cannot use both `0` & `1` together except when you dont want `_id` field because by-default it will be fetched with resulting documents!


###     elemMatch operator

*   check if array has exactly given object (key-value_pair) or not!

*   Find all documents where the student had an `extra credit` score
```shell
db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } }}).pretty()
```

*   Find all documents where the student in class 431 received a grade higher than 85 for any type of assignment
```shell
db.grades.find({ "class_id": 431 }, { "scores": { "$elemMatch": { "score": { "$gt": 85 } } }}).pretty()
```