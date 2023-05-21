import React, { useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const InputFile = (props) => {
    return (
        <Dragger
            {...{
                accept: "image/*",
                customRequest: async (params) => {
                    setTimeout(() => {
                        params.onSuccess(true);
                        props?.setFile(params.file);
                    }, 1000);
                },
                onChange(info) {},
                onDrop(e) {
                    console.log("Dropped files", e.dataTransfer.files);
                },
                maxCount: 1,
            }}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Select file to upload</p>
        </Dragger>
    );
};

export default InputFile;
