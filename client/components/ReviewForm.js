import React from 'react';
import { connect } from 'react-redux';
import { postReviewThunk } from '../store/reviews';
import { Input } from 'semantic-ui-react';

const initialState = {
  content: '',
  star: ''
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
    this.props.postReview(this.state, this.props.productId);
    this.setState(initialState);
  }
  render() {
    const { content, star } = this.state;
    return (
      <div>
        <h2>Add a review for your pet!</h2>
        <div>
          <form
            className="ReviewForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <ul>
              <li>
                <label htmlFor="content">
                  Tell us about your pet experience. Has it made you feel warm
                  and fuzzy inside?
                </label>
                <Input
                  onChange={this.handleChange}
                  name="content"
                  type="text"
                  value={content}
                />
              </li>
              <li>
                <label htmlFor="star">
                  What would you rate it from 0 to 5 stars?
                </label>
                <Input
                  list="stars"
                  onChange={this.handleChange}
                  name="star"
                  type="text"
                  value={star}
                  placeholder="Rate..."
                />
                <datalist id="stars">
                  <option value="1" />
                  <option value="2" />
                  <option value="3" />
                  <option value="4" />
                  <option value="5" />
                </datalist>
              </li>
              <button type="submit">Submit</button>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postReview: (formSubmission, productId) =>
    dispatch(postReviewThunk(formSubmission, productId))
});
export default connect(null, mapDispatchToProps)(ReviewForm);
