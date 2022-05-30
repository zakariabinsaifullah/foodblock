// import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		uniqueId,
		productName,
		productNameSize,
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
	return (
		<div {...useBlockProps.save()}>
			<div className="fpb__table">
				<div
					className="fpb__table_head"
					style={{
						backgroundColor: productNameBg,
					}}
				>
					<RichText.Content
						tagName="h2"
						className={`fpb__product_name fpb__single_padding`}
						value={productName}
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
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
			<div className="fpb__product_photo">
				{url && (
					<img src={url} alt={alt} className={`wp-image-${id}`} />
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
					<RichText.Content
						tagName="p"
						className={`fpb__description_content`}
						value={description}
					/>
				</div>
			)}
		</div>
	);
}
