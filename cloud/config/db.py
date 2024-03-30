from pymongo import MongoClient
from beanie import init_beanie

conn=MongoClient("mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/")
db=conn.manishclouddb
init_beanie(database=db)
