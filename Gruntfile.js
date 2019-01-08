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
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'tinymce-plugins/src/kunta-api-service-embed/js/printable-form-service-channel-editor.js', 
          'tinymce-plugins/src/kunta-api-service-embed/js/electronic-service-channel-editor.js', 
          'tinymce-plugins/src/kunta-api-service-embed/js/phone-service-channel-editor.js', 
          'tinymce-plugins/src/kunta-api-service-embed/js/webpage-service-channel-editor.js', 
          'tinymce-plugins/src/kunta-api-service-embed/js/service-channels.js', 
          'tinymce-plugins/src/kunta-api-service-embed/js/plugin.js'
        ],
        dest: 'tinymce-plugins/src/kunta-api-service-embed/build/plugin.js'
      }
    },
    'babel': {
      options: {
        sourceMap: true,
        minified: true,
        comments: false
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
          cwd: 'tinymce-plugins/src/kunta-api-service-embed/build/',
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
      'tinymce-kunta-api-service-channel-servicehour': {
        'src': 'tinymce-plugins/src/kunta-api-abstract-edit-plugin-dialog/metaforms/servicehour.json',
        'prepend': 'tinymce-plugins/kunta-api-abstract-edit-plugin-dialog/abstract-channel-edit-dialog.js',
        'name': 'ServiceHour'
      },
      'tinymce-kunta-api-service-location-channel-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-location-channel-embed/metaforms/additionaldetails.json',
        'prepend': 'tinymce-plugins/kunta-api-service-location-channel-embed/plugin.js',
        'name': 'ServiceLocationChannelAdditionalDetails'
      },
      'tinymce-kunta-api-service': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/service.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'Service'
      },
      'tinymce-kunta-api-service-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/additionaldetails.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'ServiceAdditionalDetails'
      },
      'tinymce-kunta-api-service-channenls': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/servicechannels.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'ServiceChannels'
      },
      'tinymce-electronic-service-channel': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/electronicservicechannel.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'ElectronicServiceChannel'
      },
      'tinymce-electronic-service-channel-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/electronic-service-additionaldetails.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'ElectronicServiceChannelAdditionalDetails'
      },
      'tinymce-phone-service-channel': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/phone-service-channel.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'PhoneServiceChannel'
      },
      'tinymce-phone-service-channel-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/phone-service-additional-details.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'PhoneServiceChannelAdditionalDetails'
      },
      'tinymce-printable-form-service-channel': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/printable-form-service-channel.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'PrintableFormServiceChannel'
      },
      'tinymce-printable-form-service-channel-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/printable-form-service-additional-details.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'PrintableFormServiceChannelAdditionalDetails'
      },
      'tinymce-webpage-service-channel': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/webpage-service-channel.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'WebPageServiceChannel'
      },
      'tinymce-webpage-service-channel-additional-details': {
        'src': 'tinymce-plugins/src/kunta-api-service-embed/metaforms/webpage-service-additional-details.json',
        'prepend': 'tinymce-plugins/kunta-api-service-embed/plugin.js',
        'name': 'WebPageServiceChannelAdditionalDetails'
      }
    },
    "shell": {
      "build-gutenberg": {
        "command": "npx webpack",
        "options": {
          "execOptions": {
            cwd: "gutenberg/blocks/ts"
          }
        }
      }
    }
  });
  
  grunt.registerTask('default', [ 
    'sass', 
    'concat',
    'babel:tinymce-kunta-api-abstract-edit-plugin-dialog', 
    'babel:tinymce-kunta-api-service-location-channel-embed', 
    'babel:tinymce-kunta-api-service-embed', 
    'metaform:tinymce-kunta-api-service-location-channel-servicelocationservicechannel', 
    'metaform:tinymce-kunta-api-service-channel-servicehour', 
    'metaform:tinymce-kunta-api-service-location-channel-additional-details', 
    'metaform:tinymce-kunta-api-service',
    'metaform:tinymce-kunta-api-service-additional-details',
    'metaform:tinymce-kunta-api-service-channenls',
    'metaform:tinymce-electronic-service-channel',
    'metaform:tinymce-electronic-service-channel-additional-details',
    'metaform:tinymce-phone-service-channel',
    'metaform:tinymce-phone-service-channel-additional-details',
    'metaform:tinymce-printable-form-service-channel',
    'metaform:tinymce-printable-form-service-channel-additional-details',
    'metaform:tinymce-webpage-service-channel',
    'metaform:tinymce-webpage-service-channel-additional-details',
    "shell:build-gutenberg"
  ]);
  
};