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
import { getCurrentProfile, editResource } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class EditResource extends Component {
  // state
  state = {
    id: this.props.match.params.id,
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
    errors: object.isRequired,
    getCurrentProfile: func.isRequired,
    editResource: func.isRequired,
    clearErrors: func.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.clearErrors();
  }

  // TODO: this will have to be refactored at some point - deprecated method
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (
      nextProps.profile.profile &&
      nextProps.profile.profile !== this.props.profile.profile
    ) {
      const nextResource =
        nextProps.profile.profile.resources &&
        nextProps.profile.profile.resources.find(
          resources => resources._id === this.props.match.params.id
        );

      if (nextResource) {
        const { date: datePre, keywords: keywordsArr, ...resource } = nextResource;
        const keywords = keywordsArr ? keywordsArr.join(', ') : '';
        const date = datePre ? datePre.slice(0, 10) : '';

        this.setState(prevState => ({
          ...prevState,
          ...resource,
          date,
          keywords
        }));
      }
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

    const resourceData = pick(this.state, [
      'name',
      'topic',
      'description',
      'url',
      'date',
      'keywords'
    ]);

    this.props.editResource(resourceData, this.state.id, this.props.history);
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

              <h1 className="display-4 text-center">Edit Resource</h1>
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

                {errors.resource && (
                  <div className="mt-4">
                    <p className="lead text-center text-danger">
                      This resource was not found in your profile.
                    </p>
                    <p>
                      Go back to the <Link to="/dashboard">Dashboard</Link> to verify.
                    </p>
                  </div>
                )}
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
  { getCurrentProfile, editResource, clearErrors }
)(EditResource);
