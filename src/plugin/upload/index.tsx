import * as React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { ImgUpload } from '../../api/api';

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

export default class upload extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Upload {...props} multiple={true}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </div>
        )
    }
}