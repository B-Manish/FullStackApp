# from fastapi import APIRouter,Query, HTTPException, Depends,FastAPI, UploadFile, File
# import boto3
# import uuid
# from .keys import ACCESS_KEY_ID,SECRET_ACCESS_KEY
# from models.user import cart,updatecart
# from decimal import Decimal
# import uuid
# from boto3.dynamodb.conditions import Attr

# router = APIRouter() 

# dynamodb = boto3.resource('dynamodb',
#                     aws_access_key_id = ACCESS_KEY_ID,
#                     aws_secret_access_key = SECRET_ACCESS_KEY,
#                     region_name='ap-south-1'
#                           )




# @router.get("/getAllRestaurants")
# def get_all_restaurants(
#     category: str = Query(None, description="Category to filter restaurants (case-insensitive)"),
#     search: str = Query(None, description="Search term to filter restaurants by name, type, or locations (case-insensitive)"),
#     ispureveg: bool = Query(None, description="Filter for pure vegetarian restaurants (True for veg only, False for all)")
# ):
#     if search == "":
#         return []

#     table = dynamodb.Table('restaurants')
    
#     response = table.scan()
#     items = response.get("Items", [])

#     if category:
#         category_lower = category.lower()

#         items = [
#             item for item in items
#             if any(category_lower in typ.lower() for typ in item.get("type", []))
#         ]
    
#     if search:
#         if len(search) < 2:
#             return []
        
#         search_lower = search.lower()

#         items = [
#             item for item in items
#             if search_lower in item.get("name", "").lower()
#             or any(search_lower in loc.lower() for loc in item.get("locations", []))
#             or any(search_lower in typ.lower() for typ in item.get("type", []))
#         ]
    
#     if ispureveg is not None:
#         if ispureveg:
#             items = [item for item in items if item.get("ispureveg", False) == True]
#     return items


# @router.post("/createRestaurant")
# async def submitdata(data:dict):
#     table = dynamodb.Table('restaurants')
    
#     item = {
#        'restaurant_id': str(uuid.uuid4()),
#         'name': data['name'],
#     }
#     table.put_item(Item = item)
#     return "data submitted successfully"


# @router.get("/getRestaurant/{restaurant_id}")
# async def get_restaurant(restaurant_id: str):
#     table = dynamodb.Table('restaurants')
    
#     try:
#         response = table.get_item(Key={'restaurant_id': restaurant_id})
#         item = response.get('Item')
        
#         if item:
#             return {"restaurant":item}
#         else:
#             raise HTTPException(status_code=404, detail="Restaurant not found")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
    
# @router.get("/getCartDetails/{username}")
# async def get_cart(username: str):
#     table = dynamodb.Table('cart')
    
#     try:
#         response = table.get_item(Key={'username': username})
#         cart = response.get('Item')
        
#         if cart:
#             return {"cart":cart}
#         else:
#             raise HTTPException(status_code=404, detail="Cart not found")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))  
    
    
# @router.get('/get_presigned_url')
# async def generate_presigned_url(key):
#     # key="ovenstory.png"
#     s3_client = boto3.client('s3')
#     presigned_url = s3_client.generate_presigned_url(
#         'get_object',
#         Params={'Bucket': "fullstackapp", 'Key':key})

#     return presigned_url



# @router.post("/addToCart")
# async def submitdata(testItem:cart):
#     table = dynamodb.Table('cart')
    
#     item = testItem.dict()
        
#     item['billdetails']["gst"]=Decimal(str(item['billdetails']["gst"])) 
    
#     table.put_item(Item = item)
#     return "data submitted successfully"    


# @router.put("/cart/{username}")
# async def update_item(username:str,cartitem:updatecart):
#     table = dynamodb.Table('cart')
#     response = table.update_item(
#         Key={'username': username},
#         UpdateExpression="SET items_count = :items_count,  billdetails = :billdetails,#items = :items,branch=:branch,restaurant_id=:restaurant_id,restaurant_name=:restaurant_name",
#           ExpressionAttributeNames={
#             '#items': 'items'  # since 'items' is a reserved keyword 
#         },
#         ExpressionAttributeValues={
#             ':items_count': cartitem.items_count,
#             ':items': list(filter(lambda item: item['count'] != 0, cartitem.items)),  #removes the items with count=0
#             ':billdetails': cartitem.billdetails,
#             ':branch': cartitem.branch,
#             ':restaurant_id': cartitem.restaurant_id,
#             ':restaurant_name': cartitem.restaurant_name


