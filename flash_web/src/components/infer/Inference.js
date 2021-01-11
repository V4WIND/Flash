import React from 'react';
import { connect } from 'react-redux';

import { clearInference } from '../../actions';
import TokenForm from './TokenForm';
import TaskDisplay from './TaskDisplay';
import PreviewTask from './PreviewTask';
import FloatinHelp from '../FloatingHelp';

class Inference extends React.Component {
  constructor(props) {
    super(props);

    this.taskName = 'inference';
  }

  componentWillUnmount() {
    this.props.clearInference(this.taskName);
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">Test your Model</h1>
        <TokenForm />
        {this.props.token ? (
          <TaskDisplay taskName={this.taskName} />
        ) : (
          <PreviewTask />
        )}
        <FloatinHelp target="inference" />
      </div>
    );
  }
}

const mapStateToProps = ({ inference: { token } }) => {
  return { token };
};

export default connect(mapStateToProps, { clearInference })(Inference);
