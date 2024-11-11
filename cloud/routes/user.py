# from fastapi import APIRouter,Query, HTTPException, Depends
# # from config.db import conn 
# from bson import ObjectId
# from models.user import testuser,restaurants,cart,tobeaddedcartitem
# from beanie import PydanticObjectId
# import boto3
# from pymongo import MongoClient

# client = MongoClient("mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/")
# db = client["manishclouddb"]

# router = APIRouter() 

# @router.get('/get_cart_details/')
#     # pipeline=[
#     #     {
#     #         "$project": {
#     #             "_id": 0,
#     #             "veg": {
#     #                 "$filter": {
#     #                     "input": "$items.veg",
#     #                     "as": "vegItem",
#     #                     "cond": {"$eq": ["$$vegItem.mid", 6]}
#     #                 }
#     #             },
#     #             "nonveg": {
#     #                 "$filter": {
#     #                     "input": "$items.nonveg",
#     #                     "as": "nonvegItem",
#     #                     "cond": {"$eq": ["$$nonvegItem.mid", 6]}
#     #                 }
#     #             }
#     #         }
#     #     }
#     # ]
#     # cartdetails = await cart.aggregate(pipeline).to_list(None)
#     # return cartdetails
# async def get_cart_details(mail: str = Query(None)):# makes mail optional  
#     if mail is None:
#         cart_id = ObjectId("66238088d6f3ad69e5a024cf")
#         cartdetails = await cart.get(cart_id)
#         return {"cart": cartdetails} 
#     else:
#         cartdetails = await cart.find_one({'username': mail})
#         return {"cart": cartdetails} 


# def extract_integer(price_string):
#     integer_part = ''.join(filter(str.isdigit, price_string))
#     integer_value = int(integer_part)
#     return integer_value

# @router.post('/add_to_cart')
# async def add_to_cart(item:tobeaddedcartitem,mail:str= Query(None)):
#     try:
#         if mail is None:
#             tobeaddedtocartdetails = await cart.find_one({'username': "default"})
#             pipeline = [ #pipeline to return the id of the document when username is passed
#             {"$match": {"username": "default"}},
#             {"$project": {"_id": {"$toString": "$_id"}}}
#         ]
#         # tobeaddedtocartdetails=await cart.distinct('id', {'username': "default"}) #returns unique usernames in cart collection
#         else:
#             tobeaddedtocartdetails = await cart.find_one({'username': mail})
#             pipeline = [
#             {"$match": {"username": mail}},
#             {"$project": {"_id": {"$toString": "$_id"}}}
#         ]
        
        


#         cartdocument = await cart.aggregate(pipeline).to_list()
#         id=cartdocument[0]["_id"]

#         # dbcart = db["cart"] to update a mongodb document
    
#         # updated_data = {"$set": {"restaurantname":"Ovenstory3"}}
#         # if id is not None:
#         #     dbcart.update_one({"_id": ObjectId(id)}, updated_data)

#         # check if the mid exists

#         cartveg=tobeaddedtocartdetails.items.veg
#         cartnonveg=tobeaddedtocartdetails.items.nonveg

#         carthasitem=False
#         itemindex=0
        
#         if cartveg is not None:
#             for index, vegitem in enumerate(cartveg):
#                 if vegitem.mid==item.mid:
#                     carthasitem=True
#                     itemindex=index
                    
#             if cartnonveg is not None:
#                 for index, nonvegitem in enumerate(cartnonveg):
#                     if nonvegitem.mid==item.mid:
#                         carthasitem=True
#                         itemindex=index            
            
        
#         dbcart = db["cart"]
    

#         # dbcart.update_one({ "_id": ObjectId(id) }, {"$set": {field: 5}} )
#         # dbcart.update_one({ "_id": ObjectId(id) },{ "$set": { "items.veg.0.quantity": 4 } }) # updates 
    
#         billdetailsquantityfield=f"billdetails.totalQuantity" # gets the field which is to be updated
#         billdetailstotalfield=f"billdetails.total"
#         if carthasitem==True:
#             if item.vegornonveg=="veg":
#                 field = f"items.veg.{itemindex}.quantity" 
#                 dbcart.update_one({ "_id": ObjectId(id)},{"$inc": {field: 1,billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)}})

#             if item.vegornonveg=="nonveg":
#                 field = f"items.nonveg.{itemindex}.quantity"
#                 dbcart.update_one({ "_id": ObjectId(id)},{"$inc": {field: 1,billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)}})

#         else:
#             if item.vegornonveg=="veg":
#                 dbcart.update_one({ "_id": ObjectId(id)},{"$inc":{billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)},"$push": {"items.veg": {"mid": item.mid,"name": item.name,"price": item.price,"rating": item.rating,"quantity": 1}}}) 

#             if item.vegornonveg=="nonveg":
#                 dbcart.update_one({ "_id": ObjectId(id)},{"$inc":{billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)},"$push": {"items.nonveg": {"mid": item.mid,"name": item.name,"price": item.price,"rating": item.rating,"quantity": 1}}})      
              

    
#         return "Succesfully updated cart"
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
        

       

