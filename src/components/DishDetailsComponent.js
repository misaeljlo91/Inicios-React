import React, { Component } from "react";
import moment from "moment";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetails extends Component {
    constructor(props) {
        super(props);
    }

    dateFormat(date) {
        return moment(date).format("ll");
    }

    renderDish(dishD) {
        if(dishD != null) {
            const dishDetail = dishD.map((details) => {
                return(
                    <Card>
                        <CardImg width="100%" src={details.image} alt={details.name} />
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

    renderComments(dishC) {
        if(dishC != null) {
            const dishComment = dishC.map((comments) => {
                return( 
                    <div key={comments.id}>
                        <p>{comments.comment}</p>
                        <p>-- {comments.author} - {this.dateFormat(comments.date)}</p>
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

    render() {
        const details = this.props.dish;
        const comments = this.props.dish.comments;

        console.log(comments);

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(details)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(comments)}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetails;