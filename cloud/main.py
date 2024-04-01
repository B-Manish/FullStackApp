# import motor
# from beanie import init_beanie
# from fastapi import FastAPI
# from routes.user import user


# app=FastAPI()
# from models.user import Testuser


# class Settings():

#     @property
#     def mongo_dsn(self):
#         return f"mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/"


# @app.on_event("startup")
# async def app_init():
#     # CREATE MOTOR CLIENT
#     client = motor.motor_asyncio.AsyncIOMotorClient(
#         Settings().mongo_dsn
#     )

#     # INIT BEANIE
#     await init_beanie(database=client.manishclouddb, document_models=[Testuser])

#     # ADD ROUTES
#     app.include_router(user)



# from typing import Optional

# from motor.motor_asyncio import AsyncIOMotorClient
# from pydantic import BaseModel
# from fastapi import FastAPI
# from routes.user import user

# from beanie import Document, Indexed, init_beanie
# app=FastAPI()

# class Category(BaseModel):
#     name: str
#     description: str

# class Testuser(Document): 
#     name:str
#     age:int   

# @app.on_event("startup")
# async def init():

#     client = AsyncIOMotorClient("mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/")


#     await init_beanie(database=client.manishclouddb, document_models=[Testuser])

#     app.include_router(user)
    


import asyncio
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

from beanie import Document, Indexed, init_beanie


class testuser(Document): 
    name:str
    age:int   


async def example():
    client = AsyncIOMotorClient("mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/")

    await init_beanie(database=client.manishclouddb, document_models=[testuser])

    test_testuser = testuser(name="gg", age=2)
    await test_testuser.insert() 



if __name__ == "__main__":
    asyncio.run(example())



 