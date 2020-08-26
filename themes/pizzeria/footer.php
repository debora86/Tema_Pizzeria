<footer class="site-footer">
	<?php 
			$arg =  array(
			'theme_location' =>'header-menu',
			'container' => 'nav',
			'container_class' => 'footer-nav',
			'after' => '<span class="separador"> | <span>'
			  );
			 wp_nav_menu( $arg );
		  ?>
	<div class="direccion">
		<p>Chacaito Av Universidad con los Robles Local 132 </p>
		<p>Telefono: 02123566962</p>
	</div>
</footer>
<?php  wp_footer(); ?>
</body>
</html>