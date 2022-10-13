import React, { Component } from "react";
import moment from "moment";

class DishDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    dateFormat(date) {
        return moment(date).format("ll");
    }

    renderDish(dish) {
        if(dish != null) {
            const dishComment = dish.map((comments) => {
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
        const dishComments = this.props.dish.comments

        return(
            <div className="container">
                <div className="row">
                    {this.renderDish(dishComments)}
                </div>
            </div>
        );
    }
}

export default DishDetails;