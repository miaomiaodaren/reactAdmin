import React from 'react'
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

        fileList.push(_file);
        this.setState({
            fileList,
            tempIndex,
            croppervisible: Cropper ? true : false,
            croppuid: Cropper ? _file : undefined
        }, () => {
            if(Cropper) {
                console.info(this.state.croppuid, 7777);
            } else {
                console.info(Cropper, 99999);
                if(autoUpload) this.upload(file);                       //如果是自动上传的,则直接触发
            }
        })
    }

    uploadFiles = (files: any[]): void => {
        console.info(33, files);
        const {multiple, autoUpload} = this.props;
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
        let dataurl = (this.refs.cropper as any).getCroppedCanvas().toDataURL();
        let blob = dataURLtoFile(dataurl, this.state.croppuid.name);
        console.info(blob, 876548765);
        this.upload(blob)
    }

    render() {
        const {accept, multiple} = this.props;
        const {fileList} = this.state;
        console.info(this.props.showFileList, 888, fileList, this.state.croppuid && this.state.croppuid);
        return (
            <Uploads>
                <div className="upload" onClick={this.handleClick}>
                    {this.props.children}
                    <input className="upload_input" type="file" ref="input" onChange={e => this.handleChange(e)} multiple={false}  />
                </div>
                {
                    this.props.showFileList ? <div className="fileList">
                        {fileList.map((item: any) => {
                            return (<div key={item.name}>
                                <span>{item.name}</span> <span>{item.status === 'success' ? '成功' : item.status === 'uploading' ? '上传中' : '失败'}</span>
                                <img style={{width: '100px', height: '100px', display: 'inline-block'}} src={item.url}/>
                            </div>)
                        })}
                    </div> : ''
                }
                <Modal title="Basic Modal" visible={this.state.croppervisible} onOk={this.onOk} onCancel={() => this.setState({croppervisible: false})}>
                    <Cropper
                        ref='cropper'
                        src= {this.state.croppuid && this.state.croppuid.url}
                        style={{height: 400, width: '100%'}}
                        aspectRatio={16 / 9}
                        guides={true}
                        crop={this._crop} />
                </Modal>
            </Uploads>
        )
    }
}

const Uploads = styled.div`
    .upload_input{
        display: none;
    }
`