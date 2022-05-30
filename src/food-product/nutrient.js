/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';
const { Fragment } = wp.element;

import colors from '../colors-palette';
/**
 * Block Registration
 */
registerBlockType('fpb/nutrient', {
	title: __('Nutrient Item', 'food-product-block'),
	description: __('Child for Food Product Block', 'food-product-block'),
	icon: 'carrot',
	category: 'common',
	parent: ['fpb/food-product'],
	attributes: {
		nutrientName: {
			type: 'string',
			default: 'Calories',
		},
		nutrientValue: {
			type: 'string',
			default: '250g',
		},
		priceSourceType: {
			type: 'string',
			default: 'text',
		},
		logoUrl: {
			type: 'string',
		},
		logoAlt: {
			type: 'string',
		},
		logoId: {
			type: 'number',
		},
		text: {
			type: 'string',
			default: 'Other retailer',
		},
		link: {
			type: 'string',
			default: '#',
		},
		tab: {
			type: 'boolean',
			default: true,
		},
		color: {
			type: 'string',
			default: '#000000',
		},
		bg: {
			type: 'string',
			default: '#ffffff',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const {
			nutrientName,
			nutrientValue,
			priceSourceType,
			logoUrl,
			logoAlt,
			logoId,
			text,
			link,
			tab,
			color,
			bg,
		} = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Nutrient Options', 'food-product-block')}
						initialOpen={true}
					>
						<TextControl
							label={__('Nutrient Name', 'food-product-block')}
							value={nutrientName}
							onChange={(value) =>
								setAttributes({ nutrientName: value })
							}
							placeholder={__(
								'Nutrient name',
								'food-product-block'
							)}
						/>
						<TextControl
							label={__(
								'Nutrient Measurement',
								'food-product-block'
							)}
							value={nutrientValue}
							onChange={(value) =>
								setAttributes({ nutrientValue: value })
							}
							placeholder={__(
								'Nutrient measurement',
								'food-product-block'
							)}
						/>
						<SelectControl
							label={__('Price Source', 'food-product-block')}
							value={priceSourceType}
							options={[
								{
									label: __(
										'Affiliate Logo',
										'food-product-block'
									),
									value: 'logo',
								},
								{
									label: __(
										'Custom Text',
										'food-product-block'
									),
									value: 'text',
								},
							]}
							onChange={(v) => {
								setAttributes({ priceSourceType: v });
							}}
						/>
						{priceSourceType === 'logo' && (
							<Fragment>
								<p className="fpb__lable">
									{__('Affiliate Logo', 'food-product-block')}
								</p>
								{logoUrl ? (
									<div className="fpb__image_preview">
										<div className="fpb__edit">
											<span
												className="dashicons dashicons-remove"
												onClick={() =>
													setAttributes({
														logoUrl: null,
													})
												}
											></span>
										</div>
										<img src={logoUrl} alt={logoAlt} />
									</div>
								) : (
									<MediaUploadCheck>
										<MediaUpload
											onSelect={(media) =>
												setAttributes({
													logoUrl: media.url,
													logoId: media.id,
													logoAlt: media.alt,
												})
											}
											allowedTypes={['image']}
											value={logoId}
											render={({ open }) => {
												return (
													<Button
														onClick={open}
														isPrimary={true}
													>
														{__(
															'Upload Logo',
															'food-product-block'
														)}
														<span className="dashicons dashicons-upload"></span>
													</Button>
												);
											}}
										/>
									</MediaUploadCheck>
								)}
							</Fragment>
						)}
						{priceSourceType === 'text' && (
							<TextControl
								label={__('Custom Text', 'food-product-block')}
								value={text}
								onChange={(value) =>
									setAttributes({ text: value })
								}
							/>
						)}
						<TextControl
							label={__('Affiliate Link', 'food-product-block')}
							value={link}
							onChange={(value) => setAttributes({ link: value })}
						/>
						{link !== '' && (
							<ToggleControl
								label={__(
									'Open in new tab',
									'food-product-block'
								)}
								checked={tab}
								onChange={() => setAttributes({ tab: !tab })}
							/>
						)}
					</PanelBody>
					<PanelColorSettings
						title={__('Color Settings', 'food-product-block')}
						initialOpen={false}
						colorSettings={[
							{
								value: color,
								onChange: (value) =>
									setAttributes({ color: value }),
								label: __('Color', 'food-product-block'),
								colors,
							},
							{
								value: bg,
								onChange: (value) =>
									setAttributes({ bg: value }),
								label: __('Background', 'food-product-block'),
								colors,
							},
						]}
					/>
				</InspectorControls>
				<div
					{...useBlockProps({
						className: 'wp-block-fpb-nutrient',
					})}
					style={{
						color,
						background: bg,
					}}
				>
					<div className="fpb-nutrient-name fpb__single_padding fpb__bottom_border">
						{nutrientName}
					</div>
					<div className="fpb-nutrient-value fpb__single_padding fpb__bottom_border">
						{nutrientValue}
					</div>
					{priceSourceType === 'logo' ? (
						<a
							className="fpb-nutrient-logo fpb__single_padding"
							href={link}
							target={`${tab ? '_blank' : '_self'}`}
							rel={`${tab ? 'noopener noreferrer' : 'noopener'}`}
						>
							<img src={logoUrl} alt={logoAlt} />
						</a>
					) : (
						<a
							className="fpb-nutrient-logo fpb__single_padding"
							href={link}
							target={`${tab ? '_blank' : '_self'}`}
							rel={`${tab ? 'noopener noreferrer' : 'noopener'}`}
						>
							<div className="fpb-nutrient-text">{text}</div>
						</a>
					)}
				</div>
			</Fragment>
		);
	},
	save: ({ attributes }) => {
		const {
			nutrientName,
			nutrientValue,
			priceSourceType,
			logoUrl,
			logoAlt,
			logoId,
			text,
			link,
			tab,
			color,
			bg,
		} = attributes;

		return (
			<div
				{...useBlockProps.save()}
				style={{
					color,
					background: bg,
				}}
			>
				<div className="fpb-nutrient-name fpb__single_padding fpb__bottom_border">
					{nutrientName}
				</div>
				<div className="fpb-nutrient-value fpb__single_padding fpb__bottom_border">
					{nutrientValue}
				</div>
				{priceSourceType === 'logo' ? (
					<a
						className="fpb-nutrient-logo fpb__single_padding"
						href={link}
						target={`${tab ? '_blank' : '_self'}`}
						rel={`${tab ? 'noopener noreferrer' : 'noopener'}`}
					>
						<img
							src={logoUrl}
							alt={logoAlt}
							className={`wp-image-${logoId}`}
						/>
					</a>
				) : (
					<a
						className="fpb-nutrient-logo fpb__single_padding"
						href={link}
						target={`${tab ? '_blank' : '_self'}`}
						rel={`${tab ? 'noopener noreferrer' : 'noopener'}`}
					>
						<div className="fpb-nutrient-text">{text}</div>
					</a>
				)}
			</div>
		);
	},
});
