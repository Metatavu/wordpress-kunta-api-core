<?php
/**
 * ServiceLocationServiceChannelsApi
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

namespace KuntaAPI\Api;

use \KuntaAPI\Configuration;
use \KuntaAPI\ApiClient;
use \KuntaAPI\ApiException;
use \KuntaAPI\ObjectSerializer;

/**
 * ServiceLocationServiceChannelsApi Class Doc Comment
 *
 * @category Class
 * @package  KuntaAPI
 * @author   http://github.com/swagger-api/swagger-codegen
 * @license  http://www.apache.org/licenses/LICENSE-2.0 Apache Licene v2
 * @link     https://github.com/swagger-api/swagger-codegen
 */
class ServiceLocationServiceChannelsApi
{

    /**
     * API Client
     *
     * @var \KuntaAPI\ApiClient instance of the ApiClient
     */
    protected $apiClient;

    /**
     * Constructor
     *
     * @param \KuntaAPI\ApiClient|null $apiClient The api client to use
     */
    public function __construct(\KuntaAPI\ApiClient $apiClient = null)
    {
        if ($apiClient == null) {
            $apiClient = new ApiClient();
            $apiClient->getConfig()->setHost('https://demo.kuntaapi.fi/v1');
        }

        $this->apiClient = $apiClient;
    }

    /**
     * Get API client
     *
     * @return \KuntaAPI\ApiClient get the API client
     */
    public function getApiClient()
    {
        return $this->apiClient;
    }

    /**
     * Set the API client
     *
     * @param \KuntaAPI\ApiClient $apiClient set the API client
     *
     * @return ServiceLocationServiceChannelsApi
     */
    public function setApiClient(\KuntaAPI\ApiClient $apiClient)
    {
        $this->apiClient = $apiClient;
        return $this;
    }

    /**
     * Operation findServiceLocationServiceChannel
     *
     * Finds a service location service by id
     *
     * @param string $serviceLocationServiceChannelId serviceLocationChannel id (required)
     * @return \KuntaAPI\Model\ServiceLocationServiceChannel
     * @throws \KuntaAPI\ApiException on non-2xx response
     */
    public function findServiceLocationServiceChannel($serviceLocationServiceChannelId)
    {
        list($response) = $this->findServiceLocationServiceChannelWithHttpInfo($serviceLocationServiceChannelId);
        return $response;
    }

    /**
     * Operation findServiceLocationServiceChannelWithHttpInfo
     *
     * Finds a service location service by id
     *
     * @param string $serviceLocationServiceChannelId serviceLocationChannel id (required)
     * @return Array of \KuntaAPI\Model\ServiceLocationServiceChannel, HTTP status code, HTTP response headers (array of strings)
     * @throws \KuntaAPI\ApiException on non-2xx response
     */
    public function findServiceLocationServiceChannelWithHttpInfo($serviceLocationServiceChannelId)
    {
        // verify the required parameter 'serviceLocationServiceChannelId' is set
        if ($serviceLocationServiceChannelId === null) {
            throw new \InvalidArgumentException('Missing the required parameter $serviceLocationServiceChannelId when calling findServiceLocationServiceChannel');
        }
        // parse inputs
        $resourcePath = "/serviceLocationServiceChannels/{serviceLocationServiceChannelId}";
        $httpBody = '';
        $queryParams = array();
        $headerParams = array();
        $formParams = array();
        $_header_accept = $this->apiClient->selectHeaderAccept(array('application/json;charset=utf-8'));
        if (!is_null($_header_accept)) {
            $headerParams['Accept'] = $_header_accept;
        }
        $headerParams['Content-Type'] = $this->apiClient->selectHeaderContentType(array('application/json;charset=utf-8'));

        // path params
        if ($serviceLocationServiceChannelId !== null) {
            $resourcePath = str_replace(
                "{" . "serviceLocationServiceChannelId" . "}",
                $this->apiClient->getSerializer()->toPathValue($serviceLocationServiceChannelId),
                $resourcePath
            );
        }
        // default format to json
        $resourcePath = str_replace("{format}", "json", $resourcePath);

        
        // for model (json/xml)
        if (isset($_tempBody)) {
            $httpBody = $_tempBody; // $_tempBody is the method argument, if present
        } elseif (count($formParams) > 0) {
            $httpBody = $formParams; // for HTTP post (form)
        }
        // make the API Call
        try {
            list($response, $statusCode, $httpHeader) = $this->apiClient->callApi(
                $resourcePath,
                'GET',
                $queryParams,
                $httpBody,
                $headerParams,
                '\KuntaAPI\Model\ServiceLocationServiceChannel',
                '/serviceLocationServiceChannels/{serviceLocationServiceChannelId}'
            );

            return array($this->apiClient->getSerializer()->deserialize($response, '\KuntaAPI\Model\ServiceLocationServiceChannel', $httpHeader), $statusCode, $httpHeader);
        } catch (ApiException $e) {
            switch ($e->getCode()) {
                case 200:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\ServiceLocationServiceChannel', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 400:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\BadRequest', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 403:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\Forbidden', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 404:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\NotFound', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 500:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\InternalServerError', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
            }

            throw $e;
        }
    }

