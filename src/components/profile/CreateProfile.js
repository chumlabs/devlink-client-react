import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash/pick';

// reactstrap
import { Container, Row, Col } from 'reactstrap';

// components
import InputGroup from '../form/InputGroup';
import SelectListGroup from '../form/SelectListGroup';
import TextAreaGroup from '../form/TextAreaGroup';
import TextInputGroup from '../form/TextInputGroup';
// import Spinner from '../transitions/Spinner';

// action creators
import { createProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class CreateProfile extends Component {
  // state
  state = {
    displaySocInputs: false,
    handle: '',
    focus: '',
    employer: '',
    website: '',
    location: '',
    skills: '',
    bio: '',
    github: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    errors: ''
  };

  // proptypes
  static propTypes = {
    profile: object.isRequired,
    errors: object.isRequired,
    createProfile: func.isRequired,
    clearErrors: func.isRequired
  };

  // lifecycle methods
  componentDidMount = () => {
    clearErrors();
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // The object you return from this function will
  //   // be merged with the current state.
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSocialClick = e => {
    this.setState({
      displaySocInputs: !this.state.displaySocInputs
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = pick(this.state, [
      'handle',
      'focus',
      'employer',
      'website',
      'location',
      'skills',
      'bio',
      'github',
      'youtube',
      'twitter',
      'linkedin'
    ]);

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocInputs } = this.state;

    //select list options for focus
    const options = [
      { label: '* Choose a Job Focus or Role', value: '', selected: 'selected' },
      { label: 'Full Stack Developer', value: 'Full Stack Developer' },
      { label: 'Front-End Developer', value: 'Front-End Developer' },
      { label: 'UX Designer', value: 'UX Designer' },
      { label: 'DevOps Engineer', value: 'DevOps Engineer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Trainer', value: 'Trainer' },
      { label: 'Student', value: 'Student' },
      { label: 'other', value: 'other' }
    ];

    const socialInputs = (
      <div>
        <InputGroup
          type="text"
          name="github"
          value={this.state.github}
          prepend={<i className="fab fa-github" />}
          placeholder="GitHub Profile URL"
          onChange={this.onChange}
          error={errors.github}
        />
        <InputGroup
          type="text"
          name="youtube"
          value={this.state.youtube}
          prepend={<i className="fab fa-youtube" />}
          placeholder="YouTube Profile URL"
          onChange={this.onChange}
          error={errors.youtube}
        />
        <InputGroup
          type="text"
          name="twitter"
          value={this.state.twitter}
          prepend={<i className="fab fa-twitter" />}
          placeholder="Twitter Profile URL"
          onChange={this.onChange}
          error={errors.twitter}
        />
        <InputGroup
          type="text"
          name="linkedin"
          value={this.state.linkedin}
          prepend={<i className="fab fa-linkedin" />}
          placeholder="Linkedin Profile URL"
          onChange={this.onChange}
          error={errors.linkedin}
        />
      </div>
    );

    return (
      <div className="create-profile">
        <Container>
          <Row>
            <Col className="m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center" />
              <small className="d-block pb-3">* required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  type="text"
                  name="handle"
                  value={this.state.handle}
                  placeholder="* Profile Handle"
                  info="A unique name/handle for your profile URL (alpha characters & hyphen only, no spaces or special characters)"
                  onChange={this.onChange}
                  error={errors.handle}
                  required={true}
                />
                <SelectListGroup
                  name="focus"
                  value={this.state.focus}
                  options={options}
                  info="Your primary job focus or role"
                  onChange={this.onChange}
                  error={errors.focus}
                  required={true}
                />
                <TextInputGroup
                  type="text"
                  name="employer"
                  value={this.state.employer}
                  placeholder="Current Employer"
                  info="Employer or organization you work for"
                  onChange={this.onChange}
                  error={errors.employer}
                />
                <TextInputGroup
                  type="text"
                  name="website"
                  value={this.state.website}
                  placeholder="Website"
                  info="Personal or professional website"
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextInputGroup
                  type="text"
                  name="location"
                  value={this.state.location}
                  placeholder="Location"
                  info="We suggest using the city and state"
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextInputGroup
                  type="text"
                  name="skills"
                  value={this.state.skills}
                  placeholder="* Skills"
                  info="Separate each skill with a comma (eating, sleeping, ...)"
                  onChange={this.onChange}
                  error={errors.skills}
                  required={true}
                />
                <TextAreaGroup
                  name="bio"
                  value={this.state.bio}
                  placeholder="Brief Bio"
                  info="Tell us a little about yourself"
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.onSocialClick}
                  >
                    Add Social Network Links
                  </button>
                </div>
                {displaySocInputs && socialInputs}
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
  { createProfile, clearErrors }
)(CreateProfile);
