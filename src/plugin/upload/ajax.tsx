export default function upload(option: any) {
    console.info(option.action, 55);
    if(typeof XMLHttpRequest === 'undefined') {
        return
    }

    const xhr = new XMLHttpRequest();
    const action = option.action;               //必选参数,上传的地址

    //xhr.upload是自带的一个方法.   onprogress是用来判断进度条的
    if(xhr.upload) {
        xhr.upload.onprogress = function progress(e: any) {
            if(e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e)
        }
    }

    const formData = new FormData();
    if(option.data) {
        Object.keys(option.data).map((key: any) => {
            formData.append(key, option.data[key])
        })
    }
    formData.append(option.filename, option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    }

    xhr.onload = function onload() {
        if(xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, option, xhr))
        }
        option.onSuccess(getBody(xhr))
    }

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};
    for (let item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }
    xhr.send(formData);
    return xhr;
}


function getError(action: string, option: any, xhr: XMLHttpRequest) {
    let msg;
    if (xhr.response) {
      msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
      msg = `${xhr.status} ${xhr.responseText}`;
    } else {
      msg = `fail to post ${action} ${xhr.status}`;
    }
  
    const err: any = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
}

function getBody(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }
  
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
}