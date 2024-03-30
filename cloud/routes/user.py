from fastapi import APIRouter,Query, HTTPException, Depends
from models.user import User 
from config.db import conn 
from bson import ObjectId
from models.user import testuser
from beanie import PydanticObjectId

user = APIRouter() 


# @user.get('/get_test_data')
# async def get_test_collection_data():
#     return serializeList(conn.manishclouddb.testcollection.find())

# @user.get("/search_restaurant")
# async def search_restaurant(
#     restaurant_name: str ,
#     menu_item_name: str
# ):
#     query = {}
#     if restaurant_name:
#         query["$or"] = [{"name": {"$regex": f".*{restaurant_name}.*", "$options": "i"}}]
#     if menu_item_name:
#         query["$or"].append({"menu.name": {"$regex": f".*{menu_item_name}.*", "$options": "i"}}) if "$or" in query else query.update({"menu.name": {"$regex": f".*{menu_item_name}.*", "$options": "i"}})

#     pipeline = [
#         {"$match": query},
#         {"$unwind": "$menu"},
#         {"$match": query}
#     ]

#     result = serializeList(conn.manishclouddb.testcollection.aggregate(pipeline))


#     return {"results":result}



# @user.get("/get_password")
# async def search_restaurant(
# username: str 
# ):
#     pipeline = [
#         {"$match": { "username": username }},
#         {"$project":  { "_id": 0, "password": 1,"uid":1 }},# hide _id and show password 
#     ]

#     result =serializeList(conn.manishclouddb.users.aggregate(pipeline))


#     return {"uid":result[0]["uid"], "username": username,"password":result[0]["password"]}

async def get_user(user_id: PydanticObjectId) -> testuser:
    user = await testuser.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return user


@user.get('/test_get_api')
async def test_get_api(testuser: User = Depends(get_user)):
    return testuser

@user.get('/test')
async def test():
    return {"gg":"wp"}
