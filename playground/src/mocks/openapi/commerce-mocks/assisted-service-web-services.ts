// https://github.com/SAP-samples/xf-application-mocks/blob/master/commerce-mock/apis/assistedservicewebservices.yaml

export default `swagger: "2.0"
info:
  description: "ASM Webservices Version 1"
  version: "1.0.0"
  title: "Assisted Service Module V1"
tags:
  - name: "customers-controller"
    description: "Customers Controller"
  - name: "customer-lists-controller"
    description: "Customer Lists Controller"
basePath: "/assistedservicewebservices"
paths:
  /customerlists:
    get:
      tags:
        - "customer-lists-controller"
      summary: "Returns customer lists"
      description: "This endpoint returns list of all customer lists. This can only be done when logged in"
      operationId: "getCustomerListsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "baseSite"
          in: "query"
          description: "Id of the BaseSite"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/UserGroupListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
      security:
        - oauth2:
            - "basic"
  /customerlists/{customerlist}:
    get:
      tags:
        - "customer-lists-controller"
      summary: "Returns single customer list details"
      description: "This endpoint returns details of customer list with valid Id"
      operationId: "getCustomerListDetailsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "customerlist"
          in: "path"
          description: "Id of the customer list"
          required: true
          type: "string"
        - name: "baseSite"
          in: "query"
          description: "Id of the BaseSite"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/CustomerListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
      security:
        - oauth2:
            - "basic"
  /customers/search:
    get:
      tags:
        - "customers-controller"
      summary: "Returns customers based on query parameters"
      description: "This endpoint returns paginated list of customers based on provided query parameters. If query term is present it will return customers based on provided value. If customerListId is present it will ignore query term and return only customers who belong to the given customer list. If orderId parameter is present it will ignore previous parameters and it will return customer associated to the given order.This can only be done by the logged in user."
      operationId: "getPageableCustomersUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "query"
          in: "query"
          description: "Customer uid search term"
          required: false
          type: "string"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 20
          format: "int32"
        - name: "customerListId"
          in: "query"
          description: "Id of the customer list"
          required: false
          type: "string"
        - name: "orderId"
          in: "query"
          description: "Id of the order"
          required: false
          type: "string"
        - name: "baseSite"
          in: "query"
          description: "Id of the BaseSite"
          required: true
          type: "string"
        - name: "sort"
          in: "query"
          description: "Sort parameter. Possible values: byUidAsc, byUidDesc,  byNameAsc, byNameDesc"
          required: false
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/CustomerSearchPageWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
      security:
        - oauth2:
            - "basic"
  /authorizationserver/oauth/token:
    post:
      summary: "Get OAuth2 access token"
      description: "Returns the acess token for Kyma"
      consumes:
        - "application/x-www-form-urlencoded"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "parameters"
          description: "List of Component identifiers"
          required: true
          schema:
            type: "object"
            properties:
              client_id:
                type: "string"
              client_secret:
                type: "string"
              grant_type:
                type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "object"
            properties:
              access_token_url:
                type: "string"
            default:
              token: "3333"
        404:
          description: "Not Found"
securityDefinitions:
  oauth2:
    type: "oauth2"
    tokenUrl: "/authorizationserver/oauth/token"
    flow: "password"
    scopes:
      basic: ""
definitions:
  AddressWsDTO:
    type: "object"
    properties:
      companyName:
        type: "string"
      country:
        $ref: "#/definitions/CountryWsDTO"
      defaultAddress:
        type: "boolean"
      email:
        type: "string"
      firstName:
        type: "string"
      formattedAddress:
        type: "string"
      id:
        type: "string"
      lastName:
        type: "string"
      line1:
        type: "string"
      line2:
        type: "string"
      phone:
        type: "string"
      postalCode:
        type: "string"
      region:
        $ref: "#/definitions/RegionWsDTO"
      shippingAddress:
        type: "boolean"
      title:
        type: "string"
      titleCode:
        type: "string"
      town:
        type: "string"
      visibleInAddressBook:
        type: "boolean"
  CountryWsDTO:
    type: "object"
    properties:
      isocode:
        type: "string"
      name:
        type: "string"
  CurrencyWsDTO:
    type: "object"
    properties:
      active:
        type: "boolean"
      isocode:
        type: "string"
      name:
        type: "string"
      symbol:
        type: "string"
  CustomerListWsDTO:
    type: "object"
    properties:
      additionalColumnsKeys:
        type: "array"
        items:
          type: "string"
      name:
        type: "string"
      searchBoxEnabled:
        type: "boolean"
      uid:
        type: "string"
  CustomerSearchPageWsDTO:
    type: "object"
    properties:
      entries:
        type: "array"
        items:
          $ref: "#/definitions/UserWsDTO"
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  LanguageWsDTO:
    type: "object"
    properties:
      active:
        type: "boolean"
      isocode:
        type: "string"
      name:
        type: "string"
      nativeName:
        type: "string"
  PaginationWsDTO:
    type: "object"
    properties:
      currentPage:
        type: "integer"
        format: "int32"
      pageSize:
        type: "integer"
        format: "int32"
      sort:
        type: "string"
      totalPages:
        type: "integer"
        format: "int32"
      totalResults:
        type: "integer"
        format: "int64"
  PrincipalWsDTO:
    type: "object"
    properties:
      name:
        type: "string"
      uid:
        type: "string"
  RegionWsDTO:
    type: "object"
    properties:
      countryIso:
        type: "string"
      isocode:
        type: "string"
      isocodeShort:
        type: "string"
      name:
        type: "string"
  SortWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      name:
        type: "string"
      selected:
        type: "boolean"
  UserGroupListWsDTO:
    type: "object"
    properties:
      currentPage:
        type: "integer"
        format: "int32"
      numberOfPages:
        type: "integer"
        format: "int32"
      pageSize:
        type: "integer"
        format: "int32"
      totalNumber:
        type: "integer"
        format: "int32"
      userGroups:
        type: "array"
        items:
          $ref: "#/definitions/UserGroupWsDTO"
  UserGroupWsDTO:
    type: "object"
    properties:
      members:
        type: "array"
        items:
          $ref: "#/definitions/PrincipalWsDTO"
      membersCount:
        type: "integer"
        format: "int32"
      name:
        type: "string"
      subGroups:
        type: "array"
        items:
          $ref: "#/definitions/UserGroupWsDTO"
      uid:
        type: "string"
  UserWsDTO:
    type: "object"
    properties:
      currency:
        $ref: "#/definitions/CurrencyWsDTO"
      customerId:
        type: "string"
      deactivationDate:
        type: "string"
        format: "date-time"
      defaultAddress:
        $ref: "#/definitions/AddressWsDTO"
      displayUid:
        type: "string"
      firstName:
        type: "string"
      language:
        $ref: "#/definitions/LanguageWsDTO"
      lastName:
        type: "string"
      name:
        type: "string"
      title:
        type: "string"
      titleCode:
        type: "string"
      uid:
        type: "string"
`;
