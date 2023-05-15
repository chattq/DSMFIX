import {useCallback, useRef, useState} from 'react';
import {Button} from 'devextreme-react/button';
import {FileUploader} from 'devextreme-react/file-uploader';
import {Popup, ToolbarItem} from 'devextreme-react/popup';
import {useI18n} from '@/i18n/useI18n';
import {logger} from '@/packages/logger';
import {useConfiguration, useVisibilityControl} from "@packages/hooks";
import "./upload-dialog.scss"
import {ProgressBar} from "devextreme-react";

type UploadDialogProps = {
  visible: boolean;
  onUpload: (files: File[]) => void;
  onCancel: () => void;
  onDownloadTemplate?: () => void;
  className?: string;
};

export const UploadDialog = ({visible, onUpload, onCancel, onDownloadTemplate, className = ''}: UploadDialogProps) => {
  const {t} = useI18n("Common");
  const config = useConfiguration()
  const [files, setFiles] = useState<File[]>([]);


  const handleFileSelection = (event: any) => {
    logger.debug('files:', event);
    setFiles(event.value);
  };

  const handleUploadClick = () => {
    logger.debug('upload files:', files);
    onUpload(files);
    // setFiles([]);
  };

  const handleCancelClick = () => {
    onCancel();
    setFiles([]);
  };
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const progressVisibility = useVisibilityControl({defaultVisible: false})
  const [progressValue, setProgressValue] = useState(0);
  const [imageSource, setImageSource] = useState("");
  const [textVisible, setTextVisible] = useState(true);

  function onDropZoneEnter(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      setIsDropZoneActive(true)
    }
  }

  function onDropZoneLeave(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      setIsDropZoneActive(false)
    }
  }

  function onUploadStarted() {
    progressVisibility.open();
  }

  const fileUploadRef = useRef(null)

  const handleOnProgress = useCallback((e: any) => {
    setProgressValue((e.bytesLoaded / e.bytesTotal) * 100)
  }, [])
  return (
    <Popup
      visible={visible}
      dragEnabled={true}
      showTitle={true}
      title={t("Upload Files")}
      onHiding={handleCancelClick}
      height={350}
      width={570}
      deferRendering={false}
      className={className}
    >
      <div className={"dropzone-container flex items-center flex-col"}>
        <div id="dropzone-external"
             className={`m-auto flex justify-center
            w-[420px] h-[200px] 
            ${isDropZoneActive ? 'dx-theme-accent-as-border-color dropzone-active' : 'dx-theme-border-color'}`}>
          {imageSource && <img id="dropzone-image" src={imageSource} alt=""/>}
          {textVisible
            && <div id="dropzone-text" className="flex flex-col mx-6 my-2 items-center">
              <p className={'font-bold font-size-[16px]'}>{t('DragAndDropFileHere')}</p>
              <p className={'mx-auto'}>{t("Or")}</p>
            </div>}
        </div>
        <Button icon={'/images/icons/upload.svg'} id={"btn-trigger"} className={'z-40 top-[-130px]'}
                type={"default"} stylingMode={'outlined'} hoverStateEnabled={true} text={t('BrowseFile')}/>
        {(!progressVisibility.visible && files.length < 0) &&
          <div className={'top-[-100px] relative'}>
            {t('MaxFileSize')}
          </div>
        }
        {files.length > 0 &&
          <div className={'file-container flex-col rounded border shadow relative top-[-120px] items-center p-2'}>
            <div className={''}>
              {files.map((f, idx) => {
                return (
                  <div key={idx}>
                    <Button stylingMode={'text'} icon={'/images/icons/excel-file.svg'} hoverStateEnabled={false}
                            focusStateEnabled={false} activeStateEnabled={false}/>
                    {f.name}</div>
                )
              })}
            </div>
            <ProgressBar
              id="upload-progress"
              min={0}
              max={100}
              width="100%"
              showStatus={false}
              visible={progressVisibility.visible}
              value={progressValue}
            ></ProgressBar>
          </div>
        }
      </div>
      <FileUploader
        id="file-uploader"
        dialogTrigger="#btn-trigger"
        dropZone="#dropzone-external"
        multiple={false}
        uploadMode="useForm"
        accept={config.EXCEL_MIME_TYPES}
        visible={false}
        onValueChanged={handleFileSelection}
        onDropZoneEnter={onDropZoneEnter}
        onDropZoneLeave={onDropZoneLeave}
        onUploadStarted={onUploadStarted}
        onProgress={handleOnProgress}
        onUploaded={() => {
          progressVisibility.close()
          setProgressValue(0)
        }}
        showFileList={false}
      ></FileUploader>
      <ToolbarItem location='before' toolbar={'bottom'}>
        <Button icon={'/images/icons/download.svg'} id={"btn-trigger"} className={''}
                type={"default"} stylingMode={'text'} hoverStateEnabled={false} text={t('DownloadTemplateFile')}/>
      </ToolbarItem>
      <ToolbarItem location='after' toolbar={'bottom'}>
        <Button text={t('Upload')} onClick={handleUploadClick} stylingMode='contained' type="default"/>
      </ToolbarItem>
      <ToolbarItem location='after' toolbar={'bottom'}>
        <Button text={t('Cancel')} onClick={handleCancelClick}/>
      </ToolbarItem>

    </Popup>
  );
};