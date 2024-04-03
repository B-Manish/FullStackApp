from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import User
from config.db import init
from contextlib import asynccontextmanager

 
app = FastAPI()
 
origins = [
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:5000/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
@asynccontextmanager
async def lifespan(app: FastAPI):
     await init()
 
     yield
app = FastAPI(lifespan=lifespan)
app.include_router(User.router)
 
 
 
 
 
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)    



 