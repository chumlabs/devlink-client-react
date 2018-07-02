import React, { Component } from 'react';
import { object } from 'prop-types';
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
import { addResource } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class AddResource extends Component {
  // state
  state = {
    name: '',
    topic: '',
    description: '',
    url: '',
    date: '',
    keywords: '',
    errors: {}
  };

  // proptypes
  static propTypes = {
    profile: object.isRequired,
    errors: object.isRequired
  };

  // lifecycle methods
  componentDidMount = () => {
    this.props.clearErrors();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const resourceData = pick(this.state, [
      'name',
      'topic',
      'description',
      'url',
      'date',
      'keywords'
    ]);

    this.props.addResource(resourceData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-project">
        <Container>
          <Row>
            <Col md="8" className="m-auto">
              <Button tag={Link} to={'/dashboard'} color="danger" className="mb-4">
                Back to Dashboard
              </Button>
              <h1 className="display-4 text-center">Add a Resource</h1>
              <p className="lead text-center">
                Add a resource, such as an article, document, presentation, video, that
                you've created or found helpful
              </p>
              <small className="d-block pb-3">* required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="* Name"
                  info="A name for your resource"
                  onChange={this.onChange}
                  error={errors.name}
                  required={true}
                />
                <TextInputGroup
                  type="text"
                  name="topic"
                  value={this.state.topic}
                  placeholder="Topic"
                  info="The topic of your resource"
                  onChange={this.onChange}
                  error={errors.topic}
                />
                <TextAreaGroup
                  name="description"
                  value={this.state.description}
                  placeholder="* Description"
                  info="A brief description of the project"
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextInputGroup
                  type="text"
                  name="url"
                  value={this.state.url}
                  placeholder="* URL"
                  info="A url for your resource"
                  onChange={this.onChange}
                  error={errors.url}
                  required={true}
                />
                <h6>Resource Date</h6>
                <TextInputGroup
                  type="date"
                  name="date"
                  value={this.state.date}
                  info="The date the resource was created (or last updated)"
                  onChange={this.onChange}
                  error={errors.date}
                />
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
  { addResource, clearErrors }
)(AddResource);
