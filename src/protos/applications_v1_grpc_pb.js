// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var applications_v1_pb = require('./applications_v1_pb.js');

function serialize_applications_v1_ApplicationIdRequest(arg) {
  if (!(arg instanceof applications_v1_pb.ApplicationIdRequest)) {
    throw new Error('Expected argument of type applications_v1.ApplicationIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_applications_v1_ApplicationIdRequest(buffer_arg) {
  return applications_v1_pb.ApplicationIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_applications_v1_ApplicationObjectReply(arg) {
  if (!(arg instanceof applications_v1_pb.ApplicationObjectReply)) {
    throw new Error('Expected argument of type applications_v1.ApplicationObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_applications_v1_ApplicationObjectReply(buffer_arg) {
  return applications_v1_pb.ApplicationObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_applications_v1_ApplicationObjectRequest(arg) {
  if (!(arg instanceof applications_v1_pb.ApplicationObjectRequest)) {
    throw new Error('Expected argument of type applications_v1.ApplicationObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_applications_v1_ApplicationObjectRequest(buffer_arg) {
  return applications_v1_pb.ApplicationObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_applications_v1_ApplicationPageReply(arg) {
  if (!(arg instanceof applications_v1_pb.ApplicationPageReply)) {
    throw new Error('Expected argument of type applications_v1.ApplicationPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_applications_v1_ApplicationPageReply(buffer_arg) {
  return applications_v1_pb.ApplicationPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_applications_v1_ApplicationPageRequest(arg) {
  if (!(arg instanceof applications_v1_pb.ApplicationPageRequest)) {
    throw new Error('Expected argument of type applications_v1.ApplicationPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_applications_v1_ApplicationPageRequest(buffer_arg) {
  return applications_v1_pb.ApplicationPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The applications service definition.
var ApplicationsService = exports.ApplicationsService = {
  get_applications: {
    path: '/applications_v1.Applications/get_applications',
    requestStream: false,
    responseStream: false,
    requestType: applications_v1_pb.ApplicationPageRequest,
    responseType: applications_v1_pb.ApplicationPageReply,
    requestSerialize: serialize_applications_v1_ApplicationPageRequest,
    requestDeserialize: deserialize_applications_v1_ApplicationPageRequest,
    responseSerialize: serialize_applications_v1_ApplicationPageReply,
    responseDeserialize: deserialize_applications_v1_ApplicationPageReply,
  },
  get_application_by_id: {
    path: '/applications_v1.Applications/get_application_by_id',
    requestStream: false,
    responseStream: false,
    requestType: applications_v1_pb.ApplicationIdRequest,
    responseType: applications_v1_pb.ApplicationObjectReply,
    requestSerialize: serialize_applications_v1_ApplicationIdRequest,
    requestDeserialize: deserialize_applications_v1_ApplicationIdRequest,
    responseSerialize: serialize_applications_v1_ApplicationObjectReply,
    responseDeserialize: deserialize_applications_v1_ApplicationObjectReply,
  },
  create_application: {
    path: '/applications_v1.Applications/create_application',
    requestStream: false,
    responseStream: false,
    requestType: applications_v1_pb.ApplicationObjectRequest,
    responseType: applications_v1_pb.ApplicationObjectReply,
    requestSerialize: serialize_applications_v1_ApplicationObjectRequest,
    requestDeserialize: deserialize_applications_v1_ApplicationObjectRequest,
    responseSerialize: serialize_applications_v1_ApplicationObjectReply,
    responseDeserialize: deserialize_applications_v1_ApplicationObjectReply,
  },
  update_application: {
    path: '/applications_v1.Applications/update_application',
    requestStream: false,
    responseStream: false,
    requestType: applications_v1_pb.ApplicationObjectRequest,
    responseType: applications_v1_pb.ApplicationObjectReply,
    requestSerialize: serialize_applications_v1_ApplicationObjectRequest,
    requestDeserialize: deserialize_applications_v1_ApplicationObjectRequest,
    responseSerialize: serialize_applications_v1_ApplicationObjectReply,
    responseDeserialize: deserialize_applications_v1_ApplicationObjectReply,
  },
  delete_application_by_id: {
    path: '/applications_v1.Applications/delete_application_by_id',
    requestStream: false,
    responseStream: false,
    requestType: applications_v1_pb.ApplicationIdRequest,
    responseType: applications_v1_pb.ApplicationObjectReply,
    requestSerialize: serialize_applications_v1_ApplicationIdRequest,
    requestDeserialize: deserialize_applications_v1_ApplicationIdRequest,
    responseSerialize: serialize_applications_v1_ApplicationObjectReply,
    responseDeserialize: deserialize_applications_v1_ApplicationObjectReply,
  },
};

exports.ApplicationsClient = grpc.makeGenericClientConstructor(ApplicationsService);
