const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = wp.editor;
const { PanelBody } =wp.components;
/* los 7 pasos para crear un bloque de gunterbert
1) importar RichText
2) colocar el componente donde deseas utilizarlo
3) crear una function 
4) registrar un atributo
5)extraer el contenido desde props
6)guarda el contenido con setAttributes
7) leer los contenidos guardados en save*/
import { ReactComponent as Logo } from '../logo.svg';

registerBlockType('lapizzeria/boxes', {
	title: 'Pizzeria Cajas',
	icon: { src:Logo },
	category: 'lapizzeria',
	attributes: {
		headingBox : {
			type: 'string',
			source: 'html',
			selector: '.box h2'
		},
		textoBox: {
		 	type: 'string',
		 	source: 'html',
			selector: '.box p'
		 },
		 colorFondo: {
		 	type: 'string'
		 },
		 colorTexto: {
		 	type: 'string'
		 },
		 alineacionContenido: {
		 	type: 'string',
		 	default: 'center'
		 }
	},
	edit: (props) => {
		
		const { attributes: { headingBox, textoBox, colorFondo, colorTexto, alineacionContenido }, setAttributes } = props;
		
		
		const onChangeHeadingBox = nuevoHeading => {
			setAttributes({ headingBox : nuevoHeading });
		}

		const onChangeTextoBox = nuevoTexto =>{
		 	setAttributes({ textoBox : nuevoTexto })
		 }

		 const onChangeColorFondo = nuevoColor =>{
		 	setAttributes({ colorFondo : nuevoColor })
		 }
		 const onChangeColorTexto = nuevoColor =>{
		 	setAttributes({ colorTexto : nuevoColor })
		 }

		 const onChangeAlinearContenido = nuevoAlineacion =>{
		 	setAttributes({ alineacionContenido : nuevoAlineacion })
		 }
        return( 
        	<>
        		<InspectorControls>
        			<PanelBody 
	        			title={'Color de Fondo'}
	        			initialOpen={true}>
        					<div className="components-base-control">
        						<div className="components-base-control__field">        							
        							<label className="components-base-control__label">
        							color de Fondo
        						</label>
        						<ColorPalette 
        							onChange={onChangeColorFondo}
        							value={colorFondo} />
        						</div>
        					</div>

        			</PanelBody>
        			<PanelBody 
	        			title={'Color Texto'}
	        			initialOpen={false}>
        					<div className="components-base-control">
        						<div className="components-base-control__field">        							
        							<label className="components-base-control__label">
        							color de Texto
        						</label>
        						<ColorPalette 
        							onChange={onChangeColorTexto}
        							value={colorTexto} />
        						</div>
        					</div>

        			</PanelBody>

        		</InspectorControls>
        		<BlockControls>
        		<AlignmentToolbar
        		onChange={onChangeAlinearContenido} />

        		</BlockControls>
	            <div className="box" style={{ backgroundColor: colorFondo, textAlign : alineacionContenido }}>
	            	<h2 style={{ color: colorTexto }}>
	            		<RichText
		            		placeholder="Agrega encabezado"
		            		onChange={onChangeHeadingBox}
		            		value={headingBox}/>
	            	</h2>
					<p  style={{ color: colorTexto }}>
						<RichText placeholder="agrega Texto"
					 	onChange={onChangeTextoBox}
					 	value={textoBox}/>
					 </p>
		        </div>   	  
		    </>     				
        )
    },
    save: (props) => {
    	console.log(props);
    	const { attributes: { headingBox, textoBox, colorFondo, colorTexto, alineacionContenido } } = props;
        
        return (
                <div className="box" style={{ backgroundColor: colorFondo, textAlign : alineacionContenido }}>
            	<h2  style={{ color: colorTexto }}>
            	
            		<RichText.Content value={headingBox} />
    	       	</h2>
				<p  style={{ color: colorTexto }}>
				 <RichText.Content value={textoBox} />
				 </p>
            </div>         
        )
    }
});
