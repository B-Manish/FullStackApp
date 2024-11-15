from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user
# from config.db import init
from contextlib import asynccontextmanager

 
app = FastAPI()
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    #  await init()
 
     yield
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
 
 
 
 
 
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)    



 