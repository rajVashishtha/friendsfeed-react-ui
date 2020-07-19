import React, { Component } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './mdbmodal.style.scss'
import FileInput from '../../components/file input/fileinput.component'
import MaterialButton from '../button/button.component'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import {connect} from 'react-redux'
import 'bootstrap-css-only/css/bootstrap.css'

class MDBPostModal extends Component {
  state = {
    modal: false,
  };
  render() {
      const {open, title, close, body, submit} = this.props
      const {postButton} = this.props
    return (
        <MDBModal isOpen={open} toggle={close} className="mdb_modal">
          <MDBModalHeader toggle={close}>{title}</MDBModalHeader>
          <MDBModalBody>
            {body}
          </MDBModalBody>
          <MDBModalFooter className="mdb_modal_footer">
          <FileInput text="Add Photo..." file_id="add-picture"
           startIcon={(<ImageOutlinedIcon htmlFor="add-picture" />)}/>
            <MaterialButton disable={!postButton} text="Post" variant="contained" onClick={submit}>
            </MaterialButton>
          </MDBModalFooter>
        </MDBModal>
      );
  }
}

const mapStateToProps = state =>({
  postImages: state.postImages.postImages,
  postButton : state.postImages.postButton
})
export default connect(mapStateToProps)(MDBPostModal);