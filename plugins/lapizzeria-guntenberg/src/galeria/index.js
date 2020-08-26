const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const { IconButton } = wp.components;

import { ReactComponent as Logo } from '../logo.svg';

registerBlockType('lapizzeria/imagenes', {
	title: 'La pizzeria Galeria',
	icon: { src : Logo},
	category: 'lapizzeria',
	attributes: {
		imagenes: {
			type: 'array'
		}
	},
	edit: props => {
		// extender valores
		const { attributes: {imagenes = [] }, setAttributes } = props;
		console.log(imagenes);

		const borrarImagen = imagenIndex => {
			const nuevaImagenes = imagenes.filter((Imagen, index ) => index !== imagenIndex);
			setAttributes({imagenes: nuevaImagenes});
		}

		const onSeleccionarNuevaImagen = nuevaImagen => {
			const imagen = {
				thumb: nuevaImagen.sizes.medium.url,
				full: nuevaImagen.sizes.full.url,
				íd: nuevaImagen.id
			}
			setAttributes({ imagenes : [...imagenes, imagen] })
		}
		return(
			<div className="galeria-pizzeria">

				<MediaUpload
					onSelect={onSeleccionarNuevaImagen}
					type="image"
					render={ ({open}) => (
						<IconButton
							className="lapizzeria-agregar-img"
							onClick={open}
							icon="format-image"
							showTooltip="true"
							label="Cambiar Imagen"
						/>
					)}
				/>
				<h2 className="texto-primario">Galeria</h2>
				<ul className="listado-imagenes">
					{imagenes.map((imagen, index) => (
						<li className="imagen">
						<div className="borrar-imagen"
							onClick={ () =>borrarImagen(index) } >
							<span className="dashicons dashicons-trash"></span>
						</div>
							<img src={imagen.thumb} />
						</li>
					))}
				</ul>
			</div>
		);
	},
	save: props => {
		const { attributes: {imagenes = []} } = props;

		if(imagenes.length === 0) {
			return (
			<p>no hay imagenes</p>
			)
		}
		return(
		<div className="galeria-pizzeria">
			<h2 className="texto-primario">Galeria</h2>
			<ul className="listado-imagenes">
				{imagenes.map(imagen => (
					<li className="imagen">	
					<a href={imagen.full} data-lightbox="galeria">					
						<img src={imagen.thumb} />
					</a>
					</li>
				))}
			</ul>
		</div>
		)
	}
})