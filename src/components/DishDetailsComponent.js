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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='yourname' md={12}>Your name</Label>
                                <Col md={12}>
                                    <Control.text model='.yourname' id='yourname' name='yourname'
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
                                        model='.yourname'
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
                                <Label htmlFor='message' md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model='.message' id='message' name='message'
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
        const dishDetail = dish.map((details) => {
            return(
                <Card key={details.id}>
                    <CardImg width='100%' src={details.image} alt={details.name}/>
                    <CardBody>
                        <CardTitle>{details.name}</CardTitle>
                        <CardText>{details.description}</CardText>
                    </CardBody>
                </Card>
            );
        });

        return dishDetail;
    }else{
        return(
            <div></div>
        );
    }
}

function RenderComments({comments}) {
    if(comments != null) {
        const dishComment = comments.map((comment) => {
            return( 
                <div key={comment.id}>
                    
                    <div>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} - {moment(comment.date).format('ll')}</p>
                    </div>
                </div>
            );
        });

        return dishComment;
    }else{
        return(
            <div></div>
        );
    }
}

function RenderName({name}) {
    if(name != null) {
        const dishName = name.map((dish) => {
            return(
                <>{dish.name}</>
            );
        });

        return dishName;
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
                        <BreadcrumbItem active>
                            <RenderName name={props.dish}/>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>
                            <RenderName name={props.dish}/>
                        </h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}/>
                        <CommentForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetails;