from flask import Flask, json, jsonify, render_template, request
import chats


app = Flask('app')


@app.route('/')
def index_lapa():
  return render_template('chats.html')


@app.route('/health')
def health_check():
  return "OK"


@app.route('/chats/lasi')
def ielasit_chatu():
  return chats.lasi()


@app.route('/chats/suuti', methods=['POST'])
def suutiit_zinju():
  dati = request.json
  
  chats.pieraksti_zinju(dati)

  return chats.lasi()
  

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
