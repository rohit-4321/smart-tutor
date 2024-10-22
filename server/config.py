class Config:
    DEBUG = False
    TESTING = False
    SECRET_KEY = "nothing"

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True