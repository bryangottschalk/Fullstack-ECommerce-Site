import React from 'react';
import { connect } from 'react-redux';
import { postReviewThunk } from '../store/reviews';
import { Input, Button, List } from 'semantic-ui-react';

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
    this.props.postReview(
      this.state,
      this.props.productId,
      this.props.userName,
      this.props.imageUrl
    );
    this.setState(initialState);
  }
  render() {
    const { content, star } = this.state;

    return (
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <h2>Add a review for your pet!</h2>
        <div>
          <form
            className="ReviewForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <List>
              <List.Item padding="0">
                <label htmlFor="content">
                  Tell us about your pet experience. Does it make you feel warm
                  and fuzzy inside?
                </label>
                <Input
                  onChange={this.handleChange}
                  name="content"
                  type="text"
                  placeholder="Add your review!"
                  value={content}
                />
              </List.Item>
              <List.Item>
                <label htmlFor="star">
                  What would you rate it from 0 to 5 stars?
                </label>
                <Input
                  list="stars"
                  onChange={this.handleChange}
                  name="star"
                  type="number"
                  icon="star outline"
                  value={star}
                  min="0"
                  max="5"
                  step="1"
                />
              </List.Item>
              <Button type="submit" size="mini" basic color="teal">
                Submit
              </Button>
            </List>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postReview: (formSubmission, productId, userName, imageUrl) =>
    dispatch(postReviewThunk(formSubmission, productId, userName, imageUrl))
});
export default connect(null, mapDispatchToProps)(ReviewForm);