# # @user.get("/search_restaurant")
# # async def search_restaurant(
# #     restaurant_name: str ,
# #     menu_item_name: str
# # ):
# #     query = {}
# #     if restaurant_name:
# #         query["$or"] = [{"name": {"$regex": f".*{restaurant_name}.*", "$options": "i"}}]
# #     if menu_item_name:
# #         query["$or"].append({"menu.name": {"$regex": f".*{menu_item_name}.*", "$options": "i"}}) if "$or" in query else query.update({"menu.name": {"$regex": f".*{menu_item_name}.*", "$options": "i"}})

# #     pipeline = [
# #         {"$match": query},
# #         {"$unwind": "$menu"},
# #         {"$match": query}
# #     ]

# #     result = serializeList(conn.manishclouddb.testcollection.aggregate(pipeline))


# #     return {"results":result}



# # @user.get("/get_password")
# # async def search_restaurant(
# # username: str 
# # ):
# #     pipeline = [
# #         {"$match": { "username": username }},
# #         {"$project":  { "_id": 0, "password": 1,"uid":1 }},# hide _id and show password 
# #     ]

# #     result =serializeList(conn.manishclouddb.users.aggregate(pipeline))


# #     return {"uid":result[0]["uid"], "username": username,"password":result[0]["password"]}






from fastapi import APIRouter,Query, HTTPException, Depends,FastAPI, UploadFile, File
from bson import ObjectId
from beanie import PydanticObjectId
import boto3
from pymongo import MongoClient
import uuid
# from fastapi import FastAPI, UploadFile, File
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from .keys import ACCESS_KEY_ID,SECRET_ACCESS_KEY
from pydantic import BaseModel, Field
from typing import List
from models.user import cartitem,cart,updatecart
from decimal import Decimal
import uuid

router = APIRouter() 

dynamodb = boto3.resource('dynamodb',
                    aws_access_key_id = ACCESS_KEY_ID,
                    aws_secret_access_key = SECRET_ACCESS_KEY,
                    region_name='ap-south-1'
                          )




@router.get("/getAllRestaurants")
def getall():
    table = dynamodb.Table('restaurants')
    items = table.scan()
    print(items)
    return items["Items"]

@router.post("/createRestaurant")
async def submitdata(data:dict):
    table = dynamodb.Table('restaurants')
    
    item = {
       'restaurant_id': str(uuid.uuid4()),
        'name': data['name'],
    }
    table.put_item(Item = item)
    return "data submitted successfully"


@router.get("/getRestaurant/{restaurant_id}")
async def get_restaurant(restaurant_id: str):
    table = dynamodb.Table('restaurants')
    
    try:
        response = table.get_item(Key={'restaurant_id': restaurant_id})
        item = response.get('Item')
        
        if item:
            return {"restaurant":item}
        else:
            raise HTTPException(status_code=404, detail="Restaurant not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.get("/getCartDetails/{username}")
async def get_cart(username: str):
    table = dynamodb.Table('cart')
    
    try:
        response = table.get_item(Key={'username': username})
        cart = response.get('Item')
        
        if cart:
            return {"cart":cart}
        else:
            raise HTTPException(status_code=404, detail="Cart not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  
    
    
@router.get('/get_presigned_url')
async def generate_presigned_url(key):
    # key="ovenstory.png"
    s3_client = boto3.client('s3')
    presigned_url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': "fullstackapp", 'Key':key})

    return presigned_url



@router.post("/addToCart")
async def submitdata(testItem:cart):
    table = dynamodb.Table('cart')
    
    item = testItem.dict()
        
    item['billdetails']["gst"]=Decimal(str(item['billdetails']["gst"])) 
    
    table.put_item(Item = item)
    return "data submitted successfully"    


@router.put("/cart/{username}")
async def update_item(username:str,cartitem:updatecart):
    table = dynamodb.Table('cart')
    response = table.update_item(
        Key={'username': username},
        UpdateExpression="SET items_count = :items_count,  billdetails = :billdetails,#items = :items,branch=:branch,restaurant_id=:restaurant_id,restaurant_name=:restaurant_name",
          ExpressionAttributeNames={
            '#items': 'items'  # since 'items' is a reserved keyword 
        },
        ExpressionAttributeValues={
            ':items_count': cartitem.items_count,
            ':items': list(filter(lambda item: item['count'] != 0, cartitem.items)),  
            ':billdetails': cartitem.billdetails,
            ':branch': cartitem.branch,
            ':restaurant_id': cartitem.restaurant_id,
            ':restaurant_name': cartitem.restaurant_name


        },
        ReturnValues="UPDATED_NEW"  
    )
    return {"message": "Item updated successfully", "updated_attributes": response['Attributes']}



# @router.post("/createRestaurant")
# async def submitdata():
#     table = dynamodb.Table('restaurants')
    
#     item = {
#        'restaurant_id': str(uuid.uuid4()),
#         'name':"ok",
#     }
#     table.put_item(Item = item)
#     return "data submitted successfully"

