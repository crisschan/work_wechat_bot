# 企业微信群机器人消息发送和管理

## 使用方法

在bot_config配置机器人的回调地址和机器人别名，运行web_app后，会在8080启动服务，访问127.0.0.1：8080就可以访问了
其中机器人的配置如下：

    [{"botname":"bot","webhook":"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b425177c-3eee-48c4-82a0-"}]

## 简介

基于flask做了web的封装，可以发送文本、markdown、微信文章类型的消息，提供了ui的发送消息的方式，同时也提供了接口访问。

## 接口说明

    {
     "articletype"："文章类型，可以指定text、markdown和news，必须小写其中text是文本类型消息、markdown是markdown类型消息，news是微信文章"，
     "phone"："要@的人通过电话标记，如果没有需要传入@all参数",
     "robot":"webhook的回调地址",
     "detail":"文章的详细信息"
    }

   其中，robot的webhook要现在企业微信里面建立一个群，然后点击右上角的图标后，点击群机器人，添加完成后，可以看到一个webook地址，这个参数就是这个地址。
        detail：如果articletype是text，这里面就是string；如果articletype，那么这里就要写markdown文本；如果articletype是news，那么detail要遵循如下格式：

       {
                "title" : "测者陈磊",
                "description" : "测者陈磊的blog",
                "url" : "https://blog.csdn.net/crisschan/article/details/100922668",
                "picurl" : "https://i.loli.net/2019/09/17/4wPgvOm72Q9zT8K.png"
       }