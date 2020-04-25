var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/
  console.log("有人发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  if (path === "/index.html") {
    response.statusCode = 200;
    console.log("他请求访问/index.html");
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    let string = fs.readFileSync(`public/index.html`);
    console.log(`fs.readFileSync('public/index.html')是一个${typeof string}`);
    string = string.toString();
    const page1 = fs.readFileSync(`db/page1.json`);
    const array = JSON.parse(page1);
    const result = array.map((item) => `<li>${item.id}</li>`).join("");
    string = string.replace(`{{page}}`, `<ul>${result}</ul>`);
    response.write(string);
    response.end();
  } else if (path === "/main.js") {
    response.statusCode = 200;
    console.log("他请求访问/main.js");
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync(`public/main.js`));
    response.end();
  } else if (path === "/1.css") {
    response.statusCode = 200;
    console.log("他请求访问/1.css");
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(fs.readFileSync(`public/1.css`));
    response.end();
  } else if (path === "/2.js") {
    response.statusCode = 200;
    console.log("他请求访问/2.js");
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync(`public/2.js`));
    response.end();
  } else if (path === "/3.html") {
    response.statusCode = 200;
    console.log(`他请求访问/3.html`);
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync(`public/3.html`));
    response.end();
  } else if (path === "/4.xml") {
    response.statusCode = 200;
    console.log(`他请求访问/4.xml`);
    response.setHeader("Content-Type", "text/xml;charset=utf-8");
    response.write(fs.readFileSync(`public/4.xml`));
    response.end();
  } else if (path === "/5.json") {
    response.statusCode = 200;
    console.log(`他请求访问/5.json`);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync(`public/5.json`));
    response.end();
  } else if (path === "/page2.json") {
    response.statusCode = 200;
    console.log(`他请求访问/page2.json`);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync(`db/page2.json`));
    response.end();
  } else if (path === "/page3.json") {
    response.statusCode = 200;
    console.log(`他请求访问/page3.json`);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync(`db/page3.json`));
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在！\n`);
    response.end();
  }
  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);