/* jshint esversion: 6 */
/* global module:false */

const _ = require('lodash');
const fs = require('fs');
const util = require('util');
const path = require('path');
const prependFile = require('prepend-file');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.registerMultiTask('metaform', 'Javascriptify Metaforms', function () {
    const formJson = require(`${__dirname}/${this.data.src}`);
    const formName = `${this.data.name.substring(0,1).toUpperCase()}${this.data.name.substring(1)}`;
    const functionName = `get${formName}`;
    const data = `function ${functionName}Metaform(){return ${JSON.stringify(formJson)};}`;
    prependFile.sync(this.data.prepend, data);
  });
  
  grunt.initConfig({
    'sass': {
      'tinymce-kunta-api-plugins': {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'tinymce-plugins/src/kunta-api-service-location-channel-embed/scss/',
          src: ['*.scss'],
          dest: 'tinymce-plugins/kunta-api-service-location-channel-embed/',
          ext: '.css'
        }, {
          expand: true,
          cwd: 'tinymce-plugins/src/kunta-api-service-embed/scss/',
          src: ['*.scss'],
          dest: 'tinymce-plugins/kunta-api-service-embed/',
          ext: '.css'
        }]
      }
    },
    'babel': {
      options: {
        sourceMap: true,
        minified: true
      },
      'tinymce-kunta-api-abstract-edit-plugin-dialog': {
        files: [{
          expand: true,
          cwd: 'tinymce-plugins/src/kunta-api-abstract-edit-plugin-dialog/js/',
          src: ['*.js'],
          dest: 'tinymce-plugins/kunta-api-abstract-edit-plugin-dialog/',
          ext: '.js'
        }]
      },
      'tinymce-kunta-api-service-location-channel-embed': {
        files: [{
          expand: true,
          cwd: 'tinymce-plugins/src/kunta-api-service-location-channel-embed/js/',
          src: ['*.js'],
          dest: 'tinymce-plugins/kunta-api-service-location-channel-embed/',
          ext: '.js'
        }]
      },
      'tinymce-kunta-api-service-embed': {
        files: [{
          expand: true,
          cwd: 'tinymce-plugins/src/kunta-api-service-embed/js/',
          src: ['*.js'],
          dest: 'tinymce-plugins/kunta-api-service-embed/',
          ext: '.js'
        }]
      }
    },
    'metaform': {
      'tinymce-kunta-api-service-location-channel-servicelocationservicechannel': {
        'src': 'tinymce-plugins/src/kunta-api-service-location-channel-embed/metaforms/servicelocationservicechannel.json',
        'prepend': 'tinymce-plugins/kunta-api-service-location-channel-embed/plugin.js',
        'name': 'ServiceLocationServiceChannel'
      },
      'tinymce-kunta-api-service-location-channel-servicehour': {
        'src': 'tinymce-plugins/src/kunta-api-service-location-channel-embed/metaforms/servicehour.json',
        'prepend': 'tinymce-plugins/kunta-api-service-location-channel-embed/plugin.js',
        'name': 'ServiceHour'
      },
      'tinymce-kunta-api-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-location-channel-embed/metaforms/additionaldetails.json',
        'prepend': 'tinymce-plugins/kunta-api-service-location-channel-embed/plugin.js',
        'name': 'AdditionalDetails'
      }
    }
  });
  
  grunt.registerTask('default', [ 'sass', 'babel:tinymce-kunta-api-abstract-edit-plugin-dialog', 'babel:tinymce-kunta-api-service-location-channel-embed', 'babel:tinymce-kunta-api-service-embed', 'metaform:tinymce-kunta-api-service-location-channel-servicelocationservicechannel', 'metaform:tinymce-kunta-api-service-location-channel-servicehour', 'metaform:tinymce-kunta-api-additional-details' ]);
};