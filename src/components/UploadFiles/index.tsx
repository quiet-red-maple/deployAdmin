import React, { useState } from "react";
import { Upload, Icon, Form, notification, message } from "antd";
import { connect } from "react-redux";
import api from "../../services/api";
// import { getUrl } from "actions/user";
import "./uploadFile.css";

notification.config({
  placement: "topRight",
  top: 100,
  duration: 3
});

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function open(message: any, type: "success" | "error") {
  let newMessage = type === "success" ? "上传成功" : "上传失败";
  notification[type]({
    message: newMessage,
    description: <div style={{ width: 320 }}>{message}</div>
  });
}

const { Dragger } = Upload;

interface Props {
  form: any;
  uploadConfig: {
    disable?: boolean;
    label: string;
    name: string;
    rules: Array<any>;
    initialValue?: any;
    relationType?: string;
    template?: Array<any>;
    explain?: Array<any>;
    messageTitle?: string;
  };
  // getUrl: (data: any) => any;
}

const mapDispatchToProps = (dispatch: any) => ({
  // getUrl: (data: any) => dispatch(getUrl(data))
});

const mapStateToProps = (user: any) => user;

const UploadFiles = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const {
    label,
    name,
    rules,
    initialValue,
    disable,
    relationType,
    template,
    explain,
    messageTitle
  } = props.uploadConfig;

  const defaultValue = (value: any) => {
    // 整合默认已上传文件格式
    if (!value) {
      return value;
    }
    return value.map((item: any, index: number) => ({
      ...item,
      uid: item.id,
      name: item.fileName,
      url: item.fileUrl
    }));
  };

  const beforeUpload = (file: any) => {
    // 限制文件上传不能为压缩包文件
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (name.startsWith('shareholder') && !isJpgOrPng) {
    //   message.error('只能上传图片格式!');
    //   return isJpgOrPng
    // }
    // const isZipOrRar = file.type === 'application/zip' || file.type === 'application/x-rar';
    // if (isZipOrRar) {
    //   message.error('不可以上传zip或者rar格式的压缩包!');
    // }
    // return !isZipOrRar
    return false
  }

//   const customRequest = (detail: any) => {
//     return detail
// }

  const until = {
    name: "file",
    multiple: true,
    defaultFileList: defaultValue(initialValue),
    // customRequest: customRequest,
    // onRemove: ,
    action: `scf-front/file/upload`,
    beforeUpload: beforeUpload,
    onChange: (info: any) => {
      const { status, response } = info.file;
      // if (status !== "uploading") {
      //   // console.log(info.file, info.fileList);
      // }
      // if (status === "error") {
      //   open(`${label}中文件${info.file.name} 上传失败`, "error");
      // } else if (
      //   status === "done" &&
      //   response &&
      //   response.status.code === "777777"
      // ) {
      //   open(`${label}中文件${info.file.name} 上传失败`, "error");
      // } else if (
      //   status === "done" &&
      //   response &&
      //   response.status.code === "000000"
      // ) {
      //   // message.success(`${info.file.name} file uploaded successfully.`);
      //   props.form.setFields({
      //     [name]: { success: "" }
      //   });
      //   open(`${label}中文件${info.file.name} 上传成功`, "success");
      // }
    },
    // 点击文件列表创建a标签进行预览
    onPreview: (e: any) => {
      // 已上传文件直接为返回值没有response时直接返回，之后上传的文件返回值在response中
      let url = e.url;
      if (e.originFileObj) {
        getBase64(e.originFileObj, (fileUrl: any) => {
          url = fileUrl;
          const name = e.name;
          const aLink = document.createElement("a");
          aLink.style.display = "none";
          aLink.href = url;
          aLink.download = name;
          aLink.target = "_blank";
          document.body.appendChild(aLink);
          aLink.click();
          document.body.removeChild(aLink);
        });
      } else {
        const name = e.name;
        const aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = url;
        aLink.download = name;
        aLink.target = "_blank";
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      }
    }
  };

  const normFile = (e: any) => {
    // 这里对返回值进行加工，修改成所需要的json格式
    // if (!e.file.response) {
    //   return;
    // }
    // if (!e.file.response.body) {
    //   e.file.status = "error";
    // }

    console.log(e.file)
    return e.file;

    const newFileList = e.fileList.map((item: any, index: number) => {
      if (item.id) {
        const data = {
          attachmentsId: item.attachmentsId,
          relationType: item.relationType
        };
        return data;
      }
      if (item.response && item.response.body) {
        const newName = name.split("_")[0];
        const data = {
          attachmentsId: item.response.body ? item.response.body : null,
          // relationType: newName
          relationType: relationType ? relationType : newName
        };
        return data;
      } 
      else if (item.status === "uploading") {
        return null;
      }
      else {
        item.status = "error";
        return null;
      }
    });
    return newFileList.filter((value: any) => value);
  };
  

  const getUrled = (e: any, fileName: string) => {
    e.preventDefault();
    let name = fileName;
    message.success(`正在下载《${name}》`);
    let params = {
      filePath: `LBTEST/FILE/STATIC/TEMPLATE/${name}`
    };
    // props.getUrl(params).then((res: any) => {
    //   if (!res.payload) {
    //     return;
    //   } else {
    //     const aLink = document.createElement("a");
    //     document.body.appendChild(aLink);
    //     aLink.style.display = "none";
    //     const objectUrl = res.payload;
    //     aLink.target = '_blank';
    //     aLink.href = objectUrl;
    //     aLink.download = fileName;
    //     aLink.click();
    //     document.body.removeChild(aLink);
    //   }
    // });
  };

  const templateFile = template
    ? template.map((item: any, index: number) => {
        return (
          <div key={index}>
            <a onClick={e => getUrled(e, item.name)}>下载《{item.name}》模版</a>
          </div>
        );
      })
    : null;

  const explainFile = explain
    ? explain.map((item: any, index: number) => {
        return (
          <div key={index}>
            下载：<a onClick={e => getUrled(e, item.name)}>《{item.name}》</a>
          </div>
        );
      })
    : null;

  const dom = () => {
    if (disable) {
      return (
        <div className="upload_file_list">
          <Dragger {...until}></Dragger>
        </div>
      );
    }
    return (
      <Dragger {...until}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">请选择所要上传文件</p>
        <p className="ant-upload-hint">
          支持单次或批量上传。为文件顺利上传,请勿同时上传文件数量超过3个，同时上传中文件大小不超过100M
        </p>
      </Dragger>
    );
  };

  return (
    <div>
      {
        disable ? null : 
        (
          <div className="explainFile" style={{
            top: explain && explain.length === 1 ? 10 : -10
          }}>{explainFile}</div>
        )
      }
      {
        disable ? null : 
        (
          <div className="templateFile" >{templateFile}</div>
        )
      }
      {
        disable ? null : 
        (
          <div className="messageTitle" >{messageTitle}</div>
        )
      }
      <Form.Item label={label}>
        {getFieldDecorator(`${name}`, {
          initialValue: defaultValue(initialValue),
          rules: rules,
          valuePropName: "file",
          getValueFromEvent: normFile,
          validateTrigger: "onBlur"
        })(dom())}
      </Form.Item>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);
