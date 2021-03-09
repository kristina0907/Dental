import React, {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";

export default function AddNewPatient({getVisible,visible}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);
    const fileInputRef = useRef();

    useEffect(() => {

    }, []);

    const handleClose = () => {
        document.forms.addDocument.reset();
        visible(false);
    }

    const onSubmit = (values) => {

    };
    const preventDefault = (e) => {
        e.preventDefault();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);
            setimageSave(formData);
            const reader = new FileReader();
            if (validateFile(files[i])) {
                reader.readAsDataURL(files[i]);
                reader.onload = function(e) {
                    setUrlImage(e.target.result)
                }
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage(null);
            } else {
                setValidFiles(null);
                setErrorMessage('File type not permitted');
            }
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }
    return(
        (getVisible?
            <div className={`add-new-record ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
                {!error?
                    !loaded?
                        <form name={'addDocument'} onSubmit={handleSubmit(onSubmit)}>

                                    <div className="closeModal">
                                        <IconButton
                                            disableFocusRipple={true}
                                            disableRipple={true}
                                            onClick={handleClose}
                                            aria-haspopup="false"
                                            edge="end"
                                            size={'small'}
                                            className={classes.close}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </div>

                                    <div className="row">
                                    <div className="col-lg-6 head_modal_document">Добавил <b>Иванов И.И.</b></div>
                                    <div className="col-lg-6" head_modal_document>Дата <b>08.09.2020</b></div>
                                        <div className="col-lg-3 input-name">Название</div>
                                        <div className="col-lg-9">
                                            <input
                                                ref={register}
                                                name="code"
                                                className="add-new-record-input mb-lg-2"
                                                type="text"
                                                placeholder="Александрова"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 input-name">Тип</div>
                                        <div className="col-lg-9">
                                          <select
                                          ref={register}
                                          name="name"
                                          className="add-new-record-input mb-lg-2"
                                          type="text">
                                            <option>Документ</option>
                                          </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 input-name">Категория</div>
                                        <div className="col-lg-9">
                                        <select
                                        ref={register}
                                        name="name"
                                        className="add-new-record-input mb-lg-2"
                                        type="text">
                                          <option>Не выбрано</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                          <div className="drop-document"
                                               onDragOver={dragOver}
                                               onDragEnter={dragEnter}
                                               onDragLeave={dragLeave}
                                               onDrop={fileDrop}
                                               onClick={fileInputClicked}
                                          >
                                              <div className="drop-message">
                                                  <div>Перенесите документ</div>
                                                  <div className="upload-document"></div>
                                                  <div>или нажмите сюда</div>
                                              </div>
                                              <input
                                                  ref={fileInputRef}
                                                  className="file-input"
                                                  type="file"
                                                  multiple
                                                  onChange={filesSelected}
                                              />
                                          </div>
                                        </div>
                                    </div>
                                <div className="btnModal">
                                    <button
                                        className="save-button"
                                        type="submit"
                                    >
                                        Загрузить
                                    </button>
                                </div>


                        </form>
                        :<CircularProgress color="primary" />
                    :<CircularProgress color="secondary" />}
            </div>
            :null)
    )
}
const useStyles = makeStyles(() => ({
  root: {
      position: 'fixed',
      top: '35%',
      left: 0,
      right: 0,
      bottom: 0,
      width: '400px',
      height:'450px',
      display: 'flex',
      margin: '0 auto',
      zIndex: 999999,
      textAlign:'left',
      padding:'52px',
  },
  headers: {
      marginTop: 0,
      marginBottom: '25px',
  },
  alignCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }
}))
