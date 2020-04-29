from flask import json, jsonify


LOGFAILS = "chats.txt"


def lasi():
    chata_rindas = []
    with open(LOGFAILS, "r", encoding="utf-8") as f:
        for rinda in f:
            chata_rindas.append(json.loads(rinda))
    return jsonify({"chats": chata_rindas})


def pieraksti_zinju(dati):
    with open(LOGFAILS, "a", newline="", encoding="utf-8") as f:
        f.write(json.dumps(dati["chats"]) + "\n")

