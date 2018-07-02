import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// utilities
import pick from 'lodash/pick';

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import TextAreaGroup from '../form/TextAreaGroup';
import TextInputGroup from '../form/TextInputGroup';

// action creators
import { addProject } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class AddProject extends Component {
  // state
  state = {
    title: '',
    description: '',
    repo: '',
    url: '',
    from: '',
    to: '',
    current: true,
    keywords: '',
    errors: {},
    disabled: true
  };

  // proptypes
  static propTypes = {
    profile: object.isRequired,
    errors: object.isRequired,
    addProject: func.isRequired,
    clearErrors: func.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      to: '',
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const projectData = pick(this.state, [
      'title',
      'description',
      'repo',
      'url',
      'from',
      'to',
      'current',
      'keywords'
    ]);

    this.props.addProject(projectData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-resource">
        <Container>
          <Row>
            <Col md="8" className="m-auto">
              <Button tag={Link} to={'/dashboard'} color="danger" className="mb-4">
                Back to Dashboard
              </Button>
              <h1 className="display-4 text-center">Add a Project</h1>
              <p className="lead text-center">
                Add a project that you are working on (or have worked on)
              </p>
              <small className="d-block pb-3">* required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="* Title"
                  info="The title or name of the project"
                  onChange={this.onChange}
                  error={errors.title}
                  required={true}
                />
                <TextAreaGroup
                  name="description"
                  value={this.state.description}
                  placeholder="* Description"
                  info="A brief description of the project"
                  onChange={this.onChange}
                  error={errors.description}
                  required={true}
                />
                <TextInputGroup
                  type="text"
                  name="repo"
                  value={this.state.repo}
                  placeholder="* Repo"
                  info="The URL of the repository for the project"
                  onChange={this.onChange}
                  error={errors.repo}
                  required={true}
                />
                <TextInputGroup
                  type="text"
                  name="url"
                  value={this.state.url}
                  placeholder="URL"
                  info="A url for the project or documentation"
                  onChange={this.onChange}
                  error={errors.url}
                />
                <h6>Project Start Date</h6>
                <TextInputGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  info="The date the project was started"
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>Project End Date</h6>
                <TextInputGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  info="The date the project was started"
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Project is still active
                  </label>
                </div>
                <TextInputGroup
                  type="text"
                  name="keywords"
                  value={this.state.keywords}
                  placeholder="keywords"
                  info="Keywords that may help people find your project (separate each word with a comma: react, state management, ...)"
                  onChange={this.onChange}
                  error={errors.keywords}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

//mapDispatchToProps (listed inline below)

export default connect(
  mapStateToProps,
  { addProject, clearErrors }
)(AddProject);