#         },
#         ReturnValues="UPDATED_NEW"  
#     )
#     return {"message": "Item updated successfully", "updated_attributes": response['Attributes']}


# @router.get("/getOrder/{orderid}")
# async def get_cart(orderid: str):
#     table = dynamodb.Table('orders')
    
#     try:
#         response = table.get_item(Key={'order_id': orderid})
#         order = response.get('Item')
        
#         if cart:
#             return {"order":order}
#         else:
#             raise HTTPException(status_code=404, detail="Order not found")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e)) 


# @router.get("/getAllOrders")
# def get_all_orders(page: int = Query(1, ge=1), count: int = Query(10, ge=1)):
#     table = dynamodb.Table('orders')
#     total_items_response = table.scan(Select='COUNT')
#     total_items = total_items_response['Count']

#     limit = count
#     start_key = None
    
#     for _ in range(page - 1):
#         response = table.scan(Limit=limit, ExclusiveStartKey=start_key) if start_key else table.scan(Limit=limit)
#         start_key = response.get('LastEvaluatedKey')
#         if not start_key:
#             return {"orders": []}
    
#     response = table.scan(Limit=limit, ExclusiveStartKey=start_key) if start_key else table.scan(Limit=limit)
    
#     return {
#         "count":total_items,
#         "orders": response["Items"]
        
#     } 
    
    
# @router.get("/getCategories")
# def getall():
#     table = dynamodb.Table('categories')
#     items = table.scan()
#     return {"categories":items["Items"]}      


from fastapi import APIRouter,Query,HTTPException
import boto3
from keys import ACCESS_KEY_ID,SECRET_ACCESS_KEY
from enum import Enum
from typing import Optional
from boto3.dynamodb.conditions import Key
from models.user import address
import uuid

router = APIRouter() 

dynamodb = boto3.resource('dynamodb',
                    aws_access_key_id = ACCESS_KEY_ID,
                    aws_secret_access_key = SECRET_ACCESS_KEY,
                    region_name='ap-south-1'
                          )




@router.get("/v2/getAllRestaurants")
def getallRestaurants(city: str, rating: Optional[float] = None, cuisine: Optional[str] = None):
    table = dynamodb.Table(city)
    items = table.scan()

    restaurants = []
    data = items["Items"]

    for singlearea in data:
        area = singlearea["area"]
        for restaurant in singlearea["restaurants"]:
            restaurant_data = restaurant["restaurant_data"]
            if rating is None or float(restaurant_data.get("rating", 0)) >= rating:
                if cuisine is None or cuisine in restaurant_data.get("cuisine", []):
                    restaurant_data["area"] = area
                    restaurant_data.pop("menu", None)  # to remove menu from each restaurant
                    restaurants.append(restaurant)

    return {"restaurants": restaurants}


class FoodType(str, Enum):
    all = "All"
    veg = "Veg"
    non_veg = "Non-veg"

@router.get("/v2/getRestaurant/{restaurant_id}")
async def get_restaurant(
    city: str, 
    restaurant_id: str, 
    food_type: FoodType = Query(FoodType.all, description="Choose Veg, Non-Veg, or All")
):
    table = dynamodb.Table(city)
    items = table.scan()

    for area_info in items["Items"]:
        for restaurant in area_info['restaurants']:
            if restaurant['restaurant_id'] == restaurant_id:
                
                if food_type == FoodType.all:
                    return restaurant  # Return the full menu without filtering

                filtered_menu = {}
                for category, dishes in restaurant["restaurant_data"]["menu"].items():
                    filtered_dishes = {
                        dish_name: details for dish_name, details in dishes.items()
                        if (food_type == FoodType.veg and details["veg_or_non_veg"] == "Veg") or
                           (food_type == FoodType.non_veg and details["veg_or_non_veg"] == "Non-veg")
                    }
                    if filtered_dishes:
                        filtered_menu[category] = filtered_dishes

                restaurant["restaurant_data"]["menu"] = filtered_menu
                return restaurant

    return None


