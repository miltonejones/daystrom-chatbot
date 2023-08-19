import React, { useState } from "react";
import AWS from "aws-sdk";
import { AWS_CONFIG } from "../config";

const S3_BUCKET = "s3-chat-logs";
AWS.config.update(AWS_CONFIG);
const s3 = new AWS.S3();

export const useS3 = (onChange) => {
  const [files, setFiles] = React.useState([]);
  const [listRefresh, setListRefresh] = React.useState(null);

  const saveChat = async (data) => {
    const fileName = `${data.guid}.json`;
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: JSON.stringify(data),
    };
    try {
      await s3.putObject(params).promise();
      console.log("Object saved to S3");
      onChange && onChange();
      setListRefresh(new Date().getTime());
    } catch (error) {
      console.error("Error saving object to S3:", error);
    }
  };

  React.useEffect(() => {
    const fetchJsonFiles = async () => {
      try {
        const params = {
          Bucket: S3_BUCKET,
        };

        const data = await s3.listObjectsV2(params).promise();

        if (data.Contents) {
          const fileList = data.Contents.map((file) => file.Key);
          let e = 0;
          const jsonObjects = await Promise.all(
            fileList.map(async (fileName) => {
              const jsonParams = {
                Bucket: S3_BUCKET,
                Key: fileName,
              };

              const jsonData = await s3.getObject(jsonParams).promise();
              const jsonObject = JSON.parse(jsonData.Body.toString());
              return jsonObject;
            })
          ).reduce((out, res) => {
            out[res.guid] = res;
            return out;
          }, {});
          setFiles(jsonObjects);
        }
      } catch (error) {
        console.error("Error fetching JSON files:", error);
      }
    };

    fetchJsonFiles();
  }, [listRefresh]);

  return {
    files,
    saveChat,
  };
};
