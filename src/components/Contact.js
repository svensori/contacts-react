import { faEdit, faStar as faStarLight } from '@fortawesome/free-regular-svg-icons';
import { faStar, faPhoneAlt, faMapPin, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './Contact.scss';

const Contact = props => {
	const {
		id,
		avatar,
		firstName,
		lastName,
		email,
		phone,
		address,
		stared,
		company,
		occupation
	} = props.data;

	return (
		<div className="card is-shadowless">
			<article className="media">
				<figure className="media-left">
					<p className="image is-64x64">
						<img className="avatar is-rounded" src={avatar} alt={`${firstName} ${lastName}`} />
					</p>
				</figure>
				<div className="media-content">
					<div className="content">
						<p>
							<strong className="is-size-5">{`${firstName} ${lastName}`} </strong>
							<small className="is-italic">{email}</small>
							<br />
							<small>
								{occupation} at <strong>{company}</strong><br />
								<FontAwesomeIcon icon={faMapPin} />: {address}<br />
								<FontAwesomeIcon icon={faPhoneAlt} />: {phone}
							</small>
						</p>
					</div>
					<nav className="level">
						<div className="level-left">
							<div className="level-item has-text-primary">
								<FontAwesomeIcon
									className="cursor-point"
									icon={faEdit}
									onClick={props.toggleEditMode.bind(this, props.data)} />
							</div>
							<div className="level-item has-text-danger">
								<FontAwesomeIcon
									className="cursor-point"
									icon={faTimesCircle}
									onClick={props.handleDelete.bind(this, id)} />
							</div>
						</div>
					</nav>
				</div>
				<figure className="media-right">
					<FontAwesomeIcon
						size={"2x"}
						className="has-text-warning cursor-point"
						icon={stared ? faStar : faStarLight}
						data-tooltip="Tooltip Text"
						onClick={props.markStared.bind(this, id)} />
				</figure>
			</article>
		</div>
	)
}

Contact.propTypes = {
	data: PropTypes.object.isRequired
}

export default Contact
