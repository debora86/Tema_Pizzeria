const { registerBlockType} = wp.blocks;
const {MediaUpload, RichText, URLInputButton, BlockControls, AlignmentToolbar, InspectorControls } = wp.editor;
const { IconButton, PanelBody, TextControl } = wp.components;

import { ReactComponent as Logo } from '../logo.svg';
registerBlockType('lapizzeria/hero', {
	title: 'La Pizzeria Hero',
	icon: {src: Logo},
	category: 'lapizzeria',
	attributes: {
		imagenHero: {
			type: 'string',
			selector: '.hero-block'
		},
		tituloHero: {
			type: 'string',
			source: 'html',
			selector: '.hero-block h1'
		},
		textoHero: {
			type: 'string',
			source: 'html',
			selector: '.hero-block p'
		},
		urlHero: {
			type: 'string',
			source: 'attribute',
			attribute: 'href'
		},

		alinearContenido: {
			type: 'string',
			default: 'center'
		},
		alturaHero: {
			type: 'number'
		}
	},
	supports: {
		align: ['wide', 'full']
	},
	edit: props => {
		// extraer valores
		const { attributes: { imagenHero, tituloHero, textoHero, urlHero, alinearContenido, alturaHero }, setAttributes} = props;

		const onSeleccionarImagen = nuevaImagen => {
			setAttributes({ imagenHero : nuevaImagen.sizes.full.url })			
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
		const onChangeAlinearContenido = nuevoAlineacion => {
			setAttributes({ alinearContenido : nuevoAlineacion})
		}
		const onChangeAlturaHero = nuevaAltura => {
			setAttributes({ alturaHero : nuevaAltura })
		}
		return(
			<>
				<InspectorControls>
					<PanelBody title={'Altura Hero'}
						initialOpen={true}	>
						<div className="components-base-control">
    						<div className="components-base-control__field">        							
    							<label className="components-base-control__label">
    							Altura en Pixeles
    							</label>
    							<TextControl
    							type="number"
    							max={700}
    							min={300}
    							step={10}
    							value={alturaHero || 500 }
    							onChange={onChangeAlturaHero}
    							/>	
    						</div>
    					</div>
					</PanelBody>
				</InspectorControls>
				<div className="hero-block" 
					style={{backgroundImage : `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url( ${imagenHero} )`, textAlign: alinearContenido, height:`${alturaHero || 500}px`}} >

					<BlockControls>
						<AlignmentToolbar
						onChange={onChangeAlinearContenido}
						 value={alinearContenido} />
					</BlockControls>

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
					<div className="contenido-hero">
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
				</div>
			</>
		)
	},
	save: props => {

		const { attributes: { imagenHero, tituloHero, textoHero, urlHero, alinearContenido, alturaHero }} = props;
		
		return(
			<div className="hero-block" style={{backgroundImage : `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url( ${imagenHero} )`, textAlign: alinearContenido, height:`${alturaHero || 500}px`}} >
				<div className="contenido-hero">
					<h1 className="titulo">
						<RichText.Content
						value={ tituloHero } />
					</h1>

					<p>
						<RichText.Content value={ textoHero } />
					</p>
					
					<div>
						<a href={urlHero} className="boton boton-primario">Leer Mas</a>
					</div>
				</div>
			</div>
		)
	}
})