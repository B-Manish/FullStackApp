from fastapi import FastAPI
from routes import User
from config.db import init
from contextlib import asynccontextmanager
 
app = FastAPI()
 
 
 
@asynccontextmanager
async def lifespan(app: FastAPI):
     await init()
 
     yield
app = FastAPI(lifespan=lifespan)
app.include_router(User.router)
 
 
 
 
 
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)    



 