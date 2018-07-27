export default function upload(option: any) {
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
    formData.append(option.filename, option.file)

}