@router.get("/getCategories")
def getall():
    table = dynamodb.Table('categories')
    items = table.scan()
    return {"categories":items["Items"]}    



@router.get("/getAllOrders")
def get_all_orders(page: int = Query(1, ge=1), count: int = Query(10, ge=1)):
    table = dynamodb.Table('orders')
    total_items_response = table.scan(Select='COUNT')
    total_items = total_items_response['Count']

    limit = count
    start_key = None
    
    for _ in range(page - 1):
        response = table.scan(Limit=limit, ExclusiveStartKey=start_key) if start_key else table.scan(Limit=limit)
        start_key = response.get('LastEvaluatedKey')
        if not start_key:
            return {"orders": []}
    
    response = table.scan(Limit=limit, ExclusiveStartKey=start_key) if start_key else table.scan(Limit=limit)
    
    return {
        "count":total_items,
        "orders": response["Items"]
        
    } 



@router.get("/getAddresses/{email}")
def getall(email:str):
    table = dynamodb.Table('addresses')
    items = table.scan()

    for user in items["Items"]:
        if user['email'] == email:
            return user


@router.put("/updateAddress/{email}/{adressId}")
def update_address(email: str, adressId: str, new_address: address):
    table = dynamodb.Table('addresses')
    
    try:
        # Fetch the item based on the email
        response = table.query(
            KeyConditionExpression=Key('email').eq(email)
        )

        if 'Items' not in response or len(response['Items']) == 0:
            raise HTTPException(status_code=404, detail="Email not found")
        
        # Extract the user data
        user = response['Items'][0]

        # Find the address in the addresses array based on adressId
        updated_addresses = user['addresses']
        address_found = False
        
        for index, address in enumerate(updated_addresses):
            if address['adressId'] == adressId:
                updated_addresses[index] = new_address.dict()  # Replace the entire address object
                address_found = True
                break
        
        if not address_found:
            raise HTTPException(status_code=404, detail="Address not found")
        
        # Update the item in DynamoDB
        table.update_item(
            Key={
                'email': email
            },
            UpdateExpression="SET addresses = :addresses",
            ExpressionAttributeValues={
                ':addresses': updated_addresses
            },
            ReturnValues="UPDATED_NEW"
        )

        return {"message": "Address updated successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.put("/addAddress/{email}")
def add_address(email: str, new_address: dict):
    table = dynamodb.Table('addresses')
    
    try:
        # Fetch the item based on the email
        response = table.query(
            KeyConditionExpression=Key('email').eq(email)
        )

        if 'Items' not in response or len(response['Items']) == 0:
            raise HTTPException(status_code=404, detail="Email not found")
        
        # Extract the user data
        user = response['Items'][0]

        # # Find the address in the addresses array based on adressId
        updated_addresses = user['addresses']
        # address_found = False
        
        new_address['adressId']=str(uuid.uuid4())
        updated_addresses.append(new_address)
                
        
        # if not address_found:
        #     raise HTTPException(status_code=404, detail="Address not found")
        
        # Update the item in DynamoDB
        table.update_item(
            Key={
                'email': email
            },
            UpdateExpression="SET addresses = :addresses",
            ExpressionAttributeValues={
                ':addresses': updated_addresses
            },
            ReturnValues="UPDATED_NEW"
        )

        return {"message": "Address updated successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.put("/deleteAddress/{email}/{adressId}")
def delete_address(email: str, adressId: str):
    table = dynamodb.Table('addresses')
    
    try:
        # Fetch the item based on the email
        response = table.query(
            KeyConditionExpression=Key('email').eq(email)
        )

        if 'Items' not in response or len(response['Items']) == 0:
            raise HTTPException(status_code=404, detail="Email not found")
        
        # Extract the user data
        user = response['Items'][0]

        # Find the address in the addresses array based on adressId
        updated_addresses = user['addresses']
        
        for index,address in enumerate(updated_addresses):
            if address['adressId'] == adressId:
                updated_addresses.pop(index)
                break

        
        # Update the item in DynamoDB
        table.update_item(
            Key={
                'email': email
            },
            UpdateExpression="SET addresses = :addresses",
            ExpressionAttributeValues={
                ':addresses': updated_addresses
            },
            ReturnValues="UPDATED_NEW"
        )

        return {"mesage": "succesfullt deleted the address"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


