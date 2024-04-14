from fastapi import APIRouter,Query, HTTPException, Depends
# from config.db import conn 
from bson import ObjectId
from models.user import testuser,restaurants,cart
from beanie import PydanticObjectId

router = APIRouter() 

async def get_user(user_id: PydanticObjectId) -> testuser:
    user = await testuser.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return user


@router.get('/test_get_api')
async def test_get_api(testuser: testuser = Depends(get_user)):
    return testuser

@router.get('/gg')
async def gg(user_id: PydanticObjectId):
    user = await testuser.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return user

@router.post('/add_user')
async def adduser(name,age):
    user = testuser(name=name, age=age)
    await user.insert()

@router.post('/add_users')
async def addusers(details:testuser):
    user = testuser(name=details.name, age=details.age)
    await user.insert()

@router.get('/gg')
async def test_get_api(testuser: testuser = Depends(get_user)):
    return testuser




@router.get('/get_restaurants')
async def get_restaurants():
    restaurantdata = await restaurants.find().to_list()
    if restaurantdata is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"restaurantdata":restaurantdata}

@router.get('/get_restaurant_details/{id}')
async def get_restaurant_data(id: PydanticObjectId):
    restaurant = await restaurants.get(id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"restaurant":restaurant}


@router.get('/get_cart_details/')
async def get_cart_details(mail: str = Query(None)):  
    if mail is None:
        cart_id = ObjectId("661c2f59628892a1178dd693")
        cartdetails = await cart.get(cart_id)
        return {"cart": cartdetails} 
    return {"gg": "wp"}


@router.post('/add_to_cart')
async def add_to_cart(menuitemid:int):
    vegornonveg=""
    restaurantid=""
    restaurantdata = await restaurants.find().to_list()
    for restaurant in restaurantdata:
         # ask how to set id
        restmenu=restaurant.menu 
        print(restmenu)
        veg=restmenu.veg
        nonveg=restmenu.nonveg
        if veg is not None:
            for menuitem in veg:
                if menuitem.mid==menuitemid:
                    vegornonveg="veg"
                    restaurantname=restaurant.name

        if nonveg is not None:
            for menuitem in nonveg:
                if menuitem.mid==menuitemid:
                    vegornonveg="nonveg"
                    restaurantname=restaurant.name

    return {"restaurantname":restaurantname, "type":vegornonveg } 






       







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






