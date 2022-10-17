import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
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
                    <h4>Comments</h4>
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

const DishDetails = (props) => {
    if(props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetails;