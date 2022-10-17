import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

function RenderDish({dish}) {
    if(dish != null) {
        const dishDetail = dish.map((details) => {
            return(
                <Card key={details.id}>
                    <CardImg width="100%" src={details.image} alt={details.name}/>
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
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <RenderName name={props.dish}/>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>
                            <RenderName name={props.dish}/>
                        </h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetails;