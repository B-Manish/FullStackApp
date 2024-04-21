from fastapi import APIRouter,Query, HTTPException, Depends
# from config.db import conn 
from bson import ObjectId
from models.user import testuser,restaurants,cart,tobeaddedcartitem
from beanie import PydanticObjectId
import boto3
from pymongo import MongoClient

client = MongoClient("mongodb+srv://manishbatchu:Q7h5KtERcGZdfJ4E@manishcluster.71tedsw.mongodb.net/")
db = client["manishclouddb"]

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
    # pipeline=[
    #     {
    #         "$project": {
    #             "_id": 0,
    #             "veg": {
    #                 "$filter": {
    #                     "input": "$items.veg",
    #                     "as": "vegItem",
    #                     "cond": {"$eq": ["$$vegItem.mid", 6]}
    #                 }
    #             },
    #             "nonveg": {
    #                 "$filter": {
    #                     "input": "$items.nonveg",
    #                     "as": "nonvegItem",
    #                     "cond": {"$eq": ["$$nonvegItem.mid", 6]}
    #                 }
    #             }
    #         }
    #     }
    # ]
    # cartdetails = await cart.aggregate(pipeline).to_list(None)
    # return cartdetails
async def get_cart_details(mail: str = Query(None)):# makes mail optional  
    if mail is None:
        cart_id = ObjectId("66238088d6f3ad69e5a024cf")
        cartdetails = await cart.get(cart_id)
        return {"cart": cartdetails} 
    else:
        cartdetails = await cart.find_one({'username': mail})
        return {"cart": cartdetails} 


def extract_integer(price_string):
    integer_part = ''.join(filter(str.isdigit, price_string))
    integer_value = int(integer_part)
    return integer_value

@router.post('/add_to_cart')
async def add_to_cart(item:tobeaddedcartitem,mail:str= Query(None)):
    vegornonveg=""
    restaurantid=""
    restaurantname=""
    restaurantdata = await restaurants.find().to_list()
    for restaurant in restaurantdata:
        restmenu=restaurant.menu 
        veg=restmenu.veg
        nonveg=restmenu.nonveg
        if veg is not None:
            for menuitem in veg:
                if menuitem.mid==item.mid:
                    vegornonveg="veg"
                    restaurantname=restaurant.name

        if nonveg is not None:
            for menuitem in nonveg:
                if menuitem.mid==item.mid:
                    vegornonveg="nonveg"
                    restaurantname=restaurant.name

    if mail is None:
        tobeaddedtocartdetails = await cart.find_one({'username': "default"})
        pipeline = [ #pipeline to return the id of the document when username is passed
            {"$match": {"username": "default"}},
            {"$project": {"_id": {"$toString": "$_id"}}}
        ]
        # tobeaddedtocartdetails=await cart.distinct('id', {'username': "default"}) #returns unique usernames in cart collection
    else:
        tobeaddedtocartdetails = await cart.find_one({'username': mail})
        pipeline = [
            {"$match": {"username": mail}},
            {"$project": {"_id": {"$toString": "$_id"}}}
        ]


    cartdocument = await cart.aggregate(pipeline).to_list()
    id=cartdocument[0]["_id"]

    # dbcart = db["cart"] to update a mongodb document
    
    # updated_data = {"$set": {"restaurantname":"Ovenstory3"}}
    # if id is not None:
    #     dbcart.update_one({"_id": ObjectId(id)}, updated_data)

    # check if the mid exists

    cartveg=tobeaddedtocartdetails.items.veg
    cartnonveg=tobeaddedtocartdetails.items.nonveg

    carthasitem=False
    itemindex=0

    if cartveg is not None:
        for index, vegitem in enumerate(cartveg):
            if vegitem.mid==item.mid:
                carthasitem=True
                itemindex=index
            
                

    if cartnonveg is not None:
        for index, nonvegitem in enumerate(cartnonveg):
            if nonvegitem.mid==item.mid:
                carthasitem=True
                itemindex=index 

    dbcart = db["cart"]
    

    # dbcart.update_one({ "_id": ObjectId(id) }, {"$set": {field: 5}} )
    # dbcart.update_one({ "_id": ObjectId(id) },{ "$set": { "items.veg.0.quantity": 4 } }) # updates 
    
    billdetailsquantityfield=f"billdetails.totalQuantity" # gets the field which is to be updated
    billdetailstotalfield=f"billdetails.total"
    if carthasitem==True:
        if item.vegornonveg=="veg":
            field = f"items.veg.{itemindex}.quantity" 
            dbcart.update_one({ "_id": ObjectId(id)},{"$inc": {field: 1,billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)}})

        if item.vegornonveg=="nonveg":
            field = f"items.nonveg.{itemindex}.quantity"
            dbcart.update_one({ "_id": ObjectId(id)},{"$inc": {field: 1,billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)}})

    else:
        print("entered else")
        if item.vegornonveg=="veg":
            dbcart.update_one({ "_id": ObjectId(id)},{"$inc":{billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)},"$push": {"items.veg": {"mid": item.mid,"name": item.name,"price": item.price,"rating": item.rating,"quantity": 1}}}) 

        if item.vegornonveg=="nonveg":
            dbcart.update_one({ "_id": ObjectId(id)},{"$inc":{billdetailsquantityfield:1,billdetailstotalfield:extract_integer(item.price)},"$push": {"items.nonveg": {"mid": item.mid,"name": item.name,"price": item.price,"rating": item.rating,"quantity": 1}}})      
              

    
    return {"restaurantname":restaurantname, "type":vegornonveg,"tobeaddedtocartdetails":tobeaddedtocartdetails,"id":id } 




@router.get('/get_presigned_url')
async def generate_presigned_url():
    s3_client = boto3.client('s3')
    presigned_url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': "fullstackapp", 'Key':"saravanabhavan.png"})

    return presigned_url




       







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






