import { useState, useRef } from "react";
import Button from "@mui/material/Button";

function Upload({ button }: any) {
  const [files, setFiles]: any = useState({});
  const [errors, setErrors]: any = useState("");
  let fileInput: any = useRef(null);

  const validateSelectedFile = (selectedFile: any) => {
    console.log("selectedFile::::", selectedFile);

    if (!selectedFile) {
      setErrors("No File chosen");
      return;
    }
    const fileExtensions: string[] = ["pdf", "xlsx", "txt"];
    const fileSize: number = Math.round(selectedFile.size / 1024);
    const fileType: string = selectedFile.name.split(".");

    //check the type extension of File and throw Error if it not in expected extension
    if (!fileExtensions.includes(fileType[1])) {
      setErrors("unsupported file format");
      return false;
    }

    //check the size of File and throw Error if exceeds 5MB
    if (fileSize > 5000) {
      setErrors("File Size is more than 5MB");
      return false;
    }
    return true;
  };

  const onClickSaveToLaterNewHire = (event: any) => {
    const selectedFile: any = event.target.files[0];
    const isValidFile: boolean = validateSelectedFile(selectedFile);
    if (!isValidFile) {
      return;
    }
    setErrors("");
    const uploadedFiles: any = {};
    if (selectedFile) {
      uploadedFiles[selectedFile.name] = selectedFile;
      setFiles((prevState: any) => ({ ...prevState, ...uploadedFiles }));
    }
  };

  const callbak = {
    onClickSaveToLaterNewHire,
  };

  return (
    <div>
      <input
        type="file"
        hidden
        onChange={callbak[button.onClickCallback]}
        ref={(fp: any) => {
          fileInput = fp;
        }}
      />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onClick={() => fileInput.click()}
        disabled={Object.values(files).length === 2}
      >
        {button.text}
      </Button>
      {!!Object.keys(files).length &&
        Object.values(files)?.map((file: any) => (
          <div key={file.name}>
            {file.name} {Math.round(file.size / 1024)} KB
          </div>
        ))}
      {errors && <p>{errors}</p>}
      <hr />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        // onClick={}
      >
        Submit
      </Button>
    </div>
  );
}

export default Upload;
