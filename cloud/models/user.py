from pydantic import BaseModel
from beanie import Document
from typing import List, Optional

class testuser(Document): 
    name:str
    age:int 


class menuitem(BaseModel):
    mid:int
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
    img:str
    key:str


class cartitem(BaseModel):
    mid:int
    name:str
    price:str
    rating:float
    quantity:int

class tobeaddedcartitem(BaseModel):
    mid:int
    name:str
    vegornonveg:str
    price:str
    rating:float   

class cartmenu(BaseModel): 
    veg:Optional[List[cartitem]] = None     
    nonveg:Optional[List[cartitem]] = None 


class billDetails(BaseModel):
    deliveryFee: int
    hasOne: bool
    platformFee: int
    gst: int
    total: int
    totalQuantity:int



class cart(Document):
    username:str
    restaurantname:Optional[str]=None
    items:Optional[cartmenu]=None
    billdetails:Optional[billDetails]=None



    