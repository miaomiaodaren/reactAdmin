import * as React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { ImgUpload } from '../../api/api';

import Uploadss from './upload'

const props = {
    name: 'file',
    action: '/api/user/imgupload',
    headers: {
        authorization: 'authorization-text',
    },
    data: {
        name: 'fufeng',
        id: '22',
    },
    onChange(info: any) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    
};

const props1 = {
    name: 'file',
    action: '/api/user/imgupload',
    autoUpload: true,
    headers: {
        authorization: 'authorization-text',
    },
    data: {
        name: 'fufeng',
        id: '22',
    },
    onChange(file: any, fileList: any[]) {
        console.info(file, fileList, 'i am is change')
    },
    onSuccess(res: any, file: any, FileList: any) {
        console.info(res, file, FileList, 'i am is success');
    },
    showFileList: true,
    Cropper: true,          //是否需要剪裁
};

export default class upload extends React.Component<any, any> {
    changes = (file: any, fileList: any[]) => {
        console.info(file, fileList, 'i am is change')
    }

    render() {
        return (
            <div>
                <Upload {...props} multiple={true} name="sbs">
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>

                <br />
                <br />
                <Uploadss {...props1}>
                    文件上传
                </Uploadss>
            </div>
        )
    }
}