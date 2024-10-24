import os;
class Config:
    DEBUG = False
    TESTING = False
    SECRET_KEY = "nothing"
    MONGO_PASSWORD= os.getenv("SMART_TUTOR_MONGO_PASSWORD")
    MONGO_USERNAME= os.getenv("SMART_TUTOR_MONGO_USERNAME")
    MONGO_URI=f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@cluster0.par5h.mongodb.net/smartTutor?retryWrites=true&w=majority&appName=Cluster0"
