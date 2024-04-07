from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from models.user import testuser,restaurants,cart

async def init():
    client=AsyncIOMotorClient("mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/")
    db=client.manishclouddb

    await init_beanie(database=db , document_models=[testuser,restaurants,cart])