    /**
     * Operation listServiceLocationServiceChannels
     *
     * Lists service location service channels
     *
     * @param string $organizationId Organization id (optional)
     * @param string $search Search service location channels by free-text query (optional)
     * @param int $firstResult First result (optional)
     * @param int $maxResults Max results (optional)
     * @return \KuntaAPI\Model\ServiceLocationServiceChannel[]
     * @throws \KuntaAPI\ApiException on non-2xx response
     */
    public function listServiceLocationServiceChannels($organizationId = null, $search = null, $firstResult = null, $maxResults = null)
    {
        list($response) = $this->listServiceLocationServiceChannelsWithHttpInfo($organizationId, $search, $firstResult, $maxResults);
        return $response;
    }

    /**
     * Operation listServiceLocationServiceChannelsWithHttpInfo
     *
     * Lists service location service channels
     *
     * @param string $organizationId Organization id (optional)
     * @param string $search Search service location channels by free-text query (optional)
     * @param int $firstResult First result (optional)
     * @param int $maxResults Max results (optional)
     * @return Array of \KuntaAPI\Model\ServiceLocationServiceChannel[], HTTP status code, HTTP response headers (array of strings)
     * @throws \KuntaAPI\ApiException on non-2xx response
     */
    public function listServiceLocationServiceChannelsWithHttpInfo($organizationId = null, $search = null, $firstResult = null, $maxResults = null)
    {
        // parse inputs
        $resourcePath = "/serviceLocationServiceChannels";
        $httpBody = '';
        $queryParams = array();
        $headerParams = array();
        $formParams = array();
        $_header_accept = $this->apiClient->selectHeaderAccept(array('application/json;charset=utf-8'));
        if (!is_null($_header_accept)) {
            $headerParams['Accept'] = $_header_accept;
        }
        $headerParams['Content-Type'] = $this->apiClient->selectHeaderContentType(array('application/json;charset=utf-8'));

        // query params
        if ($organizationId !== null) {
            $queryParams['organizationId'] = $this->apiClient->getSerializer()->toQueryValue($organizationId);
        }
        // query params
        if ($search !== null) {
            $queryParams['search'] = $this->apiClient->getSerializer()->toQueryValue($search);
        }
        // query params
        if ($firstResult !== null) {
            $queryParams['firstResult'] = $this->apiClient->getSerializer()->toQueryValue($firstResult);
        }
        // query params
        if ($maxResults !== null) {
            $queryParams['maxResults'] = $this->apiClient->getSerializer()->toQueryValue($maxResults);
        }
        // default format to json
        $resourcePath = str_replace("{format}", "json", $resourcePath);

        
        // for model (json/xml)
        if (isset($_tempBody)) {
            $httpBody = $_tempBody; // $_tempBody is the method argument, if present
        } elseif (count($formParams) > 0) {
            $httpBody = $formParams; // for HTTP post (form)
        }
        // make the API Call
        try {
            list($response, $statusCode, $httpHeader) = $this->apiClient->callApi(
                $resourcePath,
                'GET',
                $queryParams,
                $httpBody,
                $headerParams,
                '\KuntaAPI\Model\ServiceLocationServiceChannel[]',
                '/serviceLocationServiceChannels'
            );

            return array($this->apiClient->getSerializer()->deserialize($response, '\KuntaAPI\Model\ServiceLocationServiceChannel[]', $httpHeader), $statusCode, $httpHeader);
        } catch (ApiException $e) {
            switch ($e->getCode()) {
                case 200:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\ServiceLocationServiceChannel[]', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 400:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\BadRequest', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 403:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\Forbidden', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 404:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\NotFound', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
                case 500:
                    $data = $this->apiClient->getSerializer()->deserialize($e->getResponseBody(), '\KuntaAPI\Model\InternalServerError', $e->getResponseHeaders());
                    $e->setResponseObject($data);
                    break;
            }

            throw $e;
        }
    }

}
