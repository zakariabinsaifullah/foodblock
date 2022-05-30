import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

/**
 * Block Registration
 */

registerBlockType(metadata, {
	icon: {
		src: 'food',
		foreground: '#ffffff',
		background: '#ECAF67',
	},
	edit: Edit,
	save: Save,
});
