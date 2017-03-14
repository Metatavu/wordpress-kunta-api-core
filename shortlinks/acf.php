<?php
if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_shortlinks',
		'title' => 'Shortlinks',
		'fields' => array (
			array (
				'key' => 'field_58bd9c741036f',
				'label' => __('Path', KUNTA_API_CORE_I18N_DOMAIN),
				'name' => 'path',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => __('Path of shortlink (e.g. /path)', KUNTA_API_CORE_I18N_DOMAIN),
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
			array (
				'key' => 'field_58bd9d1c26357',
				'label' => __('URL', KUNTA_API_CORE_I18N_DOMAIN),
				'name' => 'url',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => __( 'Address where shortlink points to (e.g. https://www.example.com/some/page)', KUNTA_API_CORE_I18N_DOMAIN),
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'shortlink',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'no_box',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}
?>