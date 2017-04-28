<?php
/**
 * ServiceLocationServiceChannel
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
 * ServiceLocationServiceChannel Class Doc Comment
 *
 * @category    Class */
/** 
 * @package     KuntaAPI
 * @author      http://github.com/swagger-api/swagger-codegen
 * @license     http://www.apache.org/licenses/LICENSE-2.0 Apache Licene v2
 * @link        https://github.com/swagger-api/swagger-codegen
 */
class ServiceLocationServiceChannel implements ArrayAccess
{
    /**
      * The original name of the model.
      * @var string
      */
    protected static $swaggerModelName = 'ServiceLocationServiceChannel';

    /**
      * Array of property to type mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerTypes = array(
        'id' => 'string',
        'organizationId' => 'string',
        'names' => '\KuntaAPI\Model\LocalizedValue[]',
        'descriptions' => '\KuntaAPI\Model\LocalizedValue[]',
        'serviceAreaRestricted' => 'bool',
        'phoneNumbers' => '\KuntaAPI\Model\Phone[]',
        'emails' => '\KuntaAPI\Model\Email[]',
        'languages' => 'string[]',
        'phoneServiceCharge' => 'bool',
        'webPages' => '\KuntaAPI\Model\WebPage[]',
        'serviceAreas' => '\KuntaAPI\Model\Municipality[]',
        'addresses' => '\KuntaAPI\Model\Address[]',
        'serviceHours' => '\KuntaAPI\Model\ServiceHour[]',
        'publishingStatus' => 'string'
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
        'id' => 'id',
        'organizationId' => 'organizationId',
        'names' => 'names',
        'descriptions' => 'descriptions',
        'serviceAreaRestricted' => 'serviceAreaRestricted',
        'phoneNumbers' => 'phoneNumbers',
        'emails' => 'emails',
        'languages' => 'languages',
        'phoneServiceCharge' => 'phoneServiceCharge',
        'webPages' => 'webPages',
        'serviceAreas' => 'serviceAreas',
        'addresses' => 'addresses',
        'serviceHours' => 'serviceHours',
        'publishingStatus' => 'publishingStatus'
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
        'id' => 'setId',
        'organizationId' => 'setOrganizationId',
        'names' => 'setNames',
        'descriptions' => 'setDescriptions',
        'serviceAreaRestricted' => 'setServiceAreaRestricted',
        'phoneNumbers' => 'setPhoneNumbers',
        'emails' => 'setEmails',
        'languages' => 'setLanguages',
        'phoneServiceCharge' => 'setPhoneServiceCharge',
        'webPages' => 'setWebPages',
        'serviceAreas' => 'setServiceAreas',
        'addresses' => 'setAddresses',
        'serviceHours' => 'setServiceHours',
        'publishingStatus' => 'setPublishingStatus'
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
        'id' => 'getId',
        'organizationId' => 'getOrganizationId',
        'names' => 'getNames',
        'descriptions' => 'getDescriptions',
        'serviceAreaRestricted' => 'getServiceAreaRestricted',
        'phoneNumbers' => 'getPhoneNumbers',
        'emails' => 'getEmails',
        'languages' => 'getLanguages',
        'phoneServiceCharge' => 'getPhoneServiceCharge',
        'webPages' => 'getWebPages',
        'serviceAreas' => 'getServiceAreas',
        'addresses' => 'getAddresses',
        'serviceHours' => 'getServiceHours',
        'publishingStatus' => 'getPublishingStatus'
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
        $this->container['id'] = isset($data['id']) ? $data['id'] : null;
        $this->container['organizationId'] = isset($data['organizationId']) ? $data['organizationId'] : null;
        $this->container['names'] = isset($data['names']) ? $data['names'] : null;
        $this->container['descriptions'] = isset($data['descriptions']) ? $data['descriptions'] : null;
        $this->container['serviceAreaRestricted'] = isset($data['serviceAreaRestricted']) ? $data['serviceAreaRestricted'] : null;
        $this->container['phoneNumbers'] = isset($data['phoneNumbers']) ? $data['phoneNumbers'] : null;
        $this->container['emails'] = isset($data['emails']) ? $data['emails'] : null;
        $this->container['languages'] = isset($data['languages']) ? $data['languages'] : null;
        $this->container['phoneServiceCharge'] = isset($data['phoneServiceCharge']) ? $data['phoneServiceCharge'] : null;
        $this->container['webPages'] = isset($data['webPages']) ? $data['webPages'] : null;
        $this->container['serviceAreas'] = isset($data['serviceAreas']) ? $data['serviceAreas'] : null;
        $this->container['addresses'] = isset($data['addresses']) ? $data['addresses'] : null;
        $this->container['serviceHours'] = isset($data['serviceHours']) ? $data['serviceHours'] : null;
        $this->container['publishingStatus'] = isset($data['publishingStatus']) ? $data['publishingStatus'] : null;
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
     * Gets id
     * @return string
     */
    public function getId()
    {
        return $this->container['id'];
    }

    /**
     * Sets id
     * @param string $id Identifier for the service channel.
     * @return $this
     */
    public function setId($id)
    {
        $this->container['id'] = $id;

        return $this;
    }

    /**
     * Gets organizationId
     * @return string
     */
    public function getOrganizationId()
    {
        return $this->container['organizationId'];
    }

    /**
     * Sets organizationId
     * @param string $organizationId Organization identifier responsible for the channel.
     * @return $this
     */
    public function setOrganizationId($organizationId)
    {
        $this->container['organizationId'] = $organizationId;

        return $this;
    }

