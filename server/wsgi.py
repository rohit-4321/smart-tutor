from time import sleep
from app import create_app


app = create_app()

@app.before_request
def before_request_func():
    sleep(0.5) 

if __name__ == "__main__":
    app.run()