import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
  
export default CommentForm;