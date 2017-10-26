/* jshint esversion: 6 */
/* global module:false */

const _ = require('lodash');
const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    'sass': {
      'tinymce-kunta-api-service-location-channel-embed': {
        options: {
          style: 'compressed'
      },
      files: [{
        expand: true,
        cwd: 'tinymce-plugins/src/kunta-api-service-location-channel-embed/scss/',
        src: ['*.scss'],
        dest: 'tinymce-plugins/kunta-api-service-location-channel-embed/',
        ext: '.css'
      }]
      }
    },
    'babel': {
      options: {
        sourceMap: true,
        minified: true
      },
      'tinymce-kunta-api-service-location-channel-embed': {
        files: [{
          expand: true,
          cwd: 'tinymce-plugins/src/kunta-api-service-location-channel-embed/js/',
          src: ['*.js'],
          dest: 'tinymce-plugins/kunta-api-service-location-channel-embed/',
          ext: '.js'
        }]
      }
    }
  });
  
  grunt.registerTask('default', [ 'sass', 'babel:tinymce-kunta-api-service-location-channel-embed' ]);
};