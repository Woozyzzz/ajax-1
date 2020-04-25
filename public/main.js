console.log("hello，我是main.js");

getCSS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/1.css");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(`getCSS成功，添加/1.css`);
        // 得到CSS后生成style标签
        const style = document.createElement(`style`);
        style.textContent = request.response;
        // 将style标签插到头部
        document.head.appendChild(style);
      } else {
        console.log(`getCSS失败`);
      }
    }
  };
  request.send();
};

getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(`getJS成功，添加/2.js`);
        // 得到JS后生成script标签
        const script = document.createElement("script");
        script.textContent = request.response;
        // 将script标签插到身体里
        document.body.appendChild(script);
      } else {
        console.log(`getJS失败`);
      }
    }
  };
  request.send();
};

getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(`getHTML成功，添加/3.html`);
        // 得到HTML后生成div标签
        const div = document.createElement(`div`);
        div.innerHTML = request.response;
        // 将div标签插到身体里
        document.body.appendChild(div);
      } else {
        console.log(`getHTML失败`);
      }
    }
  };
  request.send();
};

getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(`getXML成功，读取/4.xml`);
        // 得到XML后使用DOM获取XML标签
        const dom = request.responseXML;
        const text = dom.getElementsByTagName("warning")[0].textContent;
        // 将标签内容输出
        console.log(`4.xml中warning标签内容：${text.trim()}`);
      } else {
        console.log(`getHTML失败`);
      }
    }
  };
  request.send();
};

getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(`getJSON成功，读取/5.json`);
        let object;
        try {
          object = JSON.parse(request.response);
        } catch (error) {
          console.log("转换对象失败");
          console.log(error);
          object = { name: "noName" };
        }
        console.log(object);
      } else {
        console.log(`getJSON失败`);
      }
    }
  };
  request.send();
};

let n = 1;
getPage.onclick = () => {
  if (n !== 3) {
    const request = new XMLHttpRequest();
    request.open("GET", `/page${n + 1}.json`);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(`getPage成功，读取/page${n + 1}.json`);
          const array = JSON.parse(request.response);
          array.forEach((element) => {
            const li = document.createElement("li");
            li.textContent = element.id;
            document.getElementsByTagName("ul")[0].appendChild(li);
          });
        }
        n += 1;
      }
    };
    request.send();
  } else {
    console.log(`n等于3禁用getPage`);
  }
};
