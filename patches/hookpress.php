<?php

defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

add_filter("hookpress_request", function ($request) {
  $request["blocking"] = false;
  return $request;
});

?>