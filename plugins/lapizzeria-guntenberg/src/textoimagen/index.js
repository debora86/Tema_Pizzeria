const { registerBlockType} = wp.blocks;
 const {MediaUpload, RichText, URLInputButton, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton } = wp.components;

import { ReactComponent as Logo } from '../logo.svg';
 

registerBlockType('lapizzeria/textoimagen', {

 	title: 'La Pizzeria Texto e Imagen',
 	icon: { src:Logo },
 	category: 'lapizzeria', 
 	 attributes: {
 		imagenFondo: {
 			type: 'string',
 			selector: 'ingredientes-bloque'
 		},
 		tituloHero: {
 			type: 'string',
 			source: 'html',
			selector: '.contenido-ingredientes h1'
 		},
 		textoHero: {
 			type: 'string',
 			source: 'html',
			selector: '.contenido-ingredientes p'
 		},

 		urlHero: {
			type: 'string',
			source: 'attribute',
			attribute: 'href'
		},
		imagenIngredientes: {
			type: 'string',
			source: 'attribute',
 			selector: 'imagen-ingredientes img',
 			attribute: 'src',
 			default: Logo
		}
 	},
 	supports: {
		align: ['wide', 'full']
	},
	edit: props => {

		// extraer los valores
		const { attributes:{ imagenFondo, tituloHero, textoHero, urlHero, imagenIngredientes }, setAttributes} = props;

		const onSeleccionarImagen = nuevaImagen => {
			setAttributes({ imagenFondo : nuevaImagen.sizes.full.url })			
		}

		const onChangeTitulo = nuevoTitulo => {
				setAttributes({ tituloHero : nuevoTitulo })
		}

		const onChangeTexto = nuevoTexto => {
			setAttributes({ textoHero : nuevoTexto })
		}

		const onChangeURL = nuevoUrl => {
			setAttributes({ urlHero : nuevoUrl })
		}

		const onSeleccionarImagenIngredientes = nuevaImagenIngrediente => {
			setAttributes({ imagenIngredientes : nuevaImagenIngrediente.sizes.full.url })
		}
		return(
			<div className="ingredientes-bloque" style={{backgroundImage : `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url(${imagenFondo})`}}>
				<MediaUpload
						onSelect={onSeleccionarImagen}
						type="image"
						render={({ open }) => (
							<IconButton 
							className="lapizzeria-agregar-imagen"
							onClick={open}
							icon="format-image"
							showTooltip="true"
							label="Cambiar Imagen" />
						) }
					/>
				<div className="contenido-ingredientes">		
					<div className="texto-ingredientes">
						<h1 className="titulo">
							<RichText 
							placeholder={'Agregar el Titulo del Hero'}
							onChange={onChangeTitulo}
							value={tituloHero}
							/>
						</h1>
						<p>
							<RichText 
							placeholder={'Agregar el Texto del Hero'}
							onChange={onChangeTexto}
							value={textoHero}
							/>
						</p>
							<div>
								<a href={urlHero} className="boton boton-primario">Leer Mas</a>
							</div>
							<URLInputButton 
								onChange={onChangeURL}
								url={urlHero}
							/>
						
					</div>
					<div className="imagen-ingredientes">
						<img src={imagenIngredientes} />
						<MediaUpload
							onSelect={onSeleccionarImagenIngredientes}
							type="image"
							render={({ open }) => (
								<IconButton 
								className="lapizzeria-agregar-imagen"
								onClick={open}
								icon="format-image"
								showTooltip="true"
								label="Cambiar Imagen" />
							) }
						/>
					</div>
				</div>
			</div>
			)

	},

	save: props => {
		const { attributes:{ imagenFondo, tituloHero, textoHero, urlHero, imagenIngredientes }} = props;
		
		return(
			<div className="ingredientes-bloque" style={{backgroundImage : `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url(${imagenFondo})`}}>
				
				<div className="contenido-ingredientes">		
					<div className="texto-ingredientes">
						<h1 className="titulo">
							<RichText.Content
							value={tituloHero}
							/>
						</h1>
						<p>
							<RichText.Content 
							value={textoHero}
							/>
						</p>
						<div>
							<a href={urlHero} className="boton boton-primario">Leer Mas</a>
						</div>
					</div>
					<div className="imagen-ingredientes">
						<img src={imagenIngredientes} />
					</div>
				</div>
			</div>
		)
	}

})
