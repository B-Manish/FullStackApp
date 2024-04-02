from pydantic import BaseModel
from beanie import Document
from typing import List, Optional

class testuser(Document): 
    name:str
    age:int 


class menuitem(BaseModel):
    name:str
    price:str
    rating:float

class menu(BaseModel): 
    veg:List[menuitem]  
    nonveg:Optional[List[menuitem]] = None

class restaurants(Document):
    name:str
    type:List[str]
    locations:List[str]
    timings:str
    rating:float
    menu:menu


    