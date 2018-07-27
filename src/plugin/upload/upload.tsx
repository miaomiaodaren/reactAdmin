import React from 'react'
import Prototype from 'prop-types'
import styled from 'styled-components'

interface _File {
    status: string,
    name: string,
    size?: number,
    percentage?: number,
    uid: number,
    raw?: any,
    url?: any,
}

export default class Uploadss extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            fileList: [],
            tempIndex: 1
        }
    }

    post =(file: any) => {
        const { name, headers, withCredentials, data, action, onProgress, onSuccess, onError } = this.props;
        
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
            tempIndex
        })
    }

    uploadFiles = (files: any[]): void => {
        const {multiple, autoUpload} = this.props;
        let postFiles = Array.prototype.slice.call(files);
        if(postFiles.length === 0) {return;}
        if(!multiple) {postFiles = postFiles.slice(0, 1)};          //如果不支持多选, 则只选取第一个
        postFiles.forEach((file: any) => {
            this.onStrart(file);
            if(autoUpload) this.upload(file);                       //如果是自动上传的,则直接触发
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

    render() {
        const {accept, multiple} = this.props;
        return (
            <Uploads>
                <div className="upload" onClick={this.handleClick}>
                    {this.props.children}
                    <input className="upload_input" type="file" ref="input" onChange={e => this.handleChange(e)} multiple={false}  />
                </div>
            </Uploads>
        )
    }
}

const Uploads = styled.div`
    .upload_input{
        display: none;
    }
`