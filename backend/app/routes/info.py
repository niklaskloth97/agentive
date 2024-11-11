from app import app

@app.route('/info')
def info():
    return 'Hello, Agentive!'
