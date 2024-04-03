var exec = require('cordova/exec');
var cordova = require('cordova');

var PLUGIN_NAME = 'UnityAds2';

// METHODS
exports.UnityAdsInit = function(gameId, isTest, isDebug, fn) {

    var METHOD_NAME = "UnityAdsInit"; 
    var args = [gameId, isTest, isDebug]; 

    function success (str){
        if(str == "INIT_SUCESS"){
            self.unity_ads_state.initialized = true;
        }
        fn(null, str);
    }
    function error (str){
        fn(str, null);
    } 

    exec(success, error, PLUGIN_NAME,METHOD_NAME,args); 
};

exports.ShowVideoAd = function(videoAdPlacementId, fn) {
    var self = this;
    var METHOD_NAME = "ShowVideoAd"; 
    var args = [videoAdPlacementId];  

    function success (str){
       var resultArray=JSON.parse(str)
        console.log(resultArray[1]);
        
        if(resultArray[1]=="SHOWING"){
          self.onVideoShow(resultArray[0]);
        }
        else if(resultArray[1]=="READY"){
            self.onReadyVideo(resultArray[0]);
        }
        else if(resultArray[1]=="NOT_READY"){
            self.onNotReadyVideo(resultArray[0]);
        }
        else if(resultArray[1]=="COMPLETED"){
            self.onVideoCompleted(resultArray[0]);
        }
        else if(resultArray[1]=="SKIPPED"){
            self.onVideoSkipped(resultArray[0]);
        }
        else{
            self.onVideoError(resultArray[0],resultArray[1]);
        }
     
    }
    function error (str){
        fn(str, null);
    } 
    exec(success, error, PLUGIN_NAME,METHOD_NAME,args);  

};

exports.GetPlacementState = function(videoAdPlacementId, fn) {

    var METHOD_NAME = "GetPlacementState"; 
    var args = [videoAdPlacementId];  

    function success (str){
        fn(null, str);
    }
    function error (str){
        fn(str, null);
    } 

    exec(success, error, PLUGIN_NAME,METHOD_NAME,args);      
};

exports.onVideoShow=null;
exports.onReadyVideo=null;
exports.onNotReadyVideo=null;
exports.onVideoCompleted=null;
exports.onVideoSkipped=null;
exports.onVideoError=null;
