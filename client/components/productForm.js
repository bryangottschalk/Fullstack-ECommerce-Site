import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProductThunk } from '../store/allProducts';
import { runInThisContext } from 'vm';
import { getCategoriesThunk } from '../store/categories';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAvailabilityCheckbox = this.handleAvailabilityCheckbox.bind(
      this
    );
    this.handleCategoryCheckbox = this.handleCategoryCheckbox.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      const newCategories = this.props.categories.map(category => {
        const obj = {};
        obj.name = category.name;
        obj.value = false;
        return obj;
      });
      this.setState({ categories: newCategories });
    }
  }
  handleChange(event) {
    console.log('inside handle change');
    console.log('event.target', event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('inside handle submit');
    event.preventDefault();
    this.props.addProduct(this.state);
  }

  handleAvailabilityCheckbox() {
    this.setState({ availability: !this.state.availability });
  }

  handleCategoryCheckbox(event) {
    console.log('CLICKED ON', event.target.innerText);
    console.log('STATE.categories', this.state.categories);

    const editedCategories = this.state.categories.map(category => {
      console.log('CATEGORY', category);
      if (category.name === event.target.innerText) {
        console.log('-----match-----');
        console.log('category name', category.name);
        console.log('category.value', category.value);
        console.log('!category.value', !category.value);
        return { category: category.name, value: !category.value };
      } else {
        console.log('category inside no match', category);
        return category;
      }
    });
    console.log('edited categories');
    this.setState({ categories: editedCategories });
    // const editedCategories = this.state.categories.map(category => {
    //     //console.log('category', category)
    //     //console.log('event.target.inneretxt', event.target.innerText)
    //     if (category.name === event.target.innerText) {
    //         console.log('inside')
    //         return { category: category.name, value: !category.value }
    //     } else {
    //         return { category: category.name, value: category.value }
    //     }
    // })
    //this.setState({ categories: [] })
    //console.log('EDITED CATEGORIES', editedCategories)

    console.log('this.state', this.state);
  }

  render() {
    const {
      name,
      description,
      imageUrl,
      price,
      inventoryQuantity,
      availability,
      categories
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} success={this.state.formSuccess}>
        <Form.Group>
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="Tell us more about this product"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Image URL"
            placeholder="Image URL"
            required
            name="imageUrl"
            onChange={this.handleChange}
            value={imageUrl}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Price"
            placeholder="Price"
            value={price}
            name="price"
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Inventory Quantity"
            placeholder="Quantity"
            name="inventoryQuantity"
            value={inventoryQuantity}
            onChange={this.handleChange}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <label>Categories</label>
          {this.props.categories.map(category => (
            <Form.Checkbox
              key={category.name}
              label={category.name}
              name={category.name}
              value={category.name}
              onChange={this.handleCategoryCheckbox}
            />
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Checkbox
            label="Available?"
            name="availability"
            value={availability}
            onChange={this.handleAvailabilityCheckbox}
          />
        </Form.Group>

        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProductThunk(product)),
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
