import * as React from 'react'
import Prototype from 'prop-types'
import styled from 'styled-components'
import uploadajax from './ajax'
import {Modal} from 'antd'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import blog from '../../components/blog';

interface _File {
    status: string,
    name: string,
    size?: number,
    percentage?: number,
    uid: number,
    raw?: any,
    url?: any,
}

function dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export default class Uploadss extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            fileList: [],
            tempIndex: 1,
            croppervisible: false,
            croppuid: void 0,
        }
    }



    //根据uid查找文件
    getFile = (file: any) => {
        if (file) {
          return this.state.fileList.find((item: any) => item.uid === file.uid);
        }
        return null;
    }

    //文件上传成功时,修改fileList中的状态以及参数，并且触发props中传入的success代码
    onHandleSuccess = (res: any, file: any, FileList?: any[]) => {
        const { fileList } = this.state;
        let _file = this.getFile(file);
        console.info('i am is succes', _file, file);
        if(_file) {
            _file.status = "success",
            _file.response = res;
            setTimeout(() => {
                this.setState({fileList}, () => {
                    this.props.onSuccess && this.props.onSuccess(res, _file, fileList);
                    this.props.onChange && this.props.onChange(_file, fileList);
                })
            }, 1000)
        }
    }

    onProgress = (e: any, file: any) => {
        const {fileList} = this.state;
        let _file = this.getFile(file);
        if(_file) {
            _file.status = 'uploading';
            this.props.onProgress && this.props.onProgress(e, _file, fileList);
            this.setState({fileList})
        }
    }

    onError = (e: any, file: any) => {
        console.info(this.state, 'i am is error');
        const {fileList} = this.state;
        let _file = this.getFile(file);
        if(_file) {
            _file.state = 'fail';
            fileList.splice(fileList.indexOf(_file), 1);
            this.setState({fileList}, () => {
                this.props.onError && this.props.onError(e, _file,fileList);
                this.props.onChange && this.props.onChange(_file, fileList);
            })
        }
    }

    post =(file: any) => {
        console.info(file, 44);
        const { name: filename, headers, withCredentials, data, action, onProgress, onSuccess, onError } = this.props;
        uploadajax({headers, withCredentials, file, data, filename, action, onProgress: (e: any) => this.onProgress(e, file),
            onSuccess: (res: any) => this.onHandleSuccess(res, file),
            onError: (e: any) => this.onError(e, file)})
    }

    upload = (rawFile: any, file?: any) => {
        const { beforeUpload } = this.props;
        if(!beforeUpload) {
            return this.post(rawFile)           //如果没有开始前的事情触发,则直接开始上传
        }
        const before = beforeUpload(rawFile);
        //如果beforeuplod返回了false, 则不会进行提交
        if(before) {
            this.post(rawFile)
        }
    }

    onStrart = (file: any) => {
        let {fileList, tempIndex} = this.state;
        const {autoUpload, Cropper} = this.props;
        file.uid = Date.now() + tempIndex++;
        let _file:_File = {
            status: 'ready',
            name: file.name,
            size: file.size,
            percentage: 0,
            uid: file.uid,
            raw: file
        }
        try {
            _file.url = window.URL.createObjectURL(file)            //新建图片缩略图
        } catch(err) {return}

        if(Cropper) {
            this.setState({
                croppervisible: Cropper ? true : false,
                croppuid: Cropper ? _file : undefined
            })
        } else {
            fileList.push(_file);
            this.setState({
                fileList,
                tempIndex,
            }, () => {
                if(autoUpload) this.upload(file);                       //如果是自动上传的,则直接触发
            })
        }
    }

    uploadFiles = (files: any[]): void => {
        const {multiple, autoUpload, Cropper} = this.props;
        let postFiles = Array.prototype.slice.call(files);
        if(postFiles.length === 0) {return;}
        if(!multiple) {postFiles = postFiles.slice(0, 1)};          //如果不支持多选, 则只选取第一个
        postFiles.forEach((file: any) => {
            this.onStrart(file);
        })
    }

    handleChange = (e: any):void => {
        console.info(e.target.files, 222, e.target);
        if(e.target instanceof HTMLInputElement) {
            const files = e.target.files;
            if(!files) return;
            this.uploadFiles(files);
            let input =this.refs.input as HTMLInputElement
            input.value = null;
        }
    }

    handleClick = (): void => {
        let input =this.refs.input as HTMLInputElement
        input.click();
    }

    _crop = (e: any) => {
        console.info(222, (this.refs.cropper as any).getCroppedCanvas(), e);
    }

    onOk = () => {
        let {fileList, tempIndex, croppuid} = this.state;
        const {autoUpload} = this.props;
        let dataurl = (this.refs.cropper as any).getCroppedCanvas().toDataURL();
        let blob: any = dataURLtoFile(dataurl, this.state.croppuid.name);
        console.info(blob, 876548765);
        croppuid.raw = blob;
        blob.uid = croppuid.uid;
        try {
            croppuid.url = window.URL.createObjectURL(blob)            //新建图片缩略图
        } catch(err) {return}
        fileList.push(croppuid);
        this.setState({
            fileList,
            tempIndex,
            croppuid,
            croppervisible: false
        }, () => {
           this.upload(blob); 
        })
    }

    render() {
        const {accept, multiple, drag} = this.props;
        const {fileList} = this.state;
        console.info(this.props.showFileList, 888, fileList, this.state.croppuid && this.state.croppuid);
        return (
            <Uploads>
                {
                    this.props.showFileList ? <div className="fileList">
                        {fileList.map((item: any) => {
                            return (
                                // <div key={item.name}>
                                    // <span>{item.name}</span> <span>{item.status === 'success' ? '成功' : item.status === 'uploading' ? '上传中' : '失败'}</span>
                                <img src={item.url}/>
                                // </div>
                            )
                        })}
                    </div> : ''
                }
                <div className="upload" onClick={this.handleClick}>
                    {drag ? <div className="drag" 
                        onDragEnter={(event) => {event.preventDefault(); console.info(event.target, '我进入了这个元素')}}
                        onDragOver={(event) => {event.preventDefault(); console.info(event.target, '我在这个范围内进行移动')}}
                        onDragLeave = {(event) => {event.preventDefault(); console.info(event.target, '我离开了这个拖动范围')}}
                        onDrop={(e:any) => {e.preventDefault(); alert(1); this.uploadFiles(e.dataTransfer.files)}}>
                        {this.props.children}
                    </div> : this.props.children}
                    <input className="upload_input" type="file" ref="input" onChange={e => this.handleChange(e)} multiple={false}  />
                </div>
                <Modal title="Basic Modal" visible={this.state.croppervisible} onOk={this.onOk} onCancel={() => this.setState({croppervisible: false})}>
                    <Cropper
                        ref='cropper'
                        src= {this.state.croppuid && this.state.croppuid.url}
                        style={{height: 400, width: '100%'}}
                        aspectRatio={5 / 5}
                        guides={true}
                        crop={this._crop} />
                </Modal>
                {/* <br />
                <br />
                <div className="bbb" id="bbb"
                    draggable={true} 
                    onDragStart={(event: any) => {console.info(event.target, '我开始拖动了');  event.dataTransfer.setData('Text', event.target.id)}}
                    onDrag={(event: any) => {console.info(event.target, '我正在拖放中')}}
                    onDragEnd={(event: any) => {console.info(event.target, '我结束了拖放')}}
                >21312312</div> */}
                {/* 展示文件拖动效果的实现 (移动端不兼容) */}
                {/* <br />
                <br />
                <div style={{width: '200px', height: '200px', border: '1px solid #ddd'}} 
                    onDragEnter={(event) => {console.info(event.target, '我进入了这个元素')}}
                    onDragOver={(event) => {event.preventDefault(); console.info(event.target, '我在这个范围内进行移动')}}
                    onDragLeave = {(event) => {console.info(event.target, '我离开了这个拖动范围')}}
                    onDrop={(event) => { 
                        event.preventDefault(); 
                        console.info(event.target, '我在对象中进行了放置'); 
                        var data = event.dataTransfer.getData("Text");
                        (event.target as HTMLElement).appendChild(document.getElementById(data))}}
                ></div> */}
            </Uploads>
        )
    }
}

const Uploads = styled.div`
    .upload_input{
        display: none;
    }
    .upload{
        width: 200px;
        height: 200px;
        border: 1px solid #ddd;
        display: inline-block;
        text-align: center;
        line-height: 200px;
    }
    .fileList{
        display: inline-block;
        img {
            width: 200px;
            height: 200px;
            display: inline-block;
            margin-right: 30px;
            border: 1px solid #ddd;
        }
    }
`