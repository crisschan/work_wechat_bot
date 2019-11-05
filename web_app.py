#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2019/11/1 3:54 PM
# @Author  : Criss Chan
# @Site    : https://blog.csdn.net/crisschan
# @File    : web_app.py.py
# @Software: PyCharm
# @instruction：

from flask import Flask, render_template, request, abort, jsonify
from work_webchat_robot import workWechat, MSGTYPE
import json

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    rfjson = open('bot_config.json', 'r')

    bots = json.loads(rfjson.readline())
    if request.method == 'GET':

        # print(bots)
        return render_template('index.html', bots=bots)
    elif request.method == 'POST':
        article_type = request.form['articletype']
        phone = request.form['phone']
        robot = request.form['robot']
        detail = request.form['detail']

        wwc = workWechat(str(robot),
                         MSGTYPE(article_type.lower()),
                         str(detail),
                         mentioned_mobile_list=str(phone))
        return render_template('index.html', bots=bots)


@app.route('/webotapi/', methods=['POST'])
def webotapi():
    if not request.json or 'articletype' not in request.json or 'phone' not in request.json or 'robot' not in request.json or 'detail' not in request.json:
        return jsonify({'code': '9999', 'mesg': 'faile parms'})
    else:

        article_type = request.args['articletype']
        phone = request.args['phone']
        robot = request.args['robot']
        detail = request.args['detail']

        wwc = workWechat(str(robot),
                         MSGTYPE(article_type.lower()),
                         str(detail),
                         mentioned_mobile_list=str(phone))
        return jsonify({'code': '0000', 'mesg': 'sucess'})


if __name__ == "__main__":
    app.run(debug=True, port=8080)
