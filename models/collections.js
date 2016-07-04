import { Mongo } from 'meteor/mongo'
import { FS } from 'meteor/cfs:base-package'

export const Countries = new Mongo.Collection('countries')

var imageStore = new FS.Store.GridFS("images", {
  //  mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
  //mongoOptions: {...},  // optional, see note below
  transformWrite: function(fileObj, readStream, writeStream) {
                    gm(readStream, fileObj.name()).resize('100', '100').stream('PNG').pipe(writeStream)
                  }, //optional
  transformRead: function (fileObj, readStream, writeStream) {
                    gm(readStream).resize(100).quality(80).stream('PNG').pipe(writeStream);
                 }, //optional
  maxTries: 2, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

export const Avatars = new FS.Collection("avatars", {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*'],
      extensions: ['jpg','png','jpeg']
    },
    maxSize: 1000000, //1Mb
    onInvalid: function(message){
      throw new Meteor.Error(403, message);
    }
  }
});

/* FILE SYSTEM
var base= ''
if(Meteor.isServer){
  base= process.env.PWD
}

var avatarStoreLarge = new FS.Store.FileSystem("avatarsLarge", {
  path: base+"/public/uploads", //optional, default is "/cfs/files" path within app container
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('250', '250').stream('PNG').pipe(writeStream)
  }
})

var avatarStoreSmall = new FS.Store.FileSystem("avatarsSmall", {
  path: base+"/public/uploads", //optional, default is "/cfs/files" path within app container
  beforeWrite: function(fileObj) {
    fileObj.size(50, {store: "avatarStoreSmall", save: false});
  },
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()+'.png').resize('50', '50').stream('PNG').pipe(writeStream)
  }
})

export const Avatars = new FS.Collection("avatars", {
  stores: [avatarStoreSmall, avatarStoreLarge],
  filter: {
    allow: {
      contentTypes: ['image/*'],
      extensions: ['jpg','png','jpeg']
    },
    maxSize: 1000000, //1Mb
    onInvalid: function(message){
      throw new Meteor.Error(403, message);
    }
  }
});
*/
/*
//avatar DROPBOX
var avatarStoreLarge = new FS.Store.Dropbox("avatarsLarge", {
  key: "qs3xete4bus8pri",
  secret: "a7oq7vjapl240el",
  token: "4yGkTsIKDPUAAAAAAAAAhMVUWaTFETRcuMJf-3VN9VrSVO61DnsadAYE2iYZS1kr",
  path: 'Aplicaciones/Langx',
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream)
  }
})

var avatarStoreSmall = new FS.Store.Dropbox("avatarsSmall", {
  key: "qs3xete4bus8pri",
  secret: "a7oq7vjapl240el",
  token: "4yGkTsIKDPUAAAAAAAAAhMVUWaTFETRcuMJf-3VN9VrSVO61DnsadAYE2iYZS1kr",
  path: 'Aplicaciones/Langx',
  beforeWrite: function(fileObj) {
    fileObj.size(50, {store: "avatarStoreSmall", save: false});
  },
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('50', '50').stream().pipe(writeStream)
  }
})


export const Avatars = new FS.Collection("avatars", {
  stores: [avatarStoreSmall, avatarStoreLarge],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})
*/


if (Meteor.isServer) {
  Countries.allow({
    insert: function(userId, doc) {
      return !!userId;
    },
    update: function(userId, doc) {
      return !!userId;
    }
  });
  Avatars.allow({
    insert(file){
      return true;
    },
    update(){
      return true;
    },
    remove: function() {
      return true;
    },
    download: function() {
      return true;
    }
  })
  /*
  FS.HTTP.publish(Avatars, function () {
    // `this` provides a context similar to Meteor.publish
    return Avatars.find();
  });
  */
  /*FS.HTTP.publish(Avatars, function () {
    // `this` provides a context similar to Meteor.publish
    return Avatars.find();
  });*/
}
