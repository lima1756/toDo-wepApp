import React from 'react';
import PropTypes from 'prop-types';

const List = ({profile}) => {
    return(<div>{profile.name}</div>);
}

List.propTypes = {
    profile: PropTypes.object.isRequired
};

export default List;