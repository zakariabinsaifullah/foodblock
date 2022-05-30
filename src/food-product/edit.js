import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	InnerBlocks,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ColorPalette,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
	FontSizePicker,
	__experimentalBorderControl as BorderControl,
	ToggleControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

// import child block
import './nutrient';

// colors
import colors from '../colors-palette';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		uniqueId,
		productNameSize,
		productName,
		productNameColor,
		productNameBg,
		labelsColor,
		labelsBg,
		nutrientsLabel,
		measurementLabel,
		labelsSize,
		priceLabel,
		url,
		alt,
		id,
		showDescription,
		description,
		descriptionBg,
		descriptionBorder,
	} = attributes;
	setAttributes({
		uniqueId: clientId.slice(0, 8),
	});
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Product Title', 'food-product-block')}
					initialOpen={true}
				>
					<p className="fpb__label">
						{__('Product Title Size', 'food-product-block')}
					</p>
					<FontSizePicker
						fontSizes={[
							{
								name: __('Small', 'food-product-block'),
								slug: 'small',
								size: 14,
							},
							{
								name: __('Normal', 'food-product-block'),
								slug: 'normal',
								size: 16,
							},
							{
								name: __('Medium', 'food-product-block'),
								slug: 'medium',
								size: 18,
							},
							{
								name: __('Large', 'food-product-block'),
								slug: 'large',
								size: 20,
							},
							{
								name: __('Extra Large', 'food-product-block'),
								slug: 'extra-large',
								size: 24,
							},
						]}
						value={productNameSize}
						onChange={(newFontSize) => {
							setAttributes({ productNameSize: newFontSize });
						}}
						disableCustomFontSizes={true}
					/>
					<p className="custom__editor__label">
						{__('Title Color', 'food-product-block')}
					</p>
					<ColorPalette
						colors={colors}
						value={productNameColor}
						onChange={(newColor) =>
							setAttributes({ productNameColor: newColor })
						}
					/>
					<p className="custom__editor__label">
						{__('Background Color', 'food-product-block')}
					</p>
					<ColorPalette
						colors={colors}
						value={productNameBg}
						onChange={(newColor) =>
							setAttributes({ productNameBg: newColor })
						}
					/>
				</PanelBody>
				<PanelBody
					title={__('Product Table Labels', 'food-product-block')}
					initialOpen={false}
				>
					<p className="fpb__label">
						{__('Labels Size', 'food-product-block')}
					</p>
					<FontSizePicker
						fontSizes={[
							{
								name: __('Small', 'food-product-block'),
								slug: 'small',
								size: 12,
							},
							{
								name: __('Normal', 'food-product-block'),
								slug: 'normal',
								size: 14,
							},
							{
								name: __('Medium', 'food-product-block'),
								slug: 'medium',
								size: 15,
							},
							{
								name: __('Large', 'food-product-block'),
								slug: 'large',
								size: 17,
							},
							{
								name: __('Extra Large', 'food-product-block'),
								slug: 'extra-large',
								size: 18,
							},
						]}
						value={labelsSize}
						onChange={(newFontSize) => {
							setAttributes({ labelsSize: newFontSize });
						}}
						disableCustomFontSizes={true}
					/>
					<TextControl
						label={__('Nutrients Label', 'food-product-block')}
						value={nutrientsLabel}
						onChange={(text) =>
							setAttributes({ nutrientsLabel: text })
						}
						placeholder={__('Nutrients', 'food-product-block')}
					/>
					<TextControl
						label={__('Measurement Label', 'food-product-block')}
						value={measurementLabel}
						onChange={(text) =>
							setAttributes({ measurementLabel: text })
						}
						placeholder={__('Meansurement', 'food-product-block')}
					/>
					<TextControl
						label={__('Prices Check Label', 'food-product-block')}
						value={priceLabel}
						onChange={(text) => setAttributes({ priceLabel: text })}
						placeholder={__('Prices Check', 'food-product-block')}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__('Labels Colors', 'food-product-block')}
					initialOpen={false}
					colorSettings={[
						{
							value: labelsColor,
							onChange: (value) =>
								setAttributes({ labelsColor: value }),
							label: __('Labels Color', 'food-product-block'),
							colors,
						},
						{
							value: labelsBg,
							onChange: (value) =>
								setAttributes({ labelsBg: value }),
							label: __(
								'Labels Background',
								'food-product-block'
							),
							colors,
						},
					]}
				/>
				<PanelBody
					title={__('Product Description', 'food-product-block')}
					initialOpen={false}
				>
					<ToggleControl
						label={__('Show Description', 'food-product-block')}
						checked={showDescription}
						onChange={() =>
							setAttributes({ showDescription: !showDescription })
						}
					/>
					{showDescription && (
						<Fragment>
							<BorderControl
								colors={colors}
								label={__(
									'Description Border',
									'food-product-block'
								)}
								onChange={(value) =>
									setAttributes({ descriptionBorder: value })
								}
								value={descriptionBorder}
								withSlider={true}
							/>
							<p className="fpb__label">
								{__(
									'Description Background Color',
									'food-product-block'
								)}
							</p>
							<ColorPalette
								colors={colors}
								value={descriptionBg}
								onChange={(newColor) =>
									setAttributes({ descriptionBg: newColor })
								}
							/>
						</Fragment>
					)}
				</PanelBody>
			</InspectorControls>

			{url && (
				<BlockControls>
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									setAttributes({
										url: media.url,
										id: media.id,
										alt: media.alt,
									})
								}
								allowedTypes={['image']}
								value={id}
								render={({ open }) => {
									return (
										<ToolbarButton
											label={__(
												'Edit Photo',
												'food-product-block'
											)}
											onClick={open}
											icon="edit"
										/>
									);
								}}
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				<div className="fpb__table">
					<div
						className="fpb__table_head"
						style={{
							backgroundColor: productNameBg,
						}}
					>
						<RichText
							tagName="h2"
							className={`fpb__product_name fpb__single_padding`}
							value={productName}
							onChange={(content) =>
								setAttributes({ productName: content })
							}
							placeholder={__(
								'Product Title',
								'food-product-block'
							)}
							style={{
								fontSize: productNameSize,
								color: productNameColor,
							}}
						/>
					</div>
					<div className="fpb__table_body">
						<div
							className="fpb__labels"
							style={{
								color: labelsColor,
								backgroundColor: labelsBg,
								fontSize: labelsSize,
							}}
						>
							<div className="fpb__single_label fpb__single_padding fpb__bottom_border">
								{nutrientsLabel}
							</div>
							<div className="fpb__single_label fpb__single_padding fpb__bottom_border">
								{measurementLabel}
							</div>
							<div className="fpb__single_label fpb__single_padding">
								{priceLabel}
							</div>
						</div>
						<div className="fpb__inner_items">
							<InnerBlocks
								allowedBlocks={['fpb/nutrient']}
								template={[['fpb/nutrient'], ['fpb/nutrient']]}
							/>
						</div>
					</div>
				</div>
				<div className="fpb__product_photo">
					{url ? (
						<img src={url} alt={alt} className={`wp-image-${id}`} />
					) : (
						<MediaPlaceholder
							onSelect={(media) =>
								setAttributes({
									id: media.id,
									url: media.url,
									alt: media.alt,
								})
							}
							allowedTypes={['image']}
							multiple={false}
							labels={{
								title: __(
									'Add Product Image',
									'food-product-block'
								),
							}}
						/>
					)}
				</div>
				{showDescription && (
					<div
						className="fpb__product_description"
						style={{
							border: `${descriptionBorder.width} ${descriptionBorder.style} ${descriptionBorder.color}`,
							backgroundColor: descriptionBg,
						}}
					>
						<RichText
							tagName="p"
							className={`fpb__description_content`}
							value={description}
							onChange={(content) =>
								setAttributes({ description: content })
							}
							placeholder={__(
								'Product Description',
								'food-product-block'
							)}
						/>
					</div>
				)}
			</div>
		</Fragment>
	);
}
