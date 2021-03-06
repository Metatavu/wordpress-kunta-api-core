<?php
/**
 * AddressEntrance
 *
 * PHP version 5
 *
 * @category Class
 * @package  KuntaAPI
 * @author   http://github.com/swagger-api/swagger-codegen
 * @license  http://www.apache.org/licenses/LICENSE-2.0 Apache Licene v2
 * @link     https://github.com/swagger-api/swagger-codegen
 */

/**
 * Kunta API
 *
 * Solution to combine municipality services under single API.
 *
 * OpenAPI spec version: 0.1.0
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */

namespace KuntaAPI\Model;

use \ArrayAccess;

/**
 * AddressEntrance Class Doc Comment
 *
 * @category    Class */
 // @description Entrance for address
/** 
 * @package     KuntaAPI
 * @author      http://github.com/swagger-api/swagger-codegen
 * @license     http://www.apache.org/licenses/LICENSE-2.0 Apache Licene v2
 * @link        https://github.com/swagger-api/swagger-codegen
 */
class AddressEntrance implements ArrayAccess
{
    /**
      * The original name of the model.
      * @var string
      */
    protected static $swaggerModelName = 'AddressEntrance';

    /**
      * Array of property to type mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerTypes = array(
        'name' => '\KuntaAPI\Model\LocalizedValue[]',
        'isMainEntrance' => 'bool',
        'coordinates' => '\KuntaAPI\Model\Coordinates',
        'contactInfo' => '\KuntaAPI\Model\AccessibilityContactInfo',
        'accessibilitySentences' => '\KuntaAPI\Model\AccessibilitySentence[]'
    );

    public static function swaggerTypes()
    {
        return self::$swaggerTypes;
    }

    /**
     * Array of attributes where the key is the local name, and the value is the original name
     * @var string[]
     */
    protected static $attributeMap = array(
        'name' => 'name',
        'isMainEntrance' => 'isMainEntrance',
        'coordinates' => 'coordinates',
        'contactInfo' => 'contactInfo',
        'accessibilitySentences' => 'accessibilitySentences'
    );

    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     * @var string[]
     */
    protected static $setters = array(
        'name' => 'setName',
        'isMainEntrance' => 'setIsMainEntrance',
        'coordinates' => 'setCoordinates',
        'contactInfo' => 'setContactInfo',
        'accessibilitySentences' => 'setAccessibilitySentences'
    );

    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     * @var string[]
     */
    protected static $getters = array(
        'name' => 'getName',
        'isMainEntrance' => 'getIsMainEntrance',
        'coordinates' => 'getCoordinates',
        'contactInfo' => 'getContactInfo',
        'accessibilitySentences' => 'getAccessibilitySentences'
    );

    public static function getters()
    {
        return self::$getters;
    }

    

    

    /**
     * Associative array for storing property values
     * @var mixed[]
     */
    protected $container = array();

    /**
     * Constructor
     * @param mixed[] $data Associated array of property value initalizing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['name'] = isset($data['name']) ? $data['name'] : null;
        $this->container['isMainEntrance'] = isset($data['isMainEntrance']) ? $data['isMainEntrance'] : null;
        $this->container['coordinates'] = isset($data['coordinates']) ? $data['coordinates'] : null;
        $this->container['contactInfo'] = isset($data['contactInfo']) ? $data['contactInfo'] : null;
        $this->container['accessibilitySentences'] = isset($data['accessibilitySentences']) ? $data['accessibilitySentences'] : null;
    }

    /**
     * show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalid_properties = array();
        return $invalid_properties;
    }

    /**
     * validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properteis are valid
     */
    public function valid()
    {
        return true;
    }


    /**
     * Gets name
     * @return \KuntaAPI\Model\LocalizedValue[]
     */
    public function getName()
    {
        return $this->container['name'];
    }

    /**
     * Sets name
     * @param \KuntaAPI\Model\LocalizedValue[] $name List of localized service names.
     * @return $this
     */
    public function setName($name)
    {
        $this->container['name'] = $name;

        return $this;
    }

    /**
     * Gets isMainEntrance
     * @return bool
     */
    public function getIsMainEntrance()
    {
        return $this->container['isMainEntrance'];
    }

    /**
     * Sets isMainEntrance
     * @param bool $isMainEntrance Indicates if entrance is main entrance.
     * @return $this
     */
    public function setIsMainEntrance($isMainEntrance)
    {
        $this->container['isMainEntrance'] = $isMainEntrance;

        return $this;
    }

    /**
     * Gets coordinates
     * @return \KuntaAPI\Model\Coordinates
     */
    public function getCoordinates()
    {
        return $this->container['coordinates'];
    }

    /**
     * Sets coordinates
     * @param \KuntaAPI\Model\Coordinates $coordinates
     * @return $this
     */
    public function setCoordinates($coordinates)
    {
        $this->container['coordinates'] = $coordinates;

        return $this;
    }

    /**
     * Gets contactInfo
     * @return \KuntaAPI\Model\AccessibilityContactInfo
     */
    public function getContactInfo()
    {
        return $this->container['contactInfo'];
    }

    /**
     * Sets contactInfo
     * @param \KuntaAPI\Model\AccessibilityContactInfo $contactInfo
     * @return $this
     */
    public function setContactInfo($contactInfo)
    {
        $this->container['contactInfo'] = $contactInfo;

        return $this;
    }

    /**
     * Gets accessibilitySentences
     * @return \KuntaAPI\Model\AccessibilitySentence[]
     */
    public function getAccessibilitySentences()
    {
        return $this->container['accessibilitySentences'];
    }

    /**
     * Sets accessibilitySentences
     * @param \KuntaAPI\Model\AccessibilitySentence[] $accessibilitySentences List of accessibility sentences.
     * @return $this
     */
    public function setAccessibilitySentences($accessibilitySentences)
    {
        $this->container['accessibilitySentences'] = $accessibilitySentences;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     * @param  integer $offset Offset
     * @return boolean
     */
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     * @param  integer $offset Offset
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }

    /**
     * Sets value based on offset.
     * @param  integer $offset Offset
     * @param  mixed   $value  Value to be set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     * @param  integer $offset Offset
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }

    /**
     * Gets the string presentation of the object
     * @return string
     */
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) { // use JSON pretty print
            return json_encode(\KuntaAPI\ObjectSerializer::sanitizeForSerialization($this), JSON_PRETTY_PRINT);
        }

        return json_encode(\KuntaAPI\ObjectSerializer::sanitizeForSerialization($this));
    }
}


