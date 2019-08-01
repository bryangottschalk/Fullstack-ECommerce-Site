import React from 'react';
import { connect } from 'react-redux';
const initialState = {
  description: ''
};
class ReviewForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    //call postReview thunk passing in state
    this.setState(initialState);
  }
  render() {
    const { description } = this.state;
    return (
      <div>
        <h2>Add a review for your pet!</h2>
        <div>
          <form className="ReviewForm" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="description">
                  Did they make you feel warm and fuzzy inside?
                </label>
                <input
                  onChange={this.handleChange}
                  name="description"
                  // description="description"
                  type="text"
                  value={description}
                />
              </li>
              <li>
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  // postReview thunk here
  // loadCampus: formSubmission => dispatch(postCampus(formSubmission)),
});
export default connect(null, mapDispatchToProps)(ReviewForm);
