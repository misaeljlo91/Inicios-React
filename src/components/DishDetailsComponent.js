import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import moment from 'moment';

const required = (value) => value && value.length;
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const minLength = (len) => (value) => (value) && (value.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dish, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-comment fa-lg'></span> Submit comment
                </Button>
                                    
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' md={12}>Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option selected>Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className='text-danger'
                                        model='.rating'
                                        show='touched'
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='author' md={12}>Your name</Label>
                                <Col md={12}>
                                    <Control.text model='.author' id='author' name='author'
                                        placeholder='Your name'
                                        className='form-control'
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.author'
                                        show='touched'
                                        messages={{
                                            required: 'Required - ',
                                            minLength: 'Must be greater than 2 characters - ',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model='.comment' id='comment' name='comment'
                                        rows='4'
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group form-comment'>
                                <Col md={{size: 12}}>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

function RenderDish({dish}) {
    if(dish != null) {
        return(
            <div className='col-12 col-md-5 m-1'>
                {dish.map((details) => {
                    return(
                        <Card key={details.id}>
                            <CardImg width='100%' src={details.image} alt={details.name}/>
                            <CardBody>
                                <CardTitle>{details.name}</CardTitle>
                                <CardText>{details.description}</CardText>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

function RenderComments({comments, dish, addComment}) {
    if(comments != null) {
        return(
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {comments.map((comment) => {
                        return(
                            <li key={comment.id}> 
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} - {moment(comment.date).format('ll')}</p>
                            </li>
                        );
                    })}
                </ul>
                {dish.map((dishId) => {
                    return(
                        <CommentForm dish={dishId.id} addComment={addComment}/>
                    );
                })}
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

const DishDetails = (props) => {
    if(props.dish != null) {
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        {props.dish.map((dish) => {
                            return(
                                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                            );
                        })}
                    </Breadcrumb>
                    <div className='col-12'>
                        {props.dish.map((dish) => {
                            return(
                                <h3>{dish.name}</h3>
                            );
                        })}
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dish={props.dish}
                    />
                </div>
            </div>
        );
    }
}

export default DishDetails;