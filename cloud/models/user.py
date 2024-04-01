from pydantic import BaseModel
from beanie import Document

class testuser(Document): 
    name:str
    age:int   
    