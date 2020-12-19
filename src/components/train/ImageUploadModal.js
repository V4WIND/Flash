import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ImageUploadModalClassForm from './ImageUploadModalClassForm';
import '../../styles/Modal.css';

class ImageUploadModal extends React.Component {
  renderClassList() {
    return _.map(_.range(0, this.props.numClassesLimit.max), number => {
      let isOptionalField =
        number >= this.props.numClassesLimit.min ? true : false;
      const imgClassificationKeys = _.keys(this.props.imageClassification);
      let initialData = null;
      if (number < imgClassificationKeys.length) {
        initialData = {
          classValue: imgClassificationKeys[number],
          isSaved: true,
        };
      }
      return (
        <ImageUploadModalClassForm
          form="classForm"
          isOptionalField={isOptionalField}
          key={number}
          initialData={initialData}
        />
      );
    });
  }

  renderImageUploader() {
    return <h4>Image uploader</h4>;
  }

  renderContent() {
    return (
      <div className="row">
        <div className="col col-md-4 text-center">
          <h4>Classes</h4>
          <small>You can add upto 10 classes</small>
          {this.renderClassList()}
        </div>
        <div className="col col-md-8 text-center">
          {this.renderImageUploader()}
        </div>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-container" onClick={this.props.onDismiss}>
        <div
          className="modal-body"
          style={{ width: '60%', maxHeight: 'calc(100vh - 20vh)' }}
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-center">Upload Dataset</h3>
          <hr className="w-100" />
          {this.renderContent()}
          <hr className="w-100" />
          <div className="row">
            <div className="col text-right">
              <button
                className="btn btn-success mr-2"
                onClick={() => {
                  this.props.onDismiss();
                }}
              >
                Save Dataset
              </button>
              <button
                className="btn btn-warning mr-2"
                onClick={this.props.onDismiss}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.querySelector('#modal') // places the modal inside the container with id 'modal' in index.html
    );
  }
}

const mapStateToProps = ({ imageClassification }) => {
  return { imageClassification };
};

export default connect(mapStateToProps)(ImageUploadModal);
