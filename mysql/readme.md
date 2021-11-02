#   mysql

trying to understand SQL database with code!

*   tried using it thru commandline and leart quiet a bit, now thinking about using it in a simple webapp as database.
*   Will aim to learn some commands of mysql, maybe will get handy in interviews someday 😉



##  some queries

*   create new database
    ```sql
    CREATE DATABASE world;
    ```

*   create new table
    ```sql
    CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
        species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
    ```

*   check table metadata/schema
    ```sql
    DESCRIBE pet;
    ```

