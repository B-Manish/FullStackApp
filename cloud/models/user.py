from pydantic import BaseModel
from beanie import Document

class User(BaseModel):
    name:str
    email:str
    password:str

class testuser(Document): 
    name:str
    age:int   
    