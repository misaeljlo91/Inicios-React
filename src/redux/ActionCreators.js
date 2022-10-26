import * as ActionTypes from './ActionTypes';

export const addComment = (dish, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dish: dish,
        rating: rating,
        author: author,
        comment: comment
    }
});