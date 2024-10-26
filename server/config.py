import os;
class Config:
    DEBUG = False
    TESTING = False
    SECRET_KEY = "nothing"
    SAMBANOVA_API_KEY=os.getenv("SAMBANOVA_API_KEY")
    MONGO_PASSWORD= os.getenv("SMART_TUTOR_MONGO_PASSWORD")
    MONGO_USERNAME= os.getenv("SMART_TUTOR_MONGO_USERNAME")
    MONGO_URI=f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@cluster0.par5h.mongodb.net/smartTutor?retryWrites=true&w=majority&appName=Cluster0"