    /**
     * Gets names
     * @return \KuntaAPI\Model\LocalizedValue[]
     */
    public function getNames()
    {
        return $this->container['names'];
    }

    /**
     * Sets names
     * @param \KuntaAPI\Model\LocalizedValue[] $names Localized list of service channel names.
     * @return $this
     */
    public function setNames($names)
    {
        $this->container['names'] = $names;

        return $this;
    }

    /**
     * Gets descriptions
     * @return \KuntaAPI\Model\LocalizedValue[]
     */
    public function getDescriptions()
    {
        return $this->container['descriptions'];
    }

    /**
     * Sets descriptions
     * @param \KuntaAPI\Model\LocalizedValue[] $descriptions List of localized service channel descriptions.
     * @return $this
     */
    public function setDescriptions($descriptions)
    {
        $this->container['descriptions'] = $descriptions;

        return $this;
    }

    /**
     * Gets serviceAreaRestricted
     * @return bool
     */
    public function getServiceAreaRestricted()
    {
        return $this->container['serviceAreaRestricted'];
    }

    /**
     * Sets serviceAreaRestricted
     * @param bool $serviceAreaRestricted Is the service location channel restricted by service area.
     * @return $this
     */
    public function setServiceAreaRestricted($serviceAreaRestricted)
    {
        $this->container['serviceAreaRestricted'] = $serviceAreaRestricted;

        return $this;
    }

    /**
     * Gets phoneNumbers
     * @return \KuntaAPI\Model\Phone[]
     */
    public function getPhoneNumbers()
    {
        return $this->container['phoneNumbers'];
    }

    /**
     * Sets phoneNumbers
     * @param \KuntaAPI\Model\Phone[] $phoneNumbers List of phone numbers for the service channel. Includes also fax numbers.
     * @return $this
     */
    public function setPhoneNumbers($phoneNumbers)
    {
        $this->container['phoneNumbers'] = $phoneNumbers;

        return $this;
    }

    /**
     * Gets emails
     * @return \KuntaAPI\Model\Email[]
     */
    public function getEmails()
    {
        return $this->container['emails'];
    }

    /**
     * Sets emails
     * @param \KuntaAPI\Model\Email[] $emails List email addresses for the service channel.
     * @return $this
     */
    public function setEmails($emails)
    {
        $this->container['emails'] = $emails;

        return $this;
    }

    /**
     * Gets languages
     * @return string[]
     */
    public function getLanguages()
    {
        return $this->container['languages'];
    }

    /**
     * Sets languages
     * @param string[] $languages List of languages the service channel is available in (two letter language code).
     * @return $this
     */
    public function setLanguages($languages)
    {
        $this->container['languages'] = $languages;

        return $this;
    }

    /**
     * Gets phoneServiceCharge
     * @return bool
     */
    public function getPhoneServiceCharge()
    {
        return $this->container['phoneServiceCharge'];
    }

    /**
     * Sets phoneServiceCharge
     * @param bool $phoneServiceCharge Is the phone service charged for.
     * @return $this
     */
    public function setPhoneServiceCharge($phoneServiceCharge)
    {
        $this->container['phoneServiceCharge'] = $phoneServiceCharge;

        return $this;
    }

    /**
     * Gets webPages
     * @return \KuntaAPI\Model\WebPage[]
     */
    public function getWebPages()
    {
        return $this->container['webPages'];
    }

    /**
     * Sets webPages
     * @param \KuntaAPI\Model\WebPage[] $webPages List of service channel web pages.
     * @return $this
     */
    public function setWebPages($webPages)
    {
        $this->container['webPages'] = $webPages;

        return $this;
    }

    /**
     * Gets serviceAreas
     * @return \KuntaAPI\Model\Municipality[]
     */
    public function getServiceAreas()
    {
        return $this->container['serviceAreas'];
    }

    /**
     * Sets serviceAreas
     * @param \KuntaAPI\Model\Municipality[] $serviceAreas List of serviceareas. Used when location service channel is restricted by service area (ServiceAreaRestricted=true).
     * @return $this
     */
    public function setServiceAreas($serviceAreas)
    {
        $this->container['serviceAreas'] = $serviceAreas;

        return $this;
    }

    /**
     * Gets addresses
     * @return \KuntaAPI\Model\Address[]
     */
    public function getAddresses()
    {
        return $this->container['addresses'];
    }

    /**
     * Sets addresses
     * @param \KuntaAPI\Model\Address[] $addresses List of service location addresses.
     * @return $this
     */
    public function setAddresses($addresses)
    {
        $this->container['addresses'] = $addresses;

        return $this;
    }

    /**
     * Gets serviceHours
     * @return \KuntaAPI\Model\ServiceHour[]
     */
    public function getServiceHours()
    {
        return $this->container['serviceHours'];
    }

    /**
     * Sets serviceHours
     * @param \KuntaAPI\Model\ServiceHour[] $serviceHours List of service channel service hours.
     * @return $this
     */
    public function setServiceHours($serviceHours)
    {
        $this->container['serviceHours'] = $serviceHours;

        return $this;
    }

    /**
     * Gets publishingStatus
     * @return string
     */
    public function getPublishingStatus()
    {
        return $this->container['publishingStatus'];
    }

    /**
     * Sets publishingStatus
     * @param string $publishingStatus Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished.
     * @return $this
     */
    public function setPublishingStatus($publishingStatus)
    {
        $this->container['publishingStatus'] = $publishingStatus;

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